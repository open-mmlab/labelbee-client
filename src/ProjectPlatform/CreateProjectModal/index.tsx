import React, { useEffect, useState } from 'react';
import { Button, Form, FormInstance, message, Modal } from 'antd';
import { omit, pick } from 'lodash';
import styles from './index.module.scss';
import { rectScopeChange } from './ToolConfig/RectConfig';
import Tools from './Tools';
import MultiStep from './MultiStep';
import SelectTool from './SelectTool';
import TaskStep from '@/ProjectPlatform/CreateProjectModal/TaskStep';
import { IStepInfo, useAnnotation } from '../../store';
import { EToolName, TOOL_NAME } from '@/constant/store';
import DefaultConfig from './ToolConfig/DefaultConfig';
import { getCreateProjectCmt } from '@/utils/tool/common';
import { repeatInputList } from '@/utils/tool/editTool';
import uuid from '@/utils/tool/uuid';
import { IProjectType } from '@/ProjectPlatform';
import { useTranslation } from 'react-i18next';

interface IProps {
  type: IProjectType;
  visible: boolean;
  onCancel: () => void;
}

const objToString = (values: any) => {
  return JSON.stringify(values);
};

/**
 * 所有  都集中在一个 form 表单
 * 参考 src/mock/taskConfig.ts
 * */
export const formatData = (values: any, toolName: EToolName, form: FormInstance) => {
  const { textConfigurableContext } = values;
  switch (toolName) {
    case EToolName.Rect:
      values.minWidth = rectScopeChange(values.minWidth);
      values.minHeight = rectScopeChange(values.minHeight);
      return objToString({
        ...omit(values, ['textConfigurableContext']),
        ...textConfigurableContext,
      });
    case EToolName.Tag:
      return objToString({ ...values, inputList: form.getFieldValue('inputList') });
    case EToolName.Polygon:
    case EToolName.Line:
      let { toolGraphicsPoint } = values;
      return objToString({
        ...textConfigurableContext,
        ...toolGraphicsPoint,
        ...omit(values, ['textConfigurableContext', 'toolGraphicsPoint']),
      });
    case EToolName.Point:
      return objToString({
        ...omit(values, ['textConfigurableContext']),
        ...textConfigurableContext,
      });
    case EToolName.Text:
      return objToString(values);
    default:
      return '';
  }
};

const CreateProjectModal: React.FC<IProps> = ({ type, visible, onCancel }) => {
  const [toolName, setToolName] = useState<EToolName>(EToolName.Rect);
  // stepList 多步骤  stepId 编辑
  const [stepId, setStepId] = useState<string>();
  const [stepList, setStepList] = useState<IStepInfo[]>([]);

  const [taskVisible, setTaskVisible] = useState(false);
  const [form] = Form.useForm();
  const {
    state: { currentProjectInfo, projectList },
    dispatch,
  } = useAnnotation();
  const { t } = useTranslation();
  const isBase = type === 'base';

  const changeTaskVisible = () => {
    setTaskVisible((state) => !state);
  };

  const deleteProject = () => {
    if (!currentProjectInfo) return;
    dispatch({
      type: 'UPDATE_PROJECT_LIST',
      payload: {
        projectList: projectList.filter((info) => info.id !== currentProjectInfo?.id),
      },
    });
  };

  const createProject = () => {
    form
      .validateFields()
      .then((values) => {
        let list;
        if (isBase) {
          const result = formatData(omit(values, ['name', 'path', 'resultPath']), toolName, form);
          list = [{ step: 1, tool: toolName, id: uuid(), config: result }];
        } else {
          list = stepList;
        }
        if (!isBase && stepList.length < 1) {
          message.error(t('AddTaskStepsNotify'));
          return;
        }
        const arr =
          form.getFieldValue('attributeList') ||
          form.getFieldValue('inputList') ||
          form.getFieldValue('configList')?.map((item: any) => ({ value: item.label, ...item }));
        if (repeatInputList(arr)) {
          return;
        }
        deleteProject();
        dispatch({
          type: 'ADD_PROJECT_LIST',
          payload: {
            projectList: [
              {
                ...pick(values, ['name', 'path', 'resultPath']),
                id: uuid(),
                toolName: isBase ? toolName : undefined,
                createdAt: Date.now(),
                stepList: list,
                step: 1,
                imgIndex: 0,
              },
            ],
          },
        });
        onCancel();
      })
      .catch(({ errorFields }) => {
        if (errorFields?.length > 0 && errorFields[0].name) {
          form.scrollToField(errorFields[0].name);
        }
      });
  };

  const getName = () => {
    return t(
      currentProjectInfo ? currentProjectInfo.name : isBase ? 'NewProject' : 'NewMultiStepProject',
    );
  };

  useEffect(() => {
    !taskVisible && setStepId(undefined);
  }, [taskVisible]);

  useEffect(() => {
    if (currentProjectInfo) {
      form.setFieldsValue({
        ...pick(currentProjectInfo, ['name', 'path', 'resultPath']),
      });

      setToolName(currentProjectInfo.toolName);
      setStepList([...currentProjectInfo.stepList]);
    }
  }, [currentProjectInfo]);

  // 格式化数据
  const initState = () => {
    form.resetFields();
    setToolName(EToolName.Rect);
    setStepId(undefined);
    setStepList([]);
  };
  useEffect(() => {
    if (visible === false) {
      initState();
    }
  }, [form, visible]);

  const importFromClipboard = () => {
    const promise = navigator.clipboard.readText();
    promise.then((res) => {
      try {
        const clipboardData = JSON.parse(res);
        const toolNames = Object.keys(TOOL_NAME);
        const newData: any = [];
        // 过滤掉质检步骤、暂不支持的工具、依赖过滤掉的工具
        const filteredStep: any = [];
        clipboardData.forEach((element: any) => {
          const { id = uuid(), tool, type, dataSourceStep, step, config } = element;
          if (
            type === 2 ||
            type === 3 ||
            !toolNames.includes(tool) ||
            filteredStep.includes(dataSourceStep)
          ) {
            filteredStep.push(step);
          } else {
            newData.push({
              id,
              tool,
              step,
              config,
              dataSourceStep,
            });
          }
        });

        setStepList((pre) => {
          return [...pre, ...newData];
        });
      } catch (error) {
        message.error(t('PleaseCopyTheCorrectStepList'));
      }
    });
  };

  return (
    <div>
      <Modal
        destroyOnClose={true}
        centered
        visible={visible}
        width={800}
        title={getName()}
        onOk={createProject}
        onCancel={onCancel}
      >
        <div className={styles.modalContent}>
          {getCreateProjectCmt(
            isBase,
            <SelectTool
              disabled={!!currentProjectInfo}
              toolName={toolName}
              onChange={(text) => {
                form.resetFields(Object.keys(omit(form.getFieldsValue(), ['name'])));
                setToolName(text);
              }}
            />,
            null,
          )}

          <div className={styles.config}>
            <Form
              layout='horizontal'
              key={toolName}
              labelAlign='left'
              colon={false}
              preserve={false}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              form={form}
            >
              <DefaultConfig />
              {getCreateProjectCmt(isBase, <Tools toolName={toolName} form={form}></Tools>, null)}
            </Form>
            {getCreateProjectCmt(
              isBase,
              null,
              <>
                <TaskStep
                  stepList={stepList}
                  setStepLIst={setStepList}
                  setStepId={setStepId}
                  changeTaskVisible={changeTaskVisible}
                  footer={
                    <>
                      <Button
                        onClick={importFromClipboard}
                        style={{
                          marginRight: 16,
                        }}
                      >
                        {t('ImportFromClipboard')}
                      </Button>
                      <Button onClick={changeTaskVisible}>{t('New')}</Button>
                    </>
                  }
                />
                <Modal
                  destroyOnClose={true}
                  width={800}
                  title={t('TaskSteps')}
                  visible={taskVisible}
                  onCancel={changeTaskVisible}
                  footer={null}
                >
                  <MultiStep
                    stepId={stepId}
                    stepList={stepList}
                    changeTaskVisible={changeTaskVisible}
                    setStepLIst={setStepList}
                  />
                </Modal>
              </>,
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateProjectModal;

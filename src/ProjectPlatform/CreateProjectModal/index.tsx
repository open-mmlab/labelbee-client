import React, { useEffect, useState } from 'react';
import { Form, Modal, FormInstance, Button, message } from 'antd';
import { omit, pick } from 'lodash';
import styles from './index.module.scss';
import { rectScopeChange } from './ToolConfig/RectConfig';
import Tools from './Tools';
import MultiStep from './MultiStep';
import SelectTool from './SelectTool';
import TaskStep from '@/ProjectPlatform/CreateProjectModal/TaskStep';
import { AnnotationContext, IStepInfo } from '../../store';
import { EToolName, TOOL_NAME } from '@/constant/store';
import DefaultConfig from './ToolConfig/DefaultConfig';
import { getCreateProjectCmt } from '@/utils/tool/common';
import { IProjectType } from '@/ProjectPlatform';

interface IProps {
  type: IProjectType;
  visible: boolean;
  onCancel: () => void;
}

const objToString = (values: any) => {
  return JSON.stringify(values)
}

/**
 * 所有  都集中在一个 form 表单
 * 参考 src/mock/taskConfig.ts
 * */
export const formatData = (values: any, toolName: EToolName, form: FormInstance) => {
  const { textConfigurableContext } = values
  if(toolName === EToolName.Rect) {
    values.minWidth = rectScopeChange(values.minWidth)
    values.minHeight = rectScopeChange(values.minHeight)
    return objToString({...omit(values, ['textConfigurableContext']), ...textConfigurableContext})
  }else if(toolName === EToolName.Tag) {
    return objToString({...values, inputList: form.getFieldValue('inputList')})
  }else if([EToolName.Polygon, EToolName.Line].includes(toolName)) {
    let { toolGraphicsPoint } = values;
    return objToString({
      ...textConfigurableContext,
      ...toolGraphicsPoint,
      ...omit(values, ['textConfigurableContext', 'toolGraphicsPoint'])
    })
  }else if(toolName === EToolName.Point) {
    return objToString({...omit(values, ['textConfigurableContext']), ...textConfigurableContext})
  }else if(toolName === EToolName.Text) {
    return objToString(values)
  }
  return '';
}

const CreateProjectModal: React.FC<IProps> = ({ type, visible, onCancel }) => {
  const [toolName, setToolName] = useState<EToolName>(EToolName.Rect);
  const [stepList, setStepList] = useState<IStepInfo[]>([]);
  const [taskVisible, setTaskVisible] = useState(false);

  const isBase = type === 'base';

  const {
    dispatch
  } = React.useContext(AnnotationContext);

  const [form] = Form.useForm();

  useEffect(() => {
    if (visible === false) {
      form.resetFields();
    }
  }, [form, visible]);

  const changeTaskVisible = () => {
    setTaskVisible(state => !state)
  }

  const createProject = () => {
    form.validateFields().then((values) => {
      let list;
      if(isBase) {
        const result = formatData(omit(values, ['name', 'path', 'resultPath']), toolName, form);
        list = [{ step: 1, tool: toolName, config: result }]
      } else {
        list = stepList;
      }
      if (!isBase && stepList.length < 1) {
        message.error('请添加任务步骤');
        return;
      }
      dispatch({
        type: 'ADD_PROJECT_LIST',
        payload: {
          projectList: [
            {
              ...pick(values, ['name', 'path', 'resultPath']),
              toolName: isBase ? toolName : 'step',
              createdAt: Date.now(),
              stepList: list,
            },
          ],
        },
      });
      onCancel();
    });
  };

  return (
    <Modal destroyOnClose={true}
           centered visible={visible}
           width={800} title={isBase ? '创建项目' : '创建多步骤项目'}
           onOk={createProject}
           onCancel={onCancel}>
      <div className={styles.modalContent}>

        {getCreateProjectCmt(isBase, <SelectTool toolName={toolName} onChange={(text) => {
          form.resetFields(Object.keys(omit(form.getFieldsValue(), ['name'])));
          setToolName(text);
        }} />, null)}

        <div className={styles.config}>
          <Form
            layout='horizontal'
            key={toolName}
            labelAlign='left'
            colon={false}
            preserve={false}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            form={form}>
            <DefaultConfig />
            {
              getCreateProjectCmt(isBase, <Tools toolName={toolName} form={form}></Tools>, null)
            }
          </Form>
          {
            getCreateProjectCmt(isBase, null, <>
              <TaskStep stepList={stepList} setStepLIst={setStepList} footer={<Button onClick={changeTaskVisible}>新建</Button>} />
              <Modal
                destroyOnClose={true}
                width={800} title="任务步骤"
                visible={taskVisible}
                onCancel={changeTaskVisible}
                footer={null} >
                <MultiStep stepList={stepList} changeTaskVisible={changeTaskVisible} setStepLIst={setStepList} />
              </Modal>
            </>)
          }
        </div>
      </div>
    </Modal>
  );
};

export default CreateProjectModal;

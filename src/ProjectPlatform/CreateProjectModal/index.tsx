import React, { useEffect, useState } from 'react';
import { Form, Menu, Modal } from 'antd';
import { omit, pick } from 'lodash';
import styles from './index.module.scss';
import RectConfig, { rectScopeChange } from './toolConfig/rectConfig';
import TagConfig from './toolConfig/tagConfig';
import PolygonToolConfig from './toolConfig/polygonToolConfig';
import { AnnotationContext } from '../../store';
import { EToolName, TOOL_NAME } from '@/constant/store';
import DefaultConfig from './toolConfig/DefaultConfig';

interface IProps {
  visible: boolean;
  onCancel: () => void;
}

const annotationTypeList = [
  {
    name: TOOL_NAME[EToolName.Rect],
    key: EToolName.Rect,
  },
  {
    name: TOOL_NAME[EToolName.Tag],
    key: EToolName.Tag,
  },
  {
    name: TOOL_NAME[EToolName.Polygon],
    key: EToolName.Polygon,
  },
];

const CreateProjectModal: React.FC<IProps> = ({ visible, onCancel }) => {
  const [toolName, setToolName] = useState<EToolName>(EToolName.Rect);
  const {
    dispatch,
    state: { fileList },
  } = React.useContext(AnnotationContext);

  const [form] = Form.useForm();

  useEffect(() => {
    if (visible === false) {
      form.resetFields();
    }
  }, [form, visible]);

  /**
   * 目前有3个工具  拉框  标签 多边形  都集中在一个 form 表单
   * 参考 src/mock/taskConfig.ts
   * */
  const formatData = (values: any) => {
    if(toolName === EToolName.Rect) {
      values.minWidth = rectScopeChange(values.minWidth)
      values.minHeight = rectScopeChange(values.minHeight)
      return JSON.stringify({
        ...pick(['textConfigurableContext']), ...omit(values, ['textConfigurableContext'])
      })
    }else if(toolName === EToolName.Tag) {
      return JSON.stringify({
        ...values, inputList: form.getFieldValue('inputList')
      })
    }else if(toolName === EToolName.Polygon) {
      let { textConfigurableContext, polygonToolGraphicsPoint } = values;
      return JSON.stringify({
        ...textConfigurableContext,
        ...polygonToolGraphicsPoint,
        ...omit(values, ['textConfigurableContext', 'polygonToolGraphicsPoint'])
      })
    }
  }

  const createProject = () => {
    form.validateFields().then((values) => {
      const result = formatData(omit(values, ['name', 'path', 'resultPath']))
      dispatch({
        type: 'ADD_PROJECT_LIST',
        payload: {
          projectList: [
            {
              ...pick(values, ['name', 'path', 'resultPath']),
              toolName,
              createdAt: '2021-07-07',
              stepList: [{ step: 1, tool: toolName, config: result }],
            },
          ],
        },
      });
      onCancel();
    });
  };
  const CurrentToolConfig = React.useMemo(() => {
    switch (toolName) {
      case EToolName.Rect:
        return <RectConfig form={form} />;
      case EToolName.Tag:
        return <TagConfig form={form} />;
      case EToolName.Polygon:
        return <PolygonToolConfig form={form} />;
      default: {
        return null;
      }
    }
  }, [toolName])

  return (
    <Modal destroyOnClose={true}
           centered visible={visible}
           width={800} title='创建项目'
           onOk={createProject}
           onCancel={onCancel}>
      <div className={styles.main}>
        <Menu
          defaultSelectedKeys={[toolName]}
          defaultOpenKeys={[toolName]}
          className={styles.projectTypeSelected}
          onClick={(info) => {
            setToolName(info.key as EToolName)
          }}
        >
          {annotationTypeList.map((annotationType) => (
            <Menu.Item key={annotationType.key}>{annotationType.name}</Menu.Item>
          ))}
        </Menu>
        <div className={styles.config}>
          <Form
            layout='horizontal'
            key={toolName}
            labelAlign='left'
            colon={false}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            form={form}>
            <DefaultConfig />
            {CurrentToolConfig}
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default CreateProjectModal;

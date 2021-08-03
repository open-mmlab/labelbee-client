import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { Modal, Form, Menu } from 'antd';
import styles from './index.module.scss';
import RectConfig from './toolConfig/RectConfig';
import { AnnotationContext } from '../../store';
import { EToolName, TOOL_NAME } from '@/constant/store';
import { polygonnConfigString, rectConfigString, tagConfigString } from '@/mock/taskConfig';
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

const getConfigString = (toolName: EToolName) => {
  switch (toolName) {
    case EToolName.Rect:
      return rectConfigString;
    case EToolName.Tag:
      return tagConfigString;
    case EToolName.Polygon:
      return polygonnConfigString;

    default: {
      return '{}';
    }
  }
};

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

  const createProject = () => {
    form.validateFields().then((values) => {
      console.log('-=-===', values)
      return
      dispatch({
        type: 'ADD_PROJECT_LIST',
        payload: {
          projectList: [
            {
              ...values,
              toolName,
              createdAt: '2021-07-07',
              stepList: [{ step: 1, tool: toolName, config: getConfigString(toolName) }],
            },
          ],
        },
      });
      onCancel();
    });
  };

  const currentToolConfig = () => {
    switch (toolName) {
      case EToolName.Rect:
        return <RectConfig />;
      case EToolName.Tag:
        return <div>Tag</div>;
      case EToolName.Polygon:
        return <div>Polygon</div>;
      default: {
        return null;
      }
    }
  };

  return (
    <Modal visible={visible} width={800} title='创建项目' onOk={createProject} onCancel={onCancel}>
      <div className={styles.main}>
        <Menu
          defaultSelectedKeys={[toolName]}
          defaultOpenKeys={[toolName]}
          className={styles.projectTypeSelected}
        >
          {annotationTypeList.map((annotationType) => (
            <Menu.Item key={annotationType.key}>{annotationType.name}</Menu.Item>
          ))}
        </Menu>
        <div className={styles.config}>
          <Form 
          
          layout='vertical'
          
          form={form}>
            <DefaultConfig />
            {currentToolConfig()}
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default CreateProjectModal;

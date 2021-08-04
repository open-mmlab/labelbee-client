import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { Modal, Form, Menu } from 'antd';
import { omit } from 'lodash';
import styles from './index.module.scss';
import RectConfig, { rectScopeChange } from './toolConfig/RectConfig';
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

  const formatData = (values: any) => {
    // 参考 src/mock/taskConfig.ts
    if(toolName === EToolName.Rect) {
      values.minWidth = rectScopeChange(values.minWidth)
      values.minHeight = rectScopeChange(values.minHeight)
      const textConfigurable = values.textConfigurableContext
      let result = omit(values, ['textConfigurableContext'])
      return JSON.stringify({...textConfigurable, ...result, attributeList: form.getFieldValue('attributeList')})
    }
  }

  const createProject = () => {
    form.validateFields().then((values) => {
      const { name, path, resultPath} = values;
      const result = formatData(omit(values, ['name', 'path', 'resultPath']))
      dispatch({
        type: 'ADD_PROJECT_LIST',
        payload: {
          projectList: [
            {
              name,
              path,
              resultPath,
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

  const currentToolConfig = () => {
    switch (toolName) {
      case EToolName.Rect:
        return <RectConfig form={form} />;
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
    <Modal centered visible={visible} width={800} title='创建项目' onOk={createProject} onCancel={onCancel}>
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
            layout='horizontal'
            labelAlign='left'
            colon={false}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
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

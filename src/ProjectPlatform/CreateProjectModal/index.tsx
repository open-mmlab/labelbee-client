import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { Modal, Form } from 'antd';
import styles from './index.module.scss';
import RectConfig from './toolConfig/RectConfig';
import { AnnotationContext } from '../../store';
import { EToolName, TOOL_NAME } from '@/constant/store';
import { polygonnConfigString, rectConfigString, tagConfigString } from '@/mock/taskConfig';

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

  return (
    <Modal visible={visible} width={800} title='创建项目' onOk={createProject} onCancel={onCancel}>
      <div className={styles.main}>
        <div className={styles.projectTypeSelected}>
          {annotationTypeList.map((annotationType) => (
            <div
              className={classnames({
                [styles.selected]: annotationType.key === toolName,
              })}
              key={annotationType.key}
              onClick={() => setToolName(annotationType.key)}
            >
              {annotationType.name}
            </div>
          ))}
        </div>
        <div className={styles.config}>
          <Form layout='vertical' form={form}>
            <RectConfig />
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default CreateProjectModal;

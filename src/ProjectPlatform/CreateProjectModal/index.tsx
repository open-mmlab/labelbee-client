import React from 'react';
import { Modal, Form } from 'antd';
import styles from './index.module.scss';
import RectConfig from './toolConfig/RectConfig';
import { AnnotationContext } from '../../store';

interface IProps {
  visible: boolean;
  onCancel: () => void
}

const annotationTypeList = [
  {
    name: '目标检测',
  },
  {
    name: '图像分类',
  },
  {
    name: '图像分割',
  },
];

const ProjectTypeSelected = () => {
  return (
    <div>
      {annotationTypeList.map((annotationType) => (
        <div key={annotationType.name}>{annotationType.name}</div>
      ))}
    </div>
  );
};

const CreateProjectModal: React.FC<IProps> = ({ visible, onCancel }) => {
  const {
    dispatch,
    state: { fileList },
  } = React.useContext(AnnotationContext);

  const [form] = Form.useForm();
  const createProject = () => {
    form.validateFields().then((values) => {
      dispatch({
        type: 'ADD_PROJECT_LIST',
        payload: {
          projectList: [{ ...values, type: '目标检测', createdAt: '2021-07-07' }],
        },
      });
      onCancel();
    });
  };

  return (
    <Modal visible={visible} width={800} title='创建项目' onOk={createProject} onCancel={onCancel}>
      <div className={styles.main}>
        <div className={styles.projectTypeSelected}>
          <ProjectTypeSelected />
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

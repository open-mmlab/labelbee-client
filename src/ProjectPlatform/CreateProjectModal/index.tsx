import React from 'react';
import { Modal } from 'antd';
import styles from './index.module.scss';
import RectConfig from './RectConfig';

interface IProps {
  visible: boolean;
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
        <div>{annotationType.name}</div>
      ))}
    </div>
  );
};

const CreateProjectModal: React.FC<IProps> = ({ visible }) => {
  return (
    <Modal visible={true} width={800} title='创建项目'>
      <div className={styles.main}>
        <div className={styles.projectTypeSelected}>
          <ProjectTypeSelected />
        </div>
        <div className={styles.config}>
          <RectConfig />
        </div>
      </div>
    </Modal>
  );
};

export default CreateProjectModal;

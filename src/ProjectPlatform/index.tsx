import React, { useState } from 'react';
import { FileAddTwoTone } from '@ant-design/icons';
import CreateProjectModal from './CreateProjectModal';
import ProjectList from './ProjectList';
import styles from './index.module.scss';

interface IProps {}

const ProjectPlatform: React.FC<IProps> = (props) => {
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const createProject = () => {
    setCreateModalVisible(true);
  };

  return (
    <div className={styles.main}>
      <div className={styles.nav}>
        <div className={styles.title}>Label-Bee</div>
        <div className={styles.create} onClick={() => createProject()}>
          <FileAddTwoTone className={styles.icon} />
          新建
        </div>
      </div>

      <div className={styles.projectList}>
        <div className={styles.title}>全部项目列表</div>
        <ProjectList />
      </div>

      <CreateProjectModal
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
      />
    </div>
  );
};

export default ProjectPlatform;

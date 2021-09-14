import React, { useEffect, useState } from 'react';
import { FileAddTwoTone } from '@ant-design/icons';
import CreateProjectModal from './CreateProjectModal';
import { Menu, Dropdown, Button, Space } from 'antd';
import ProjectList from './ProjectList';
import styles from './index.module.scss';
import { useAnnotation } from '@/store';

interface IProps {}

export type IProjectType = 'base' | 'step';
const ProjectPlatform: React.FC<IProps> = (props) => {
  // type 项目类型分为 普通 和 多步骤创建
  const [type, setType] = useState<IProjectType>('base')
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const { dispatch } = useAnnotation();

  const createProject = (key: IProjectType) => {
    setCreateModalVisible(true);
    setType(key as IProjectType)
  };

  const onCancel = () => {
    setCreateModalVisible(false)
    dispatch({
      type: 'UPDATE_CURRENT_PROJECTINFO',
      payload: {
        projectInfo: undefined,
      },
    });
  }

  const menu = (
    <Menu
      defaultSelectedKeys={[type]}
      defaultOpenKeys={[type]}
      onClick={(info) => {
        createProject(info.key as IProjectType);
      }}
    >
      <Menu.Item key="base">
        创建项目
      </Menu.Item>
      <Menu.Item key="step">
        创建多步骤项目
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.main}>
      <div className={styles.nav}>
        <div className={styles.title}>Label-Bee</div>
        <Dropdown overlay={menu} placement="bottomLeft">
          <div className={styles.create}>
            <FileAddTwoTone className={styles.icon} />
            新建
          </div>
        </Dropdown>
      </div>

      <div className={styles.projectList}>
        <div className={styles.title}>全部项目列表</div>
        <ProjectList createProject={createProject} />
      </div>
      {
       <CreateProjectModal
          type={type}
          visible={createModalVisible}
          onCancel={onCancel}
        />
      }
    </div>
  );
};

export default ProjectPlatform;

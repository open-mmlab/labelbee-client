import React, { useEffect, useState } from 'react';
import { FileAddTwoTone } from '@ant-design/icons';
import CreateProjectModal from './CreateProjectModal';
import { Menu, Dropdown, Button, Space } from 'antd';
import ProjectList from './ProjectList';
import styles from './index.module.scss';

interface IProps {}

export type IProjectType = 'base' | 'step';
const ProjectPlatform: React.FC<IProps> = (props) => {
  // type 项目类型分为 普通 和 多步骤创建
  const [type, setType] = useState<IProjectType>('base')
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [modalAnimation, setModalAnimation] = useState(false)

  const createProject = () => {
    setCreateModalVisible(true);
  };
  // 为了销毁组件的时候  保持动画
  useEffect(() => {
    createModalVisible && setModalAnimation(true)
    if(!createModalVisible) {
      setTimeout(() => {
        setModalAnimation(createModalVisible)
      }, 300)
    }
  }, [createModalVisible])

  const menu = (
    <Menu
      defaultSelectedKeys={[type]}
      defaultOpenKeys={[type]}
      onClick={(info) => {
        setType(info.key as IProjectType)
        createProject();
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
        <ProjectList />
      </div>
      {
        modalAnimation && <CreateProjectModal
          type={type}
          visible={createModalVisible}
          onCancel={() => setCreateModalVisible(false)}
        />
      }
    </div>
  );
};

export default ProjectPlatform;

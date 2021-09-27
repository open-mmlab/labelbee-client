import React, { useState } from 'react';
import CreateProjectModal from './CreateProjectModal';
import { Menu, Dropdown, Button, Space, Layout } from 'antd';
import ProjectList from './ProjectList';
import styles from './index.module.scss';
import { useAnnotation } from '@/store';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import logo from '@/asstes/logo.svg';

const { Header, Content } = Layout;

interface IProps {}

export type IProjectType = 'base' | 'step';
const ProjectPlatform: React.FC<IProps> = (props) => {
  // type 项目类型分为 普通 和 多步骤创建
  const [type, setType] = useState<IProjectType>('base')
  const [visibleDown, setVisibleDown] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const { state: { projectList }, dispatch } = useAnnotation();

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
    <Layout className={`${styles.main} ${styles.layout}`}>
      <Header className={styles.header}>
        <img style={{width: 120}} src={logo} alt='' />
      </Header>
      <Content className={styles.content}>
        <div className={styles.contentTitle}>
          <span>项目描述
            {
              !!projectList.length && <span style={{color: '#8e8e8e'}}> ({projectList.length})</span>
            }
          </span>
            <Dropdown overlay={menu} arrow placement="bottomLeft" onVisibleChange={(v) => {
              setVisibleDown(v)
            }}>
              <Button type='primary' className={styles.createBtn}>
                新建项目
                {
                  visibleDown ? <UpOutlined style={{fontSize: 12}} /> : <DownOutlined style={{fontSize: 12}} />
                }
              </Button>
            </Dropdown>
        </div>

        <div className={styles.projectList}>
          <ProjectList createProject={createProject} />
        </div>

        <CreateProjectModal
          type={type}
          visible={createModalVisible}
          onCancel={onCancel}
        />
      </Content>
    </Layout>
  );
};

export default ProjectPlatform;

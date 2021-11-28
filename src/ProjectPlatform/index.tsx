import React, { useEffect, useState } from 'react';
import CreateProjectModal from './CreateProjectModal';
import { Menu, Dropdown, Button, Empty, Layout } from 'antd';
import ProjectList from './ProjectList';
import styles from './index.module.scss';
import { useAnnotation } from '@/store';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import logo from '@/assets/logo.svg';
import noDataImg from '@/assets/inside_nodata.svg';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../store/locale';
import i18n from '@/i18n';

const { Header, Content } = Layout;

interface IProps {}

export type IProjectType = 'base' | 'step';
const ProjectPlatform: React.FC<IProps> = (props) => {
  // type 项目类型分为 普通 和 多步骤创建
  const [type, setType] = useState<IProjectType>('base');
  const [visibleDown, setVisibleDown] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const {
    state: { projectList },
    dispatch,
  } = useAnnotation();

  const { t } = useTranslation();

  // Modal 显示不会触发 Dropdown 的 onVisibleChange
  useEffect(() => {
    createModalVisible && setVisibleDown(!createModalVisible);
  }, [createModalVisible]);

  const createProject = (key: IProjectType) => {
    setCreateModalVisible(true);
    setType(key as IProjectType);
  };

  const onCancel = () => {
    setCreateModalVisible(false);
    dispatch({
      type: 'UPDATE_CURRENT_PROJECTINFO',
      payload: {
        projectInfo: undefined,
      },
    });
  };

  const menu = (
    <Menu
      onClick={(info) => {
        createProject(info.key as IProjectType);
      }}
    >
      <Menu.Item key='base'>{t('NewOneStepProject')}</Menu.Item>
      <Menu.Item key='step'>{t('NewMultiStepProject')}</Menu.Item>
    </Menu>
  );

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const curLang = i18n.language;

  return (
    <Layout className={`${styles.main} ${styles.layout}`}>
      <Header className={styles.header}>
        <img style={{ width: 120 }} src={logo} alt='' />

        <span className={styles.lang}>
          <span
            className={`${styles.langCN} ${curLang === 'cn' ? styles.active : ''}`}
            onClick={() => changeLanguage('cn')}
          >
            中
          </span>
          {` / `}
          <span
            className={`${styles.langEN} ${curLang === 'en' ? styles.active : ''}`}
            onClick={() => changeLanguage('en')}
          >
            En
          </span>
        </span>
      </Header>
      <Content className={styles.content}>
        <div className={styles.contentTitle}>
          <span>
            {t('ProjectList')}
            {!!projectList.length && (
              <span style={{ color: '#8e8e8e' }}> ({projectList.length})</span>
            )}
          </span>
          <Dropdown
            trigger={['click']}
            overlay={menu}
            arrow
            placement='bottomLeft'
            onVisibleChange={(v) => {
              setVisibleDown(v);
            }}
          >
            <Button type='primary' className={styles.createBtn}>
              {t('NewProject')}
              {visibleDown ? (
                <UpOutlined style={{ fontSize: 12 }} />
              ) : (
                <DownOutlined style={{ fontSize: 12 }} />
              )}
            </Button>
          </Dropdown>
        </div>
        {!projectList?.length && (
          <Empty
            image={noDataImg}
            imageStyle={{ height: 200 }}
            style={{ color: '#666', marginTop: '22vh', fontSize: '15px' }}
            description={t('NoData')}
          />
        )}
        <div className={styles.projectList}>
          <ProjectList createProject={createProject} />
        </div>

        <CreateProjectModal type={type} visible={createModalVisible} onCancel={onCancel} />
      </Content>
    </Layout>
  );
};

export default ProjectPlatform;

import React, { useState, useContext } from 'react';
import { FileAddTwoTone, SmileTwoTone, SettingOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { EIpcEvent } from '../constant/event';
import CreateProjectModal from './CreateProjectModal';
import { AnnotationContext, IProjectInfo } from '../store';
const electron = window.require && window.require('electron');

interface IProps {
}

const ipcRenderer = electron && electron.ipcRenderer;

const ProjectPlatform: React.FC<IProps> = (props) => {
  const {
    state: { projectList },
    dispatch,
  } = useContext(AnnotationContext);

  const [hoverIndex, setHoverIndex] = useState(-1);
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const createProject = () => {
    setCreateModalVisible(true);
  };

  const startAnnotation = (projectInfo: IProjectInfo) => {
    dispatch({
      type: 'UPDATE_CURRENT_PROJECTINFO',
      payload: {
        projectInfo,
      },
    });

    // 加载当前路径下的所有图片
    if (ipcRenderer) {
      ipcRenderer.send(EIpcEvent.SendDirectoryImages, projectInfo.path);
      ipcRenderer.once(EIpcEvent.GetDirectoryImages, function (event: any, fileList: any[]) {
        dispatch({
          type: 'UPDATE_FILE_LIST',
          payload: {
            fileList,
          },
        });
      });
    }
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
        <div className={styles.list}>
          {projectList.map((info, i) => (
            <div
              className={styles.project}
              key={i}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(-1)}
              onDoubleClick={() => startAnnotation(info)}
            >
              <div className={styles.icon}>
                <SmileTwoTone />
              </div>
              <div className={styles.detailInfo}>
                <div className={styles.title}>{info.name}</div>
                <div className={styles.detail}>
                  <div>{info.type}</div>
                  <div>{info.path}</div>
                </div>
              </div>
              <div className={styles.createdAt}>{info.createdAt}</div>
              {hoverIndex === i && (
                <div className={styles.setting}>
                  <SettingOutlined />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <CreateProjectModal
        visible={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
      />
    </div>
  );
};

export default ProjectPlatform;

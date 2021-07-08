import React, { useState } from 'react';
import { FileAddTwoTone, SmileTwoTone, SettingOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
import { EIpcEvent } from '../constant/event';
import {  rectDefaultResult } from '../mock/index';
import CreateProjectModal from './CreateProjectModal';
const electron = window.require && window.require("electron")

interface IProps {
  setFileList: any
}

const ProjectPlatform: React.FC<IProps> = (props) => {
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const list = [
    {
      name: '我是项目名字',
      type: '目标检测',
      filePath: '/User/luozefeng/Desktop/let-me-see',
      createdAt: '2021-07-07',
    },
    {
      name: '我是项目名字',
      type: '目标检测',
      filePath: '/User/luozefeng/Desktop/let-me-see',
      createdAt: '2021-07-07',
    },
    {
      name: '我是项目名字',
      type: '目标检测',
      filePath: '/User/luozefeng/Desktop/let-me-see',
      createdAt: '2021-07-07',
    },
    {
      name: '我是项目名字',
      type: '目标检测',
      filePath: '/User/luozefeng/Desktop/let-me-see',
      createdAt: '2021-07-07',
    },
  ];

  const openDir = () => {
    const ipcRenderer = electron && electron.ipcRenderer;
    if (ipcRenderer) {
      ipcRenderer.send(EIpcEvent.SelectImage);

      ipcRenderer.once(EIpcEvent.SelectedImage, function (event: any, paths: any) {
        props.setFileList(
          paths.map((url: string, i: number) => ({ id: i + 1, url: 'file:///' + url, result: rectDefaultResult })),
        );
      });
    }
  };

  const createProject = () =>{ 
    setCreateModalVisible(true)
  }


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
          {list.map((info, i) => (
            <div
              className={styles.project}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(-1)}
              onDoubleClick={openDir}
            >
              <div className={styles.icon}>
                <SmileTwoTone />
              </div>
              <div className={styles.detailInfo}>
                <div className={styles.title}>{info.name}</div>
                <div className={styles.detail}>
                  <div>{info.type}</div>
                  <div>{info.filePath}</div>
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

      <CreateProjectModal visible={createModalVisible}/>
    </div>
  );
};

export default ProjectPlatform;

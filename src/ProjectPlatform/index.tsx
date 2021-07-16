import React, { useState, useContext } from 'react';
import { Tag, Popconfirm, message } from 'antd';
import {
  FileAddTwoTone,
  SmileTwoTone,
  DeleteOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import styles from './index.module.scss';
import { EIpcEvent } from '../constant/event';
import CreateProjectModal from './CreateProjectModal';
import { AnnotationContext, IFileInfo, IProjectInfo } from '../store';
import { EToolName, TOOL_NAME } from '@/constant/store';
const electron = window.require && window.require('electron');

/**
 * 获取是否含错误结果
 * @param tool 
 * @param fileList 
 * @param step 
 * @returns 
 */
function isHasWrongResult(tool: EToolName, fileList: IFileInfo[], step = 1) {
  try {
    const isEmpty = fileList.find((file) => {
      const result = JSON.parse(file.result);
      if (!result) {
        return false;
      }

      const stepResult = result['step_1'];

      if (!stepResult) {
        return false;
      }

      return result['step_1'].toolName !== tool;
    });

    return isEmpty;
  } catch {
    return true;
  }
}

interface IProps {}

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

  // 进入标注
  const startAnnotation = (projectInfo: IProjectInfo) => {
    // 加载当前路径下的所有图片
    if (ipcRenderer) {
      ipcRenderer.send(EIpcEvent.SendDirectoryImages, projectInfo.path, projectInfo.resultPath);
      ipcRenderer.once(EIpcEvent.GetDirectoryImages, function (event: any, fileList: any[]) {
        if (isHasWrongResult(projectInfo.toolName, fileList)) {
          message.error('工具类型不相同，结果无法解析，请选择与项目相同类型的标注结果');
          return;
        }

        dispatch({
          type: 'UPDATE_CURRENT_PROJECTINFO',
          payload: {
            projectInfo,
          },
        });
        dispatch({
          type: 'UPDATE_FILE_LIST',
          payload: {
            fileList,
          },
        });
      });
    }
  };

  const deleteProject = (i: number) => {
    const newProjectList = [...projectList];
    newProjectList.splice(i, 1);

    dispatch({
      type: 'UPDATE_PROJECT_LIST',
      payload: {
        projectList: newProjectList,
      },
    });
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
                <div className={styles.title}>
                  {info.name}{' '}
                  <Tag className={styles.tag} color='blue'>
                    {TOOL_NAME[info.toolName]}
                  </Tag>
                </div>
                <div className={styles.detail}>
                  <div>图片路径：{info.path}</div>
                  <div>结果路径：{info.resultPath}</div>
                </div>
              </div>
              <div className={styles.createdAt}>{info.createdAt}</div>
              {hoverIndex === i && (
                <>
                  <Popconfirm
                    placement='bottomRight'
                    title='确认删除？'
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    onConfirm={() => deleteProject(i)}
                  >
                    <div className={styles.deleteButton}>
                      <DeleteOutlined />
                    </div>
                  </Popconfirm>
                </>
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

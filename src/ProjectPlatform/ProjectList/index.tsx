// cl 2021/8/5 19:12
import React, { useState } from 'react';
import { IFileInfo, IProjectInfo, useAnnotation } from '@/store';
import { message, Popconfirm, Tag, Image } from 'antd';
import { EToolName, TOOL_NAME } from '@/constant/store';
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  EditOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons';
import styles from '../index.module.scss';
import { EIpcEvent } from '@/constant/event';
import { formatDate } from '@/utils/tool/common';
import { IProjectType } from '@/ProjectPlatform';
import IconRect from '@/asstes/toolIcon/icon_rect.svg';
import IconLine from '@/asstes/toolIcon/icon_line.svg';
import IconPoint from '@/asstes/toolIcon/icon_point.svg';
import IconTag from '@/asstes/toolIcon/icon_tag.svg';
import IconPolygon from '@/asstes/toolIcon/icon_polygon.svg';
import IconText from '@/asstes/toolIcon/icon_text.svg';
import IconStep from '@/asstes/toolIcon/icon_step.svg';
import { useTranslation } from 'react-i18next';

const electron = window.require && window.require('electron');

interface IProps {
  createProject: (tool: IProjectType) => void;
}
export const icon: any = {
  [EToolName.Tag]: IconTag,
  [EToolName.Rect]: IconRect,
  [EToolName.Polygon]: IconPolygon,
  [EToolName.Point]: IconPoint,
  [EToolName.Text]: IconText,
  [EToolName.Line]: IconLine,
  step: IconStep,
};

/**
 * 获取是否含错误结果
 * @param tool
 * @param fileList
 * @param step
 * @returns
 */
function isHasWrongResult(tool: EToolName, fileList: IFileInfo[], step = 1) {
  try {
    // todo 多步骤编辑没有 tool 这个参数 然后编辑数据 步骤多了个 0 步骤  后面数据正常 放到后面进行判断
    if (!tool) {
      return false;
    }

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

const ipcRenderer = electron && electron.ipcRenderer;
const ProjectList: React.FC<IProps> = ({ createProject }) => {
  const [hoverIndex, setHoverIndex] = useState(-1);
  const { t } = useTranslation();
  const {
    state: { projectList },
    dispatch,
  } = useAnnotation();
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

  const openDirectory = (path: string) => {
    if (ipcRenderer) {
      ipcRenderer.send(EIpcEvent.OpenDirectory, path);
    }
  };

  const editProject = (projectInfo: IProjectInfo) => {
    const tool = projectInfo.toolName ? 'base' : 'step';
    createProject(tool);
    dispatch({
      type: 'UPDATE_CURRENT_PROJECTINFO',
      payload: {
        projectInfo,
      },
    });
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
    <div>
      <div className={styles.projectList}>
        {projectList
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((info, i) => (
            <div
              className={styles.project}
              key={i}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(-1)}
              onDoubleClick={() => startAnnotation(info)}
            >
              <div className={styles.icon}>
                <img style={{ width: 72 }} src={icon[info.toolName || 'step']} alt='' />
              </div>
              <div className={styles.detailInfo}>
                <div className={styles.name}>
                  {info.name}{' '}
                  <Tag className={styles.tag} color='#EEEFFF'>
                    {t(TOOL_NAME[info.toolName]) || t('MultiStepAnnotation')}
                  </Tag>
                </div>
                <div className={styles.detail}>
                  <div className={styles.path}>
                    {`${t('ImagePath')}：${info.path}`}
                    <FolderOpenOutlined
                      className={styles.folderOpen}
                      onClick={() => openDirectory(info.path)}
                    />
                  </div>
                  <div>
                    {`${t('ResultPath')}：${info.resultPath}`}
                    <FolderOpenOutlined
                      className={styles.folderOpen}
                      onClick={() => openDirectory(info.resultPath)}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.createdAt}>
                {formatDate(new Date(info.createdAt), 'yyyy-MM-dd hh:mm:ss')}
              </div>
              {hoverIndex === i && (
                <div className={styles.deleteButton}>
                  <EditOutlined
                    onClick={() => editProject(info)}
                    className='primary-color'
                    style={{ marginRight: 12 }}
                  />
                  <Popconfirm
                    placement='top'
                    title={t('ConfirmToDelete')}
                    icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                    onConfirm={() => deleteProject(i)}
                  >
                    <DeleteOutlined className='primary-color' />
                  </Popconfirm>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProjectList;

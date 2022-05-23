// cl 2021/8/5 19:12
import React, { useEffect, useState } from 'react';
import { IFileInfo, IProjectInfo, IStepInfo, useAnnotation } from '@/store';
import { message, Popconfirm, Tag, Spin, Tooltip } from 'antd';
import { EToolName, TOOL_NAME } from '@/constant/store';
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  EditOutlined,
  FolderOpenOutlined,
  DeliveredProcedureOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import SelectFolder from '@/ProjectPlatform/CreateProjectModal/SelectFolder';
import ExportData from './ExportData';
import styles from '../index.module.scss';
import { EIpcEvent } from '@/constant/event';
import { copyText, formatDate, jsonParser } from '@/utils/tool/common';
import { IProjectType } from '@/ProjectPlatform';
import IconRect from '@/assets/toolIcon/icon_rect.svg';
import IconLine from '@/assets/toolIcon/icon_line.svg';
import IconPoint from '@/assets/toolIcon/icon_point.svg';
import IconTag from '@/assets/toolIcon/icon_tag.svg';
import IconPolygon from '@/assets/toolIcon/icon_polygon.svg';
import IconText from '@/assets/toolIcon/icon_text.svg';
import IconStep from '@/assets/toolIcon/icon_step.svg';
import { useTranslation } from 'react-i18next';
import DataLoading from '@/components/DataLoading';
import LoadingGif from '@/assets/loading.gif';

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
 *
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

    const stepName = `step_${step}`;

    const isEmpty = fileList.find((file) => {
      const result = JSON.parse(file.result);
      if (!result) {
        return false;
      }

      const stepResult = result[stepName];

      if (!stepResult) {
        return false;
      }

      return result[stepName].toolName !== tool;
    });

    return isEmpty;
  } catch {
    return true;
  }
}

/**
 * 结果错误检测
 * @param stepList
 * @param fileList
 * @returns
 */
function isWrongResultList(stepList: IStepInfo[], fileList: IFileInfo[]): any {
  let errorResultList: IFileInfo[] = []; //
  const error = fileList.find((fileInfo) => {
    const result = jsonParser(fileInfo.result);
    if (!result) {
      return false;
    }
    let isError: any = false;
    let isPass = false; // 用于立刻跳过

    /**
     * 数据不匹配条件
     * 1. 步骤类型不相同
     * 2. 只允许前置步骤为空
     *
     *
     *  三种情况：
     * 1. 步骤结果完全相同
     * 2. 全部为空
     * 3.
     */
    stepList.forEach((stepInfo) => {
      const step = stepInfo.step;

      // 前面存在空， 后面存在值的情况为错误
      if (isPass && result[`step_${step}`]) {
        isError = true;
        return;
      }

      // 当前这一步骤不存在的话
      if (!result[`step_${step}`]) {
        isPass = true;
        return;
      }

      if (stepInfo.tool !== result[`step_${step}`]?.toolName) {
        isError = true;
      }
    });

    if (isError === true) {
      errorResultList.push(fileInfo);
      return true;
    }
  });

  return [error, errorResultList];
}

const ipcRenderer = electron && electron.ipcRenderer;
const ProjectList: React.FC<IProps> = ({ createProject }) => {
  const [loading, setLoading] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const { t } = useTranslation();
  const [currentProjectInfo, setProjectInfo] = useState<IProjectInfo | undefined>(undefined);

  const {
    state: { projectList },
    dispatch,
  } = useAnnotation();
  // 进入标注
  const startAnnotation = (projectInfo: IProjectInfo) => {
    // 加载当前路径下的所有图片
    if (ipcRenderer) {
      setLoading(true);
      ipcRenderer.send(EIpcEvent.SendDirectoryImages, projectInfo.path, projectInfo.resultPath);
      ipcRenderer.once(EIpcEvent.GetDirectoryImages, function (event: any, fileList: any[]) {
        setLoading(false);
        if (fileList.length === 0) {
          message.error(t('NoImgInPath'));
          return;
        }

        if (isHasWrongResult(projectInfo.toolName, fileList)) {
          message.error(t('NoSameConfig'));

          return;
        }

        // imgIndex超出的话重置为0
        if (projectInfo.imgIndex > fileList.length - 1) {
          projectInfo = { ...projectInfo, imgIndex: 0 };
          const newProjectList = projectList.map((item) => {
            return item.id === projectInfo?.id ? projectInfo : item;
          });
          dispatch({
            type: 'UPDATE_PROJECT_LIST',
            payload: { projectList: newProjectList },
          });
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
      <Spin spinning={loading} indicator={<DataLoading />} delay={200} size='large'>
        <div className={styles.projectList}>
          {projectList
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((info, i) => (
              <div
                className={styles.project}
                key={i}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(-1)}
                onClick={() => startAnnotation(info)}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          openDirectory(info.path);
                        }}
                      />
                    </div>
                    <div>
                      {`${t('ResultPath')}：${info.resultPath}`}
                      <FolderOpenOutlined
                        className={styles.folderOpen}
                        onClick={(e) => {
                          e.stopPropagation();
                          openDirectory(info.resultPath);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.createdAt}>
                  {formatDate(new Date(info.createdAt), 'yyyy-MM-dd hh:mm:ss')}
                </div>
                {hoverIndex === i && (
                  <div className={styles.deleteButton}>
                    <Tooltip title={t('CopyProjectConfig')}>
                      <CopyOutlined
                        onClick={(e) => {
                          e.stopPropagation();
                          copyText(JSON.stringify(info.stepList));
                          message.success(t('CopyConfigSuccessfully'));
                        }}
                        className={styles.icon}
                        style={{ marginRight: 12 }}
                      />
                    </Tooltip>
                    <Tooltip title={t('ExportAnnotationResults')}>
                      <DeliveredProcedureOutlined
                        onClick={(e) => {
                          e.stopPropagation();
                          setProjectInfo(info);
                        }}
                        className={styles.icon}
                        style={{ marginRight: 12 }}
                      />
                    </Tooltip>
                    <Tooltip title={t('ModifyConfig')}>
                      <EditOutlined
                        onClick={(e) => {
                          e.stopPropagation();
                          editProject(info);
                        }}
                        className={styles.icon}
                        style={{ marginRight: 12 }}
                      />
                    </Tooltip>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Popconfirm
                        placement='top'
                        title={t('ConfirmToDelete')}
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => {
                          deleteProject(i);
                        }}
                      >
                        <DeleteOutlined className={styles.icon} />
                      </Popconfirm>
                    </span>
                  </div>
                )}
              </div>
            ))}
        </div>
      </Spin>
      {<ExportData projectInfo={currentProjectInfo} setProjectInfo={setProjectInfo} />}
      <img src={LoadingGif} style={{ display: 'none' }} />
    </div>
  );
};

export default ProjectList;

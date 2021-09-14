// cl 2021/8/5 19:12
import React, { useState } from 'react';
import { IFileInfo, IProjectInfo, useAnnotation } from '@/store';
import { message, Popconfirm, Tag } from 'antd';
import { EToolName, TOOL_NAME } from '@/constant/store';
import { DeleteOutlined, QuestionCircleOutlined, EditOutlined } from '@ant-design/icons';
import styles from '../index.module.scss';
import { EIpcEvent } from '@/constant/event';
import { formatDate } from '@/utils/tool/common';
import { IProjectType } from '@/ProjectPlatform';
const electron = window.require && window.require('electron');

interface IProps {
  createProject: (tool: IProjectType) => void;
}
const icon: any = {
  tagTool: 'icon-biaoqian',
  rectTool: 'icon-lakuang',
  polygonTool: 'icon-duobianxing',
  pointTool: 'icon-biaodian',
  textTool: 'icon-wenben',
  lineTool: 'icon-huaxian',
  step: 'icon-buzhou',
}

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

const ipcRenderer = electron && electron.ipcRenderer;
const ProjectList: React.FC<IProps> = ({ createProject }) => {
  const [hoverIndex, setHoverIndex] = useState(-1);
  const { state: { projectList }, dispatch } = useAnnotation()
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

  const editProject = (projectInfo: IProjectInfo) => {
    const tool = projectInfo.toolName ? 'base' : 'step'
    createProject(tool);
    dispatch({
      type: 'UPDATE_CURRENT_PROJECTINFO',
      payload: {
        projectInfo,
      },
    });
  }

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
      <div className={styles.list}>
        {projectList.sort((a, b) => b.createdAt - a.createdAt).map((info, i) => (
          <div
            className={styles.project}
            key={i}
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(-1)}
            onDoubleClick={() => startAnnotation(info)}
          >
            <div className={styles.icon}>
              <span className={`icon iconfont ${icon[info.toolName || 'step']}`} style={{fontSize: 60, color: '#6474f6'}} />
            </div>
            <div className={styles.detailInfo}>
              <div className={styles.title}>
                {info.name}{' '}
                <Tag className={styles.tag} color='blue'>
                  {TOOL_NAME[info.toolName] || '多步骤标注'}
                </Tag>
              </div>
              <div className={styles.detail}>
                <div>图片路径：{info.path}</div>
                <div>结果路径：{info.resultPath}</div>
              </div>
            </div>
            <div className={styles.createdAt}>{formatDate(new Date(info.createdAt), 'yyyy-MM-dd hh:mm:ss')}</div>
            {hoverIndex === i && (
              <div className={styles.deleteButton}>
                <EditOutlined
                  onClick={() => editProject(info)}
                  style={{marginRight: 12}} />
                <Popconfirm
                  placement='top'
                  title='确认删除？'
                  icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                  onConfirm={() => deleteProject(i)}
                >
                    <DeleteOutlined />
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
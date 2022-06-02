/*
 * Annotation Component
 * @Author: Laoluo luozefeng@sensetime.com
 * @Date: 2022-05-23 19:15:58
 * @LastEditors: Laoluo luozefeng@sensetime.com
 * @LastEditTime: 2022-05-24 10:43:53
 */

import React, { useContext, useRef } from 'react';
import AnnotationOperation from '@labelbee/lb-components';
import '@labelbee/lb-components/dist/index.css';
import { EIpcEvent } from '../constant/event';
import { AnnotationContext } from '../store';
import i18n from '@/i18n';

const electron = window.require && window.require('electron');
const ipcRenderer = electron?.ipcRenderer;

const Annotation = (props: any) => {
  const {
    dispatch,
    state: { currentProjectInfo, projectList, fileList },
  } = useContext(AnnotationContext);
  const cacheProjectList = useRef(projectList); // TODO: I will rewrite by custom hook later

  const onSubmit = (data: any[], submitType: any, i: number) => {
    // 翻页时触发当前页面数据的输出
    if (ipcRenderer) {
      // 翻页时触发数据保存
      ipcRenderer.send(
        EIpcEvent.SaveResult,
        data,
        currentProjectInfo?.path,
        currentProjectInfo?.resultPath,
      );
    }
  };

  const goBack = (imgList: any[]) => {
    dispatch({
      type: 'UPDATE_CURRENT_PROJECTINFO',
      payload: {
        projectInfo: undefined,
      },
    });

    // 清空默认操作
    dispatch({
      type: 'UPDATE_FILE_LIST',
      payload: {
        fileList: [],
      },
    });
  };

  const updateProjectInfo = (info: { imgIndex?: number; step?: number }) => {
    // Notice:  The value of context(e.g. projectList) is not updated
    const newProjectList = cacheProjectList.current.map((item) => {
      return item.id === currentProjectInfo?.id ? { ...item, ...info } : item;
    });
    cacheProjectList.current = newProjectList; // need to update
    dispatch({
      type: 'UPDATE_PROJECT_LIST',
      payload: { projectList: newProjectList },
    });
  };

  const onPageChange = (imgIndex: number) => {
    // 保存当前页数到本地
    updateProjectInfo({ imgIndex });
  };

  const onStepChange = (step: number) => {
    // 保存当前步骤到本地
    updateProjectInfo({ step });
  };

  const loadFileList = (page: number, size: number) => {
    return new Promise((resolve) => {
      const currentList = fileList.slice(page * size, (page + 1) * size);
      ipcRenderer.send(
        EIpcEvent.GetFileListResult,
        currentList,
        currentProjectInfo?.path,
        currentProjectInfo?.resultPath,
      );
      ipcRenderer.once(EIpcEvent.GetFileListResultReply, (event: any, newFileList: any[]) => {
        resolve({
          fileList: newFileList.map((file: any) => ({ ...file, url: 'file:///' + file.url })),
          total: fileList.length,
        });
      });
    });
  };

  return (
    <div>
      <AnnotationOperation
        headerName={currentProjectInfo?.name}
        onSubmit={onSubmit}
        onPageChange={onPageChange}
        onStepChange={onStepChange}
        loadFileList={loadFileList}
        goBack={goBack}
        stepList={currentProjectInfo?.stepList}
        step={currentProjectInfo?.step}
        defaultLang={i18n.language}
        initialIndex={currentProjectInfo?.imgIndex}
        showTips={true}
      />
    </div>
  );
};
export default Annotation;

import React, { useContext } from 'react';
import AnnotationOperation from 'label-bee';
import 'label-bee/dist/index.css';
import { EIpcEvent } from '../constant/event';
import { AnnotationContext } from '../store';

const electron = window.require && window.require('electron');

const Annotation = (props: any) => {
  const {
    dispatch,
    state: { currentProjectInfo },
  } = useContext(AnnotationContext);
  const { fileList, step, stepList } = props;

  const onSubmit = (data: any, submitType: any, i: number) => {
    // 翻页时触发当前页面数据的输出
    console.log('submitData1', data, submitType, i);
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

    // 将数据保存的到本地
    if (electron) {
      electron.ipcRenderer.send(
        EIpcEvent.SaveResult,
        imgList,
        currentProjectInfo?.path,
        currentProjectInfo?.resultPath,
      );
    }
  };

  return (
    <div>
      <AnnotationOperation
        headerName={currentProjectInfo?.name}
        onSubmit={onSubmit}
        imgList={fileList.map((file: any) => ({
          ...file,
          url: 'file:///' + file.url,
        }))}
        goBack={goBack}
        stepList={stepList}
        step={step}
      />
    </div>
  );
};
export default Annotation;

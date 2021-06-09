import React from 'react';
import AnnotationOperation from 'label-bee';
import 'label-bee/dist/index.css';
import { EIpcEvent } from '../constant/event';

const electron = window.require && window.require('electron');

const Annotation = (props: any) => {
  const { fileList, goBack, stepList, step } = props;

  const exportData = (data: any) => {
    if (electron) {
      electron.ipcRenderer.send(EIpcEvent.SaveResult, data);
    }
  };

  const onSubmit = (data: any) => {
    // 翻页时触发当前页面数据的输出
    console.log('submitData', data);
  };

  return (
    <div>
      <AnnotationOperation
        exportData={exportData}
        onSubmit={onSubmit}
        imgList={fileList}
        goBack={goBack}
        stepList={stepList}
        step={step}
      />
    </div>
  );
};
export default Annotation;

import React, { useState } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Annotation from './Annotation';
import { fileList as mockFileList, rectDefaultResult, tagDefaultResult } from './mock/index';
import { stepList } from './mock/taskConfig';
import { EIpcEvent } from './constant/event';
const electron = window.require && window.require("electron")

const App = () => {
  const [fileList, setFileList] = useState([]);

  const openDir = () => {
    const ipcRenderer = electron && electron.ipcRenderer;
    if (ipcRenderer) {
      ipcRenderer.send(EIpcEvent.SelectImage);

      ipcRenderer.once(EIpcEvent.SelectedImage, function (event: any, paths: any) {
        setFileList(
          paths.map((url: string, i: number) => ({ id: i + 1, url: 'file:///' + url, result: rectDefaultResult })),
        );
      });
    }
  };

  if (fileList.length > 0) {
    return <Annotation fileList={fileList} stepList={stepList} step={1} />;
  }

  return (
    <div className='App'>
      <button onClick={openDir}>open</button>
    </div>
  );
};

export default App;

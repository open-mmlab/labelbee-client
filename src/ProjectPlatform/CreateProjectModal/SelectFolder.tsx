import React from 'react';
import { EIpcEvent } from '../../constant/event';
const electron = window.require && window.require('electron');

interface IProps {}

const SelectFolder: React.FC<{}> = (props) => {
  const openDir = () => {
    const ipcRenderer = electron && electron.ipcRenderer;
    if (ipcRenderer) {
      ipcRenderer.send(EIpcEvent.SelectImage);

      ipcRenderer.once(EIpcEvent.SelectedImage, function (event: any, paths: any) {
        console.log('event',event,paths)
        // props.setFileList(
        //   paths.map((url: string, i: number) => ({ id: i + 1, url: 'file:///' + url, result: rectDefaultResult })),
        // );
      });
    }
  };

  return <div onClick={openDir}><button>123</button></div>;
};

export default SelectFolder;

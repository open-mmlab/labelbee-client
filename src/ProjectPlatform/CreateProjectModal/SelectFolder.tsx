import React, { useState, useRef } from 'react';
import { Input } from 'antd';
import { FolderOpenOutlined } from '@ant-design/icons'
import { EIpcEvent } from '../../constant/event';
const electron = window.require && window.require('electron');

interface IProps {
  value?: string;
  key: string;
  onChange?: (value: any) => void;
}

const SelectFolder: React.FC<IProps> = ({value, onChange, key }) => {
  const [path, setPath] = useState('');
  const pathRef = useRef<HTMLInputElement>(null);
  console.log('value', value)

  const openDir = () => {
    const ipcRenderer = electron && electron.ipcRenderer;
    if (ipcRenderer) {
      ipcRenderer.send(EIpcEvent.SelectDirectory);
      ipcRenderer.once(EIpcEvent.SelectedDirectory, function (event: any, paths: any) {
        setPath(paths[0]);

        if (pathRef.current !== null) {
          pathRef.current.value = paths[0];
        }

        if (onChange) {
          onChange(paths[0]);
        }
      });
    }
    // 具体的图片
  };
  return (
    <div key={key}>
      <Input addonAfter={<FolderOpenOutlined onClick={openDir} />} value={value || path} />
    </div>
  );
};

export default SelectFolder;

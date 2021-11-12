import React, { useState, useRef } from 'react';
import { Input } from 'antd';
import { FolderOpenOutlined } from '@ant-design/icons';
import { EIpcEvent } from '../../constant/event';
import styles from './index.module.scss';
const electron = window.require && window.require('electron');

interface IProps {
  value?: string;
  key: string;
  disabled?: boolean;
  onChange?: (value: any) => void;
}

const SelectFolder: React.FC<IProps> = ({ value, disabled, onChange, key }) => {
  const [path, setPath] = useState('');
  const pathRef = useRef<HTMLInputElement>(null);

  const openDir = () => {
    const ipcRenderer = electron && electron.ipcRenderer;
    if (ipcRenderer && !disabled) {
      // 防止监听多个
      ipcRenderer.removeAllListeners([EIpcEvent.SelectedDirectory], () => {});
      ipcRenderer.send(EIpcEvent.SelectDirectory);
      ipcRenderer.once(EIpcEvent.SelectedDirectory, function (event: any, paths: any) {
        setPath(paths[0]);

        if (pathRef.current !== null) {
          pathRef.current.value = paths[0];
        }
        onChange?.(paths[0]);
      });
    }
    // 具体的图片
  };
  return (
    <div key={key} style={{ pointerEvents: 'all', cursor: 'pointer'}} onClick={openDir}>
      <Input
        className={`${disabled ? 'select-folder-disabled' : styles.inputNonePointer}`}
        disabled={disabled}
        addonAfter={<FolderOpenOutlined />}
        value={value || path}
      />
    </div>
  );
};

export default SelectFolder;

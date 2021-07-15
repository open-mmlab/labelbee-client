import { EIpcEvent } from '../src/constant/event';
import { getFilesFromDirectory, getResultFromFiles } from './file';
import { IMAGE_SUFFIX } from '../src/constant/file';
const fs = require('fs');
const { ipcMain: ipc, dialog } = require('electron');

export const ipcListen = (mainWindow) => {
  ipc.on(EIpcEvent.SelectImage, (event) => {
    dialog
      .showOpenDialog(mainWindow, {
        properties: ['openFile', 'openDirectory'],
      })
      .then((r: any) => {
        if (!r.canceled) {
          const files = getFilesFromDirectory(r.filePaths, IMAGE_SUFFIX);
          event.reply(EIpcEvent.SelectedImage, files);
        }
      });
  });

  ipc.on(EIpcEvent.SaveResult, (event, fileList) => {
    fileList.forEach((file) => {
      fs.writeFileSync(file.url.substr(8) + '.json', file.result);
    });
  });

  // 获取当前选择目录
  ipc.on(EIpcEvent.SelectDirectory, (event) => {
    dialog
      .showOpenDialog(mainWindow, {
        properties: ['openDirectory'],
      })
      .then((r: any) => {
        if (!r.canceled) {
          event.reply(EIpcEvent.SelectedDirectory, r.filePaths);
        }
      });
  });

  // 获取当前目录下数据
  ipc.on(EIpcEvent.SendDirectoryImages, (event, paths) => {
    const files = getFilesFromDirectory(paths, IMAGE_SUFFIX);
    const newFiles = getResultFromFiles(
      files,
      IMAGE_SUFFIX,
    );

    event.reply(EIpcEvent.GetDirectoryImages, newFiles);
  });
};

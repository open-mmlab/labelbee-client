import { EIpcEvent } from '../src/constant/event';
import { getFilesFromDirectory, getResultFromFiles, getResultPathFromImgPath } from './file';
import { IMAGE_SUFFIX } from '../src/constant/file';
const fs = require('fs');
const { ipcMain: ipc, dialog } = require('electron');
const fse = require('fs-extra');
const { shell } = require('electron');

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

  ipc.on(EIpcEvent.SaveResult, (event, fileList, path, resultPath) => {
    fileList.forEach((file) => {
      const imgUrl = file.url.substr(8);
      const resultUrl = getResultPathFromImgPath(imgUrl, path, resultPath) + '.json';

      fse.outputFile(resultUrl, file.result, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(resultUrl, ' The file was saved!');
        }
      });
    });
  });

  // 保存结果到指定文件夹
  ipc.on(EIpcEvent.SaveFile, (event, file, path) => {
    fse.outputFile(path, file, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(path, ' The file was saved!');
      }
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
  ipc.on(EIpcEvent.SendDirectoryImages, (event, path, resultPath) => {
    const files = getFilesFromDirectory(path, IMAGE_SUFFIX);
    const newFiles = getResultFromFiles(files, IMAGE_SUFFIX, path, resultPath);
    event.reply(EIpcEvent.GetDirectoryImages, newFiles, files);
  });

  ipc.on(EIpcEvent.OpenDirectory, (event, path) => {
    shell.showItemInFolder(path);
  });
};

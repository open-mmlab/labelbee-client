import { EIpcEvent } from '../src/constant/event';
import { getFilesFromDirectory } from './file';
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
};

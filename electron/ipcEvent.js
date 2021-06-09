const { EIpcEvent } = require('../src/constant/event');
const { getFilesFromDirectory } = require('./file');
const { IMAGE_SUFFIX } = require('../src/constant/file');

const fs = require('fs');

const { ipcMain: ipc, dialog } = require('electron');

const ipcListen = (mainWindow) => {
  ipc.on(EIpcEvent.SelectImage, (event) => {
    dialog
      .showOpenDialog(mainWindow, {
        properties: ['openFile', 'openDirectory'],
      })
      .then((r) => {
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

module.exports = ipcListen;

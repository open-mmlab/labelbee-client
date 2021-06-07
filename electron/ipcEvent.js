const { EIpcEvent } = require('../src/constant/event');
const { getFilesFromDirectory } = require('./file.');

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
          const files = getFilesFromDirectory(r.filePaths);
          event.reply(EIpcEvent.SelectedImage, files);
        }
      });
  });

};

module.exports = ipcListen;

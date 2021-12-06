import { ipcListen } from './ipcEvent';
const electron = require('electron');
const platform = require('os').platform(); // 获取平台：https://nodejs.org/api/os.html#os_os_platform
const version = '1.1.4';

// 控制app生命周期.
const app = electron.app;
// 浏览器窗口.
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

const path = require('path');
const url = require('url');
const ipc = electron.ipcMain;

let mainWindow;

ipc.on('app close window', (sys, msg) => {
  console.log(sys, msg);
  mainWindow.close();
});

const setupMenu = () => {
  const menu = new Menu();
  mainWindow.setMenu(menu);

  const template: any = [
    {
      label: 'Version',
      submenu: [
        {
          label: `版本版本：${version}`,
          type: 'normal',
        },
      ],
    },
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
};

function createWindow() {
  // 创建一个浏览器窗口.
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true, //允许使用node的方式引入
      webSecurity: false, // 允许使用本地资源
      contextIsolation: false,
    },
    backgroundColor: '#B1FF9D',
    icon: path.join(__dirname, './../../../build/icon/label-app-icon-512.png'),
  });

  // 这里要注意一下，这里是让浏览器窗口加载网页。
  // 如果是开发环境，则url为http://localhost:3000（package.json中配置）
  // 如果是生产环境，则url为build/index.html
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, './../../../build/index.html'),
      protocol: 'file:',
      slashes: true,
    });

  // 无需添加 menu 栏。
  setupMenu();

  // 加载网页之后，会创建`渲染进程`
  mainWindow.loadURL(startUrl);

  // 打开chrome浏览器开发者工具.
  if (startUrl.startsWith('http')) {
    mainWindow.webContents.openDevTools();
  }

  ipcListen(mainWindow);
  electron.protocol.interceptFileProtocol(
    'file',
    (req, callback) => {
      const url = req.url.substr(8);
      let newUrl = url;
      try {
        newUrl = decodeURI(url);
      } catch (e) {
        console.error(e);
      }

      callback(newUrl);
    },
    // (error) => {
    //   if (error) {
    //     console.error('Failed to register protocol');
    //   }
    // },
  );

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

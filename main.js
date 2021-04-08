const electron = require('electron');
const platform = require('os').platform(); // 获取平台：https://nodejs.org/api/os.html#os_os_platform
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

console.log(platform);

const setupMenu = () => {
  const menu = new Menu();
  mainWindow.setMenu(menu);

  const template = [
    {
      label: 'Application',
      submenu: [
        {
          label: 'About Application',
          selector: 'orderFrontStandardAboutPanel:',
        },
        {
          type: 'separator',
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => {
            quit();
          },
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          selector: 'undo:',
        },
        {
          label: 'Redo',
          accelerator: 'Shift+CmdOrCtrl+Z',
          selector: 'redo:',
        },
        {
          type: 'separator',
        },
        {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          selector: 'cut:',
        },
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          selector: 'copy:',
        },
        {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          selector: 'paste:',
        },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          selector: 'selectAll:',
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
    },
    backgroundColor: '#B1FF9D',
  });

  // 这里要注意一下，这里是让浏览器窗口加载网页。
  // 如果是开发环境，则url为http://localhost:3000（package.json中配置）
  // 如果是生产环境，则url为build/index.html
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, './build/index.html'),
      protocol: 'file:',
      slashes: true,
    });
  setupMenu();
  // 加载网页之后，会创建`渲染进程`
  mainWindow.loadURL(startUrl);

  // 打开chrome浏览器开发者工具.
  if (startUrl.startsWith('http')) {
    // mainWindow.webContents.openDevTools();
  }

  mainWindow.webContents.openDevTools();
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

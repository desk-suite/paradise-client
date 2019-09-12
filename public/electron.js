const {app, BrowserWindow} = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const Update = require('./updates');


let win;

const installExtensions = async () => {
  // eslint-disable-next-line global-require
  const installer = require('electron-devtools-installer')
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'  ]

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch()
}

function createDefaultWindow() {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    }
  });
  if (isDev) {
    // Open the DevTools.
    win.webContents.openDevTools();
  }
  win.on('closed', () => {
    win = null;
  });
  win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  return win;
}

app.on('ready', async () => {
  if(isDev && process.argv.indexOf('--noDevServer') === -1) {
    await installExtensions()
  }
  createDefaultWindow();

  Update(win).initialize()
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createDefaultWindow();
  }
});

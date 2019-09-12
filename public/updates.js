const { ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

let win;

const initialize = () => {
  autoUpdater.autoDownload = true;
  ipcMain.on('electron-update', (event, config) => {
    switch (config.type) {
      case 'checkUpdates': {
        autoUpdater.checkForUpdates();
        break;
      }
      default: {
        break;
      }
    }
    // autoUpdater.checkForUpdatesAndNotify();
  });

  function sendStatusToWindow(text) {
    log.info(text);
    win.webContents.send('message', text);
  }
  autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
    win.webContents.send('electron-update', {
      type: 'checking-for-update'
    });
  });
  autoUpdater.on('update-available', data => {
    sendStatusToWindow('Update available.');
    win.webContents.send('electron-update', {
      type: 'update-available',
      data
    });
  });
  autoUpdater.on('update-not-available', data => {
    sendStatusToWindow('Update not available.');
    win.webContents.send('electron-update', {
      type: 'update-not-available',
      data
    });
  });
  autoUpdater.on('error', err => {
    sendStatusToWindow(`Error in auto-updater. ${err}`);
    win.webContents.send('electron-update', {
      type: 'error',
      error: err
    });
  });
  autoUpdater.on('download-progress', progressObj => {
    let logMessage = `Download speed: ${progressObj.bytesPerSecond}`;
    logMessage = `${logMessage} - Downloaded ${progressObj.percent}%`;
    logMessage = `${logMessage} (${progressObj.transferred}/${progressObj.total})`;
    sendStatusToWindow(logMessage);
    win.webContents.send('download-progress', {
      type: 'error',
      data: progressObj
    });
  });
  autoUpdater.on('update-downloaded', data => {
    sendStatusToWindow('Update downloaded');
    win.webContents.send('download-progress', {
      type: 'error',
      data
    });
  });
};

const Update = _win => {
  win = _win;

  return {
    initialize
  };
};

module.exports = Update;

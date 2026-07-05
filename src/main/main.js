'use strict';

const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');

const { getStaticConfig, getState } = require('./config');
const gameManager = require('./gameManager');
const auth = require('./auth');
const { initLauncherUpdater } = require('./launcherUpdater');

let mainWindow = null;
let launcherUpdater = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 680,
    minWidth: 940,
    minHeight: 600,
    frame: false,
    resizable: true,
    backgroundColor: '#0a0b12',
    show: false,
    title: 'Basalt Launcher',
    icon: path.join(__dirname, '..', '..', 'build', 'icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
      autoplayPolicy: 'no-user-gesture-required',
    },
  });

  mainWindow.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'));

  // En dev, remonte les erreurs/warnings du renderer dans le terminal
  if (!app.isPackaged) {
    mainWindow.webContents.on('console-message', (_e, level, message, line, source) => {
      if (level >= 2) console.log(`[renderer] ${message} (${source}:${line})`);
    });
  }

  // Relaie les changements de session (refresh token, expiration, logout) au renderer
  auth.onAuthChange((user) => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('auth:change', user);
    }
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    // Auto-update du launcher (silencieux, en prod uniquement)
    if (app.isPackaged) {
      launcherUpdater = initLauncherUpdater(mainWindow);
      launcherUpdater.check();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// ------------------------------------------------------------------ IPC

function forwardProgress(payload) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('game:progress', payload);
  }
}

ipcMain.handle('app:getBootstrap', () => {
  const c = getStaticConfig();
  return {
    studio: c.studio,
    gameName: c.gameName,
    gameTagline: c.gameTagline,
    launcherVersion: app.getVersion(),
    isPackaged: app.isPackaged,
    requireLogin: c.requireLogin !== false,
    authConfigured: auth.isConfigured(),
    local: gameManager.getLocalStatus(),
  };
});

// -------- Auth
ipcMain.handle('auth:current', () => auth.getCurrentUser());
ipcMain.handle('auth:signUp', (_e, p) => auth.signUp(p));
ipcMain.handle('auth:signIn', (_e, p) => auth.signIn(p));
ipcMain.handle('auth:signOut', () => auth.signOut());
ipcMain.handle('auth:updateUsername', (_e, name) => auth.updateUsername(name));
ipcMain.handle('auth:resetPassword', (_e, email) => auth.resetPassword(email));

// -------- Bibliothèque / possession
ipcMain.handle('game:owns', () => auth.ownsGame());
ipcMain.handle('game:addToLibrary', () => auth.addToLibrary());

ipcMain.handle('game:check', async () => {
  try {
    return { ok: true, data: await gameManager.checkForGameUpdate() };
  } catch (e) {
    return { ok: false, error: String(e.message || e) };
  }
});

ipcMain.handle('game:install', async () => {
  try {
    const res = await gameManager.installGame(forwardProgress);
    return { ok: true, data: res };
  } catch (e) {
    forwardProgress({ phase: 'error', message: String(e.message || e) });
    return { ok: false, error: String(e.message || e) };
  }
});

ipcMain.handle('game:play', () => {
  try {
    gameManager.launchGame(() => {
      // À la fermeture du jeu : on restaure le launcher et on relance la musique
      if (mainWindow && !mainWindow.isDestroyed()) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.show();
        mainWindow.focus();
        mainWindow.webContents.send('game:stopped');
      }
    });
    // Jeu lancé : on réduit le launcher et on coupe la musique
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send('game:started');
      mainWindow.minimize();
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String(e.message || e) };
  }
});

ipcMain.handle('game:chooseDir', async () => {
  const res = await dialog.showOpenDialog(mainWindow, {
    title: "Dossier d'installation de My Universe",
    properties: ['openDirectory', 'createDirectory'],
    defaultPath: gameManager.installDir(),
  });
  if (res.canceled || !res.filePaths[0]) return { ok: false };
  const dir = path.join(res.filePaths[0], 'My Universe');
  gameManager.setInstallDir(dir);
  return { ok: true, dir };
});

ipcMain.handle('game:openFolder', () => {
  shell.openPath(gameManager.installDir());
  return { ok: true };
});

ipcMain.handle('game:uninstall', () => {
  gameManager.uninstallGame();
  return { ok: true, local: gameManager.getLocalStatus() };
});

ipcMain.handle('launcher:quitAndInstall', () => {
  if (launcherUpdater) launcherUpdater.quitAndInstall();
  return { ok: true };
});

ipcMain.handle('shell:openExternal', (_e, url) => {
  if (/^https?:\/\//i.test(url)) shell.openExternal(url);
  return { ok: true };
});

// Controles de la fenetre custom
ipcMain.on('win:minimize', () => mainWindow && mainWindow.minimize());
ipcMain.on('win:close', () => mainWindow && mainWindow.close());

// ------------------------------------------------------------------ lifecycle

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

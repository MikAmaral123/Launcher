'use strict';

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('launcher', {
  // Donnees de demarrage
  getBootstrap: () => ipcRenderer.invoke('app:getBootstrap'),

  // Jeu
  ownsGame: () => ipcRenderer.invoke('game:owns'),
  addToLibrary: () => ipcRenderer.invoke('game:addToLibrary'),
  checkGame: () => ipcRenderer.invoke('game:check'),
  installGame: () => ipcRenderer.invoke('game:install'),
  playGame: () => ipcRenderer.invoke('game:play'),
  chooseInstallDir: () => ipcRenderer.invoke('game:chooseDir'),
  openInstallFolder: () => ipcRenderer.invoke('game:openFolder'),
  uninstallGame: () => ipcRenderer.invoke('game:uninstall'),

  // Auth (comptes joueurs)
  auth: {
    current: () => ipcRenderer.invoke('auth:current'),
    signUp: (payload) => ipcRenderer.invoke('auth:signUp', payload),
    signIn: (payload) => ipcRenderer.invoke('auth:signIn', payload),
    signOut: () => ipcRenderer.invoke('auth:signOut'),
    updateUsername: (name) => ipcRenderer.invoke('auth:updateUsername', name),
    resetPassword: (email) => ipcRenderer.invoke('auth:resetPassword', email),
    onChange: (cb) => {
      const h = (_e, user) => cb(user);
      ipcRenderer.on('auth:change', h);
      return () => ipcRenderer.removeListener('auth:change', h);
    },
  },

  // Launcher self-update
  quitAndInstallLauncher: () => ipcRenderer.invoke('launcher:quitAndInstall'),

  // Divers
  openExternal: (url) => ipcRenderer.invoke('shell:openExternal', url),
  minimize: () => ipcRenderer.send('win:minimize'),
  close: () => ipcRenderer.send('win:close'),

  // Events
  onGameProgress: (cb) => {
    const h = (_e, p) => cb(p);
    ipcRenderer.on('game:progress', h);
    return () => ipcRenderer.removeListener('game:progress', h);
  },
  onLauncherUpdate: (cb) => {
    const h = (_e, p) => cb(p);
    ipcRenderer.on('launcher:update', h);
    return () => ipcRenderer.removeListener('launcher:update', h);
  },
  onGameStarted: (cb) => {
    const h = () => cb();
    ipcRenderer.on('game:started', h);
    return () => ipcRenderer.removeListener('game:started', h);
  },
  onGameStopped: (cb) => {
    const h = () => cb();
    ipcRenderer.on('game:stopped', h);
    return () => ipcRenderer.removeListener('game:stopped', h);
  },
});

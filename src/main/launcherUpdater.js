'use strict';

/**
 * Auto-update DU LAUNCHER lui-meme, via electron-updater + GitHub Releases.
 * Envoie des evenements au renderer pour afficher l'etat.
 */
const { autoUpdater } = require('electron-updater');

function initLauncherUpdater(win) {
  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;

  const send = (channel, payload) => {
    if (win && !win.isDestroyed()) win.webContents.send(channel, payload);
  };

  autoUpdater.on('checking-for-update', () => send('launcher:update', { state: 'checking' }));
  autoUpdater.on('update-not-available', (info) =>
    send('launcher:update', { state: 'none', version: info && info.version })
  );
  autoUpdater.on('update-available', (info) =>
    send('launcher:update', { state: 'available', version: info && info.version })
  );
  autoUpdater.on('download-progress', (p) =>
    send('launcher:update', { state: 'downloading', percent: p.percent / 100 })
  );
  autoUpdater.on('update-downloaded', (info) =>
    send('launcher:update', { state: 'ready', version: info && info.version })
  );
  autoUpdater.on('error', (err) =>
    send('launcher:update', { state: 'error', message: String(err && err.message) })
  );

  return {
    check: () => autoUpdater.checkForUpdates().catch(() => {}),
    quitAndInstall: () => autoUpdater.quitAndInstall(),
  };
}

module.exports = { initLauncherUpdater };

'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');
const extract = require('extract-zip');

const { getStaticConfig, getState, setState, defaultInstallDir } = require('./config');
const { getJson, downloadToFile } = require('./download');

function cfg() {
  return getStaticConfig();
}

function installDir() {
  return getState().installDir || defaultInstallDir();
}

function exePath() {
  return path.join(installDir(), cfg().gameExecutable);
}

/**
 * Compare deux tags de version. Renvoie true si `latest` differe de `current`.
 * (Comparaison simple : toute difference = mise a jour dispo.)
 */
function isDifferent(latest, current) {
  if (!current) return true;
  return String(latest).trim() !== String(current).trim();
}

function pickAsset(assets) {
  const rule = new RegExp(cfg().assetMatch || '\\.zip$', 'i');
  const zips = assets.filter((a) => /\.zip$/i.test(a.name));
  return zips.find((a) => rule.test(a.name)) || zips[0] || null;
}

/**
 * Interroge GitHub pour la derniere release du JEU.
 */
async function checkForGameUpdate() {
  const { owner, repo } = cfg().gameRepo;
  if (!owner || !repo || owner.startsWith('REMPLACE')) {
    return { configured: false };
  }

  const token = cfg().githubToken || '';
  const url = `https://api.github.com/repos/${owner}/${repo}/releases/latest`;

  const release = await getJson(url, token);
  const latestVersion = release.tag_name;
  const asset = pickAsset(release.assets || []);
  const state = getState();
  const installed = !!state.installedVersion && fs.existsSync(exePath());

  return {
    configured: true,
    latestVersion,
    currentVersion: state.installedVersion,
    installed,
    needsUpdate: !installed || isDifferent(latestVersion, state.installedVersion),
    asset: asset
      ? {
          name: asset.name,
          url: asset.browser_download_url, // repo public
          apiUrl: asset.url, // repo prive (api.github.com/.../assets/ID + Accept octet-stream)
          size: asset.size,
        }
      : null,
    releaseNotes: release.body || '',
    releaseName: release.name || latestVersion,
    publishedAt: release.published_at,
  };
}

/**
 * Telecharge + installe (ou met a jour) le jeu.
 * onProgress({ phase, transferred, total, percent, bytesPerSec })
 */
async function installGame(onProgress) {
  const info = await checkForGameUpdate();
  if (!info.configured) throw new Error('Repo du jeu non configure (launcher.config.json).');
  if (!info.asset) throw new Error('Aucune archive .zip trouvee dans la derniere release.');

  const dir = installDir();
  fs.mkdirSync(dir, { recursive: true });

  const tmpZip = path.join(os.tmpdir(), `myuniverse-${Date.now()}.zip`);

  const emit = (p, extra) => onProgress && onProgress(Object.assign({ phase: p }, extra));

  // 1. Telechargement (repo prive -> URL API de l'asset avec token ; sinon URL publique)
  const token = cfg().githubToken || '';
  const dlUrl = token ? info.asset.apiUrl : info.asset.url;
  emit('download', { percent: 0, transferred: 0, total: info.asset.size });
  await downloadToFile(dlUrl, tmpZip, token, (p) => emit('download', p));

  // 2. Nettoyage de l'ancienne install (mise a jour propre)
  emit('cleanup', { percent: 0 });
  cleanDir(dir);

  // 3. Extraction
  emit('extract', { percent: 0 });
  await extract(tmpZip, {
    dir,
    onEntry: (entry, zip) => {
      const total = zip.entryCount || 1;
      const done = (zip.entriesRead || 0) + 1;
      emit('extract', { percent: done / total, entryName: entry.fileName });
    },
  });

  // 4. Cleanup temp
  try {
    fs.unlinkSync(tmpZip);
  } catch (_) {}

  setState({ installedVersion: info.latestVersion, installDir: dir });
  emit('done', { percent: 1 });

  return { installedVersion: info.latestVersion, installDir: dir };
}

function cleanDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    fs.rmSync(path.join(dir, name), { recursive: true, force: true });
  }
}

/**
 * Lance l'executable du jeu.
 */
function launchGame() {
  const exe = exePath();
  if (!fs.existsSync(exe)) {
    throw new Error(`Executable introuvable : ${exe}`);
  }
  const child = spawn(exe, [], {
    detached: true,
    stdio: 'ignore',
    cwd: installDir(),
  });
  child.unref();
  setState({ lastPlayed: new Date().toISOString() });
  return true;
}

function getLocalStatus() {
  const state = getState();
  return {
    installedVersion: state.installedVersion,
    installDir: installDir(),
    installed: !!state.installedVersion && fs.existsSync(exePath()),
    lastPlayed: state.lastPlayed,
  };
}

function setInstallDir(dir) {
  setState({ installDir: dir });
  return installDir();
}

function uninstallGame() {
  cleanDir(installDir());
  setState({ installedVersion: null, lastPlayed: null });
  return true;
}

module.exports = {
  checkForGameUpdate,
  installGame,
  launchGame,
  getLocalStatus,
  setInstallDir,
  uninstallGame,
  installDir,
};

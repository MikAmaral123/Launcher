'use strict';

const fs = require('fs');
const path = require('path');
const { app } = require('electron');

/**
 * Deux sources de config :
 *  1. launcher.config.json  -> config STATIQUE livree avec l'app (repos, nom du jeu...).
 *  2. launcher-state.json   -> ETAT local mutable (version installee, dossier d'install...).
 */

function readJsonSafe(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    return fallback;
  }
}

// --- Config statique -------------------------------------------------------

function locateStaticConfig() {
  // En prod (asar), extraResources copie le fichier a cote de l'app.
  const candidates = [
    process.resourcesPath ? path.join(process.resourcesPath, 'launcher.config.json') : null,
    path.join(app.getAppPath(), 'launcher.config.json'),
    path.join(__dirname, '..', '..', 'launcher.config.json'),
  ].filter(Boolean);

  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return candidates[candidates.length - 1];
}

const DEFAULT_STATIC = {
  studio: 'Basalt Game',
  gameName: 'My Universe',
  gameTagline: '',
  launcherRepo: { owner: '', repo: '' },
  gameRepo: { owner: '', repo: '' },
  assetMatch: '\\.zip$',
  gameExecutable: 'game.exe',
  githubToken: '',
  supabase: { url: '', anonKey: '' },
  requireLogin: true,
  downloadMode: 'supabase',
  closeLauncherOnPlay: false,
};

// Surcharge locale NON commitee (secrets: token GitHub prive...).
// Cherchee a cote de launcher.config.json (dev + prod).
function locateLocalConfig() {
  const base = locateStaticConfig();
  return path.join(path.dirname(base), 'launcher.config.local.json');
}

let staticCache = null;
function getStaticConfig() {
  if (staticCache) return staticCache;
  const file = locateStaticConfig();
  const local = readJsonSafe(locateLocalConfig(), {});
  staticCache = Object.assign({}, DEFAULT_STATIC, readJsonSafe(file, {}), local);
  return staticCache;
}

// --- Etat local ------------------------------------------------------------

function statePath() {
  return path.join(app.getPath('userData'), 'launcher-state.json');
}

const DEFAULT_STATE = {
  installedVersion: null,
  installDir: null,
  lastPlayed: null,
};

function getState() {
  return Object.assign({}, DEFAULT_STATE, readJsonSafe(statePath(), {}));
}

function setState(patch) {
  const next = Object.assign({}, getState(), patch);
  fs.writeFileSync(statePath(), JSON.stringify(next, null, 2), 'utf8');
  return next;
}

function defaultInstallDir() {
  return path.join(app.getPath('userData'), 'games', 'MyUniverse');
}

module.exports = {
  getStaticConfig,
  getState,
  setState,
  defaultInstallDir,
};

'use strict';

const $ = (id) => document.getElementById(id);
const api = window.launcher;

// Écrit du texte sans planter si l'élément est absent (les erreurs du renderer
// ne remontent pas dans le terminal, donc on évite qu'un id manquant bloque le boot).
function setText(id, value) {
  const el = $(id);
  if (el) el.textContent = value;
}

// --- Etat local du renderer -------------------------------------------------
const S = {
  boot: null,
  check: null, // resultat de checkGame
  mode: 'idle', // idle | install | update | play | busy | error | unconfigured
  busy: false,
  user: null,
  authMode: 'login', // login | signup
  entered: false, // le launcher a-t-il deja demarre (evite double refresh)
};

// --- Helpers UI -------------------------------------------------------------
function setStatus(text, dotClass) {
  $('status-text').textContent = text;
  $('status-dot').className = 'status-dot ' + (dotClass || '');
}

function toast(msg, isErr) {
  const t = $('toast');
  t.textContent = msg;
  t.className = 'toast' + (isErr ? ' err' : '');
  t.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => (t.hidden = true), 3800);
}

function fmtBytes(n) {
  if (!n) return '0 o';
  const u = ['o', 'Ko', 'Mo', 'Go'];
  const i = Math.floor(Math.log(n) / Math.log(1024));
  return (n / Math.pow(1024, i)).toFixed(i ? 1 : 0) + ' ' + u[i];
}

// Mini rendu markdown (titres, listes, gras, liens) pour les notes de version
function renderMarkdown(md) {
  if (!md) return '<p class="muted">Aucune note pour cette version.</p>';
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const lines = esc(md).split(/\r?\n/);
  let html = '';
  let inList = false;
  for (let line of lines) {
    if (/^\s*[-*]\s+/.test(line)) {
      if (!inList) {
        html += '<ul>';
        inList = true;
      }
      html += '<li>' + inline(line.replace(/^\s*[-*]\s+/, '')) + '</li>';
      continue;
    }
    if (inList) {
      html += '</ul>';
      inList = false;
    }
    const h = line.match(/^(#{1,3})\s+(.*)/);
    if (h) html += `<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`;
    else if (line.trim()) html += `<p>${inline(line)}</p>`;
  }
  if (inList) html += '</ul>';
  return html;
}
function inline(s) {
  return s
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="#" data-ext="$2">$1</a>');
}

// --- Bouton principal -------------------------------------------------------
function applyMode(mode, label, btnClass) {
  S.mode = mode;
  const btn = $('btn-play');
  $('play-label').textContent = label;
  btn.className = 'play-btn' + (btnClass ? ' ' + btnClass : '');
  btn.disabled = mode === 'unconfigured' || mode === 'busy';
}

// --- AUTHENTIFICATION --------------------------------------------------------
function showAuth() {
  document.body.classList.remove('authed');
  $('user-chip').hidden = true;
  $('auth-screen').hidden = false;
}

function enterApp(user) {
  S.user = user || null;
  $('auth-screen').hidden = true;
  document.body.classList.add('authed');
  if (user) {
    $('user-chip').hidden = false;
    $('user-name').textContent = user.username;
    $('user-avatar').textContent = (user.username || '?').charAt(0).toUpperCase();
  }
  if (!S.entered) {
    S.entered = true;
    refresh();
  }
}

function setAuthMode(mode) {
  S.authMode = mode;
  $('tab-login').classList.toggle('active', mode === 'login');
  $('tab-signup').classList.toggle('active', mode === 'signup');
  $('field-username').hidden = mode !== 'signup';
  $('auth-submit').textContent = mode === 'signup' ? "S'inscrire" : 'Se connecter';
  $('in-password').setAttribute(
    'autocomplete',
    mode === 'signup' ? 'new-password' : 'current-password'
  );
  clearAuthMsg();
}

function authError(msg) {
  const e = $('auth-error');
  e.textContent = msg;
  e.hidden = false;
  $('auth-note').hidden = true;
}
function authNote(msg) {
  const n = $('auth-note');
  n.textContent = msg;
  n.hidden = false;
  $('auth-error').hidden = true;
}
function clearAuthMsg() {
  $('auth-error').hidden = true;
  $('auth-note').hidden = true;
}
function setAuthBusy(b) {
  $('auth-submit').disabled = b;
  $('auth-submit').textContent = b
    ? '…'
    : S.authMode === 'signup'
      ? "S'inscrire"
      : 'Se connecter';
}

async function onAuthSubmit(e) {
  e.preventDefault();
  clearAuthMsg();
  const email = $('in-email').value.trim();
  const password = $('in-password').value;
  const username = $('in-username').value.trim();

  if (!email || !password) return authError('Renseigne ton email et ton mot de passe.');
  if (S.authMode === 'signup' && password.length < 6)
    return authError('Mot de passe : 6 caractères minimum.');

  setAuthBusy(true);
  const r =
    S.authMode === 'signup'
      ? await api.auth.signUp({ email, password, username })
      : await api.auth.signIn({ email, password });
  setAuthBusy(false);

  if (!r.ok) return authError(r.error);
  if (r.needsConfirmation) {
    authNote('Compte créé ✦ Vérifie ta boîte mail pour confirmer, puis connecte-toi.');
    setAuthMode('login');
    return;
  }
  enterApp(r.user);
}

async function onForgot() {
  const email = $('in-email').value.trim();
  if (!email) return authError('Entre ton email ci-dessus, puis reclique sur ce lien.');
  const r = await api.auth.resetPassword(email);
  if (r.ok) authNote('Email de réinitialisation envoyé (si un compte existe).');
  else authError(r.error);
}

// --- Flux principal ---------------------------------------------------------
async function boot() {
  S.boot = await api.getBootstrap();
  if (S.boot.gameName) {
    setText('hero-title', S.boot.gameName);
    setText('auth-title', S.boot.gameName);
  }
  if (S.boot.gameTagline) setText('tagline', S.boot.gameTagline);
  setText('version-line', 'Launcher v' + S.boot.launcherVersion);
  setText('launcher-version-2', 'v' + S.boot.launcherVersion);
  setText('install-dir', S.boot.local.installDir);
  setText('installed-version', S.boot.local.installedVersion || 'Non installé');

  // Pas de login requis -> on entre directement
  if (!S.boot.requireLogin) return enterApp(null);

  // Login requis mais Supabase pas configuré -> on bloque avec un message
  if (!S.boot.authConfigured) {
    showAuth();
    $('auth-config-warn').hidden = false;
    $('auth-submit').disabled = true;
    return;
  }

  // Session existante ?
  const res = await api.auth.current();
  if (res.user) enterApp(res.user);
  else showAuth();
}

async function refresh() {
  setStatus('Vérification des mises à jour…', 'busy');
  applyMode('busy', 'Vérification…');

  const res = await api.checkGame();
  if (!res.ok) {
    setStatus('Erreur réseau', 'err');
    applyMode('error', 'Réessayer');
    $('news-body').innerHTML = `<p class="muted">Impossible de contacter GitHub.<br>${res.error}</p>`;
    return;
  }

  const c = res.data;
  S.check = c;

  if (!c.configured) {
    setStatus('Repo du jeu non configuré', 'warn');
    applyMode('unconfigured', 'Config requise');
    $('news-body').innerHTML =
      '<p class="muted">Renseigne <code>gameRepo</code> dans <b>launcher.config.json</b> pour activer les mises à jour.</p>';
    return;
  }

  // News
  $('news-version').textContent = c.latestVersion || '—';
  $('news-body').innerHTML = renderMarkdown(c.releaseNotes);

  // Etat du bouton
  if (!c.installed) {
    setStatus('Prêt à installer', 'warn');
    $('version-line').textContent =
      `Launcher v${S.boot.launcherVersion} · Jeu ${c.latestVersion || '?'}`;
    applyMode('install', 'Installer');
  } else if (c.needsUpdate) {
    setStatus(`Mise à jour disponible → ${c.latestVersion}`, 'warn');
    $('version-line').textContent = `Jeu ${c.currentVersion} → ${c.latestVersion}`;
    applyMode('update', 'Mettre à jour', 'update');
  } else {
    setStatus('Jeu à jour', 'ok');
    $('version-line').textContent =
      `Launcher v${S.boot.launcherVersion} · Jeu ${c.currentVersion}`;
    applyMode('play', 'Jouer');
  }
}

// --- Actions ----------------------------------------------------------------
async function onPlayClick() {
  if (S.busy) return;

  if (S.mode === 'play') {
    const r = await api.playGame();
    if (r.ok) toast('Lancement de My Universe…');
    else toast(r.error || 'Échec du lancement', true);
    return;
  }

  if (S.mode === 'error') {
    return refresh();
  }

  if (S.mode === 'install' || S.mode === 'update') {
    return runInstall();
  }
}

async function runInstall() {
  S.busy = true;
  applyMode('busy', S.mode === 'update' ? 'Mise à jour…' : 'Installation…');
  $('progress-wrap').hidden = false;
  setStatus(S.mode === 'update' ? 'Mise à jour en cours' : 'Installation en cours', 'busy');

  const r = await api.installGame();

  S.busy = false;
  $('progress-wrap').hidden = true;

  if (r.ok) {
    toast('Installation terminée ✦');
    $('installed-version').textContent = r.data.installedVersion;
    await refresh();
  } else {
    toast(r.error || 'Échec', true);
    setStatus('Échec de l’installation', 'err');
    applyMode('error', 'Réessayer');
  }
}

function onProgress(p) {
  const wrap = $('progress-wrap');
  if (wrap.hidden) wrap.hidden = false;

  const phases = {
    download: 'Téléchargement',
    cleanup: 'Préparation',
    extract: 'Extraction',
    done: 'Terminé',
    error: 'Erreur',
  };
  $('progress-phase').textContent = phases[p.phase] || p.phase;

  const pct = Math.round((p.percent || 0) * 100);
  $('progress-fill').style.width = pct + '%';

  let detail = pct + '%';
  if (p.phase === 'download' && p.total) {
    detail = `${fmtBytes(p.transferred)} / ${fmtBytes(p.total)}`;
    if (p.bytesPerSec) detail += ` · ${fmtBytes(p.bytesPerSec)}/s`;
  }
  $('progress-detail').textContent = detail;
}

// --- Launcher self-update ---------------------------------------------------
function onLauncherUpdate(u) {
  const banner = $('launcher-banner');
  const stateEl = $('launcher-update-state');
  switch (u.state) {
    case 'available':
      stateEl.textContent = `Téléchargement v${u.version}…`;
      break;
    case 'downloading':
      stateEl.textContent = `Mise à jour ${Math.round((u.percent || 0) * 100)}%`;
      break;
    case 'ready':
      stateEl.textContent = `v${u.version} prête`;
      $('launcher-banner-text').textContent = `Launcher v${u.version} prêt à installer.`;
      banner.hidden = false;
      break;
    case 'none':
      stateEl.textContent = 'À jour';
      break;
    case 'error':
      stateEl.textContent = 'Erreur MAJ';
      break;
  }
}

// --- Modale paramètres ------------------------------------------------------
function openSettings() {
  $('settings-overlay').hidden = false;
}
function closeSettings() {
  $('settings-overlay').hidden = true;
}

// --- Wiring -----------------------------------------------------------------
window.addEventListener('DOMContentLoaded', () => {
  // Embers
  const box = $('embers');
  for (let i = 0; i < 18; i++) {
    const e = document.createElement('div');
    e.className = 'ember';
    e.style.left = Math.random() * 100 + '%';
    e.style.animationDuration = 7 + Math.random() * 9 + 's';
    e.style.animationDelay = -Math.random() * 12 + 's';
    e.style.opacity = 0.4 + Math.random() * 0.5;
    box.appendChild(e);
  }

  $('btn-play').addEventListener('click', onPlayClick);
  $('btn-settings').addEventListener('click', openSettings);
  $('settings-close').addEventListener('click', closeSettings);
  $('settings-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'settings-overlay') closeSettings();
  });

  $('btn-min').addEventListener('click', () => api.minimize());
  $('btn-close').addEventListener('click', () => api.close());

  $('btn-choose-dir').addEventListener('click', async () => {
    const r = await api.chooseInstallDir();
    if (r.ok) {
      $('install-dir').textContent = r.dir;
      toast('Dossier mis à jour');
      refresh();
    }
  });
  $('btn-open-folder').addEventListener('click', () => api.openInstallFolder());
  $('btn-uninstall').addEventListener('click', async () => {
    const r = await api.uninstallGame();
    if (r.ok) {
      $('installed-version').textContent = 'Non installé';
      toast('Jeu désinstallé');
      refresh();
    }
  });

  $('launcher-restart').addEventListener('click', () => api.quitAndInstallLauncher());

  // --- Auth
  $('tab-login').addEventListener('click', () => setAuthMode('login'));
  $('tab-signup').addEventListener('click', () => setAuthMode('signup'));
  $('auth-form').addEventListener('submit', onAuthSubmit);
  $('auth-forgot').addEventListener('click', onForgot);
  $('btn-logout').addEventListener('click', async () => {
    await api.auth.signOut();
    S.entered = false;
    S.check = null;
    showAuth();
  });
  api.auth.onChange((user) => {
    if (user) enterApp(user);
    else {
      S.entered = false;
      showAuth();
    }
  });

  // Liens externes dans les news
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-ext]');
    if (a) {
      e.preventDefault();
      api.openExternal(a.getAttribute('data-ext'));
    }
  });

  api.onGameProgress(onProgress);
  api.onLauncherUpdate(onLauncherUpdate);

  boot().catch((err) => {
    setStatus('Erreur de démarrage', 'err');
    toast(String(err.message || err), true);
  });
});

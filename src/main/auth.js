'use strict';

const fs = require('fs');
const path = require('path');
const { app } = require('electron');
const { createClient } = require('@supabase/supabase-js');
// Electron (Node 20) n'a pas de WebSocket natif : supabase-js initialise toujours
// le client realtime et planterait. On fournit une implémentation via `ws`.
const WS = require('ws');

const { getStaticConfig } = require('./config');

/**
 * Authentification des joueurs via Supabase Auth, executee dans le PROCESS PRINCIPAL.
 * La session est persistee sur disque (userData/auth-session.json) et rafraichie
 * automatiquement. Le renderer n'accede jamais directement a Supabase : tout passe
 * par IPC (voir main.js / preload.js).
 */

let client = null;
let listeners = [];

// --- Storage persistant (interface attendue par supabase-js) ----------------
function sessionFile() {
  return path.join(app.getPath('userData'), 'auth-session.json');
}
const fileStorage = {
  getItem(key) {
    try {
      const data = JSON.parse(fs.readFileSync(sessionFile(), 'utf8'));
      return key in data ? data[key] : null;
    } catch (_) {
      return null;
    }
  },
  setItem(key, value) {
    let data = {};
    try {
      data = JSON.parse(fs.readFileSync(sessionFile(), 'utf8'));
    } catch (_) {}
    data[key] = value;
    fs.writeFileSync(sessionFile(), JSON.stringify(data), 'utf8');
  },
  removeItem(key) {
    try {
      const data = JSON.parse(fs.readFileSync(sessionFile(), 'utf8'));
      delete data[key];
      fs.writeFileSync(sessionFile(), JSON.stringify(data), 'utf8');
    } catch (_) {}
  },
};

function isConfigured() {
  const s = getStaticConfig().supabase || {};
  return !!(s.url && s.anonKey && !s.anonKey.startsWith('COLLE_'));
}

function getClient() {
  if (client) return client;
  if (!isConfigured()) return null;
  const s = getStaticConfig().supabase;
  client = createClient(s.url, s.anonKey, {
    auth: {
      storage: fileStorage,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
      flowType: 'pkce',
    },
    realtime: { transport: WS },
  });
  client.auth.onAuthStateChange((_event, session) => {
    const u = session ? shapeUser(session.user) : null;
    listeners.forEach((cb) => cb(u));
  });
  return client;
}

function shapeUser(user) {
  if (!user) return null;
  const meta = user.user_metadata || {};
  return {
    id: user.id,
    email: user.email,
    username: meta.username || (user.email ? user.email.split('@')[0] : 'Joueur'),
    avatarUrl: meta.avatar_url || null,
    createdAt: user.created_at,
  };
}

// --- API ---------------------------------------------------------------------

async function signUp({ email, password, username }) {
  const c = getClient();
  if (!c) return { ok: false, error: 'Supabase non configuré (launcher.config.json).' };

  const { data, error } = await c.auth.signUp({
    email,
    password,
    options: { data: { username: (username || '').trim() || email.split('@')[0] } },
  });
  if (error) return { ok: false, error: translate(error.message) };

  // Si la confirmation d'email est ACTIVE, session est null tant que non confirme.
  if (!data.session) {
    return { ok: true, needsConfirmation: true, user: shapeUser(data.user) };
  }
  return { ok: true, user: shapeUser(data.user) };
}

async function signIn({ email, password }) {
  const c = getClient();
  if (!c) return { ok: false, error: 'Supabase non configuré (launcher.config.json).' };

  const { data, error } = await c.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, error: translate(error.message) };
  return { ok: true, user: shapeUser(data.user) };
}

async function signOut() {
  const c = getClient();
  if (c) await c.auth.signOut();
  return { ok: true };
}

async function getCurrentUser() {
  const c = getClient();
  if (!c) return { configured: false, user: null };
  const { data } = await c.auth.getSession();
  return { configured: true, user: data.session ? shapeUser(data.session.user) : null };
}

async function updateUsername(username) {
  const c = getClient();
  if (!c) return { ok: false, error: 'Supabase non configuré.' };
  const { data, error } = await c.auth.updateUser({ data: { username: username.trim() } });
  if (error) return { ok: false, error: translate(error.message) };
  // Met aussi a jour la table profiles si presente
  try {
    await c.from('profiles').update({ username: username.trim() }).eq('id', data.user.id);
  } catch (_) {}
  return { ok: true, user: shapeUser(data.user) };
}

async function resetPassword(email) {
  const c = getClient();
  if (!c) return { ok: false, error: 'Supabase non configuré.' };
  const { error } = await c.auth.resetPasswordForEmail(email);
  if (error) return { ok: false, error: translate(error.message) };
  return { ok: true };
}

function onAuthChange(cb) {
  listeners.push(cb);
  return () => {
    listeners = listeners.filter((l) => l !== cb);
  };
}

/**
 * Appelle une Edge Function Supabase avec la session du joueur (JWT) attachée.
 * Renvoie { ok, data } ou { ok:false, error }.
 */
async function invokeFunction(name, body) {
  const c = getClient();
  if (!c) return { ok: false, error: 'Supabase non configuré.' };
  const { data, error } = await c.functions.invoke(name, { body: body || {} });
  if (error) {
    let detail = error.message || 'Erreur Edge Function';
    try {
      const b = await error.context.json();
      if (b && b.error) detail = b.error;
    } catch (_) {}
    return { ok: false, error: detail };
  }
  return { ok: true, data };
}

const GAME_ID = 'my-universe-alpha';

/** Le joueur possède-t-il le jeu (dans sa bibliothèque) ? */
async function ownsGame() {
  const c = getClient();
  if (!c) return { ok: false, error: 'Supabase non configuré.' };
  const { data, error } = await c
    .from('library')
    .select('game')
    .eq('game', GAME_ID)
    .maybeSingle();
  if (error) return { ok: false, error: error.message };
  return { ok: true, owned: !!data };
}

/** Ajoute le jeu (Alpha gratuite) à la bibliothèque du joueur. */
async function addToLibrary() {
  const c = getClient();
  if (!c) return { ok: false, error: 'Supabase non configuré.' };
  const { error } = await c.from('library').insert({ game: GAME_ID });
  if (error && !/duplicate key/i.test(error.message)) {
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

// Traduction FR des messages Supabase les plus courants
function translate(msg) {
  const m = String(msg || '').toLowerCase();
  if (m.includes('invalid login')) return 'Email ou mot de passe incorrect.';
  if (m.includes('already registered') || m.includes('already been registered'))
    return 'Un compte existe déjà avec cet email.';
  if (m.includes('password should be at least'))
    return 'Le mot de passe doit faire au moins 6 caractères.';
  if (m.includes('unable to validate email') || m.includes('invalid email'))
    return 'Adresse email invalide.';
  if (m.includes('email not confirmed'))
    return 'Email non confirmé. Vérifie ta boîte mail.';
  if (m.includes('rate limit') || m.includes('too many'))
    return 'Trop de tentatives, réessaie dans un instant.';
  return msg;
}

module.exports = {
  isConfigured,
  signUp,
  signIn,
  signOut,
  getCurrentUser,
  updateUsername,
  resetPassword,
  onAuthChange,
  invokeFunction,
  ownsGame,
  addToLibrary,
};

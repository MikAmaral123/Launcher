'use strict';

const fs = require('fs');
const https = require('https');
const { URL } = require('url');

const UA = 'BasaltLauncher';

/**
 * GET JSON depuis l'API GitHub (avec token optionnel).
 */
function getJson(url, token) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const headers = {
      'User-Agent': UA,
      Accept: 'application/vnd.github+json',
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    https
      .get(u, { headers }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.resume();
          return resolve(getJson(res.headers.location, token));
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`GitHub API ${res.statusCode} sur ${url}`));
        }
        let body = '';
        res.setEncoding('utf8');
        res.on('data', (c) => (body += c));
        res.on('end', () => {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on('error', reject);
  });
}

/**
 * Telecharge une URL vers un fichier, en suivant les redirections (GitHub -> S3).
 * onProgress({ transferred, total, percent, bytesPerSec }).
 */
function downloadToFile(url, destPath, token, onProgress, redirectsLeft = 6) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const headers = { 'User-Agent': UA, Accept: 'application/octet-stream' };
    // On n'envoie le token qu'a GitHub, jamais au CDN de redirection (securite).
    if (token && /github\.com$/i.test(u.hostname)) {
      headers.Authorization = `Bearer ${token}`;
    }

    const req = https.get(u, { headers }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        if (redirectsLeft <= 0) return reject(new Error('Trop de redirections'));
        return resolve(
          downloadToFile(res.headers.location, destPath, token, onProgress, redirectsLeft - 1)
        );
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`Telechargement HTTP ${res.statusCode}`));
      }

      const total = parseInt(res.headers['content-length'] || '0', 10);
      let transferred = 0;
      let lastTick = Date.now();
      let lastBytes = 0;

      const out = fs.createWriteStream(destPath);
      res.on('data', (chunk) => {
        transferred += chunk.length;
        const now = Date.now();
        if (onProgress && now - lastTick >= 200) {
          const dt = (now - lastTick) / 1000;
          const bytesPerSec = dt > 0 ? (transferred - lastBytes) / dt : 0;
          lastTick = now;
          lastBytes = transferred;
          onProgress({
            transferred,
            total,
            percent: total ? transferred / total : 0,
            bytesPerSec,
          });
        }
      });
      res.pipe(out);
      out.on('finish', () => {
        out.close(() => {
          if (onProgress) {
            onProgress({ transferred, total: total || transferred, percent: 1, bytesPerSec: 0 });
          }
          resolve(destPath);
        });
      });
      out.on('error', reject);
    });
    req.on('error', reject);
  });
}

module.exports = { getJson, downloadToFile };

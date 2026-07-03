'use strict';

/**
 * Genere build/icon.ico + build/icon.png SANS dependance native.
 * L'icone est dessinee proceduralement (supersampling) : tuile basalte
 * sombre + orbe doree "univers" + anneau orbital. PNG encode via zlib,
 * puis embarque dans un conteneur ICO multi-tailles.
 */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// ---------- CRC32 (pour les chunks PNG) ----------
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

// ---------- Encodeur PNG (RGBA 8 bits) ----------
function pngChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}
function encodePNG(w, h, rgba) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  const stride = w * 4 + 1;
  const raw = Buffer.alloc(stride * h);
  for (let y = 0; y < h; y++) {
    raw[y * stride] = 0; // filter none
    rgba.copy(raw, y * stride + 1, y * w * 4, (y + 1) * w * 4);
  }
  const idat = zlib.deflateSync(raw, { level: 9 });
  return Buffer.concat([
    sig,
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', idat),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

// ---------- Conteneur ICO ----------
function encodeICO(images) {
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);
  let offset = 6 + count * 16;
  const entries = [];
  const datas = [];
  for (const im of images) {
    const e = Buffer.alloc(16);
    e[0] = im.size >= 256 ? 0 : im.size;
    e[1] = im.size >= 256 ? 0 : im.size;
    e.writeUInt16LE(1, 4); // planes
    e.writeUInt16LE(32, 6); // bpp
    e.writeUInt32LE(im.png.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += im.png.length;
    entries.push(e);
    datas.push(im.png);
  }
  return Buffer.concat([header, ...entries, ...datas]);
}

// ---------- Maths de dessin ----------
const clamp = (x, a, b) => (x < a ? a : x > b ? b : x);
const mix = (a, b, t) => a + (b - a) * t;
const mixc = (c1, c2, t) => [mix(c1[0], c2[0], t), mix(c1[1], c2[1], t), mix(c1[2], c2[2], t)];
function over(dst, src, a) {
  const da = dst[3];
  const outA = a + da * (1 - a);
  if (outA <= 0) return [0, 0, 0, 0];
  return [
    (src[0] * a + dst[0] * da * (1 - a)) / outA,
    (src[1] * a + dst[1] * da * (1 - a)) / outA,
    (src[2] * a + dst[2] * da * (1 - a)) / outA,
    outA,
  ];
}
function sdRoundRect(px, py, hx, hy, r) {
  const qx = Math.abs(px) - (hx - r);
  const qy = Math.abs(py) - (hy - r);
  return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r;
}
function sdHex(px, py, r) {
  const kx = -0.866025404, ky = 0.5, kz = 0.577350269;
  let x = Math.abs(px), y = Math.abs(py);
  const d = 2 * Math.min(kx * x + ky * y, 0);
  x -= d * kx;
  y -= d * ky;
  x -= clamp(x, -kz * r, kz * r);
  y -= r;
  return Math.hypot(x, y) * Math.sign(y);
}

// Couleur (premultipliee) en un point normalise (u,v) dans [0,1].
function shade(u, v) {
  const px = u - 0.5;
  const py = v - 0.5;
  let col = [0, 0, 0, 0];

  const bg = sdRoundRect(px, py, 0.5, 0.5, 0.17);
  if (bg >= 0) return col; // hors tuile => transparent

  // Fond dégradé basalte
  col = over(col, mixc([0.082, 0.09, 0.14], [0.03, 0.035, 0.065], clamp(v, 0, 1)), 1);
  col = over(col, [1, 0.95, 0.85], clamp(1 - v * 1.5, 0, 1) * 0.05);

  // Hexagone basalte (contour)
  const hex = Math.abs(sdHex(px, py, 0.35)) - 0.007;
  if (hex < 0) col = over(col, [0.91, 0.69, 0.3], 0.2);

  // Anneau orbital (ellipse inclinee)
  const ang = -0.42;
  const cx = px * Math.cos(ang) - py * Math.sin(ang);
  const cy = px * Math.sin(ang) + py * Math.cos(ang);
  const rx = 0.4, ry = 0.145;
  const f = (cx * cx) / (rx * rx) + (cy * cy) / (ry * ry);
  const ringD = Math.abs(f - 1);
  if (ringD < 0.16) col = over(col, [0.96, 0.81, 0.44], clamp(1 - ringD / 0.16, 0, 1) * 0.8);

  // Halo de l'orbe
  const d = Math.hypot(px, py);
  const orbR = 0.2;
  if (d > orbR) {
    const g = clamp(1 - (d - orbR) / 0.24, 0, 1);
    col = over(col, [1, 0.6, 0.25], g * g * 0.5);
  }

  // Corps de l'orbe
  if (d < orbR) {
    const t = clamp(d / orbR, 0, 1);
    col = over(col, mixc([1, 0.93, 0.74], [0.9, 0.53, 0.22], Math.pow(t, 0.8)), 1);
    const hl = clamp(1 - Math.hypot(px + 0.06, py + 0.07) / 0.13, 0, 1);
    col = over(col, [1, 1, 0.96], hl * 0.5);
  }

  // Lune sur l'anneau
  const mAng = 2.35;
  const lx = rx * Math.cos(mAng), ly = ry * Math.sin(mAng);
  const mwx = lx * Math.cos(ang) + ly * Math.sin(ang);
  const mwy = -lx * Math.sin(ang) + ly * Math.cos(ang);
  if (Math.hypot(px - mwx, py - mwy) < 0.032) col = over(col, [1, 0.87, 0.56], 1);

  return [col[0] * col[3], col[1] * col[3], col[2] * col[3], col[3]]; // premultiplie
}

function render(size) {
  const SS = 4; // supersampling
  const rgba = Buffer.alloc(size * size * 4);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let r = 0, g = 0, b = 0, a = 0;
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          const u = (x + (sx + 0.5) / SS) / size;
          const v = (y + (sy + 0.5) / SS) / size;
          const c = shade(u, v);
          r += c[0];
          g += c[1];
          b += c[2];
          a += c[3];
        }
      }
      const n = SS * SS;
      const al = a / n;
      const i = (y * size + x) * 4;
      // de-premultiplie
      rgba[i] = al > 0 ? clamp(Math.round((r / n / al) * 255), 0, 255) : 0;
      rgba[i + 1] = al > 0 ? clamp(Math.round((g / n / al) * 255), 0, 255) : 0;
      rgba[i + 2] = al > 0 ? clamp(Math.round((b / n / al) * 255), 0, 255) : 0;
      rgba[i + 3] = clamp(Math.round(al * 255), 0, 255);
    }
  }
  return encodePNG(size, size, rgba);
}

// ---------- Main ----------
const outDir = path.join(__dirname, '..', 'build');
fs.mkdirSync(outDir, { recursive: true });

const sizes = [16, 24, 32, 48, 64, 128, 256];
const images = sizes.map((size) => ({ size, png: render(size) }));

fs.writeFileSync(path.join(outDir, 'icon.png'), images[images.length - 1].png);
fs.writeFileSync(path.join(outDir, 'icon.ico'), encodeICO(images));

console.log('✔ build/icon.ico + build/icon.png générés (' + sizes.join(', ') + ')');

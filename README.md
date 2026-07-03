# Basalt Launcher — My Universe

Launcher Windows officiel du jeu **My Universe** (studio **Basalt Game**).
God-sim / stylized fantasy. Construit en **Electron**, avec :

- 🎨 Direction artistique *basalte volcanique / or / énergie divine*
- 🔐 **Comptes joueurs** (inscription / connexion / session persistante) via **Supabase**
- ⬇️ **Installation & mise à jour du jeu** depuis GitHub Releases (téléchargement + extraction + lancement)
- 🔄 **Auto-update du launcher lui-même** (electron-updater)
- 📰 Notes de version affichées automatiquement depuis la dernière release
- 📦 Génère un vrai installeur `.exe` (NSIS)

> **Comptes joueurs** : voir le guide dédié **[docs/SETUP-COMPTES.md](docs/SETUP-COMPTES.md)**
> (coller la clé `anon`, lancer le SQL, désactiver la confirmation d'email).

---

## 1. Démarrer en développement

```bash
npm install
npm start
```

Au premier lancement, tant que les repos GitHub ne sont pas configurés, le launcher
affiche « Repo du jeu non configuré » — c'est normal.

## 2. Configurer (⚠️ à faire une fois)

Ouvre **`launcher.config.json`** et remplace `REMPLACE_MOI_OWNER` par ton compte/organisation GitHub :

```jsonc
{
  "launcherRepo": { "owner": "TonCompte", "repo": "my-universe-launcher" },
  "gameRepo":     { "owner": "TonCompte", "repo": "my-universe" },
  "gameExecutable": "My Universe.exe",   // nom de l'exe Unity dans le zip
  "assetMatch": "windows.*\\.zip$|\\.zip$",
  "githubToken": ""                       // vide = repo public
}
```

Mets aussi le même `owner`/`repo` du launcher dans **`package.json`** → `build.publish`.

👉 Guide complet pas-à-pas : **[docs/SETUP-GITHUB.md](docs/SETUP-GITHUB.md)**

## 3. Construire l'installeur `.exe`

```bash
npm run dist
```

L'installeur est généré dans **`release/`** :
`Basalt Launcher-Setup-1.0.0.exe`

> `npm run pack` fait un build non-empaqueté (dossier `release/win-unpacked/`) pour tester vite.

## 4. Publier une mise à jour du launcher

```bash
# bump la version dans package.json (ex 1.0.1), commit, puis :
git tag v1.0.1
git push origin v1.0.1
```

Le workflow **[.github/workflows/release-launcher.yml](.github/workflows/release-launcher.yml)**
construit et publie automatiquement la release. Les launchers déjà installés se mettront à jour seuls.

## 5. Publier une version du JEU

Après avoir buildé My Universe dans Unity (build Windows) :

```powershell
./scripts/publish-game-release.ps1 -BuildDir "D:\Builds\MyUniverse" -Version 0.1.0 -Repo TonCompte/my-universe
```

Le launcher détectera la nouvelle release et proposera **Installer** / **Mettre à jour**.

---

## Architecture

```
launcher.config.json         Config statique (repos, nom du jeu, exe)
package.json                 Deps + config electron-builder / publish
build/icon.ico|png           Icône générée procéduralement (scripts/generate-icon.js)
src/main/
  main.js                    Process principal, fenêtre, IPC
  preload.js                 Pont sécurisé renderer <-> main (contextBridge)
  config.js                  Config statique + état local (version installée…)
  download.js                API GitHub + téléchargement avec progression/redirections
  gameManager.js             check / download / extract / launch du jeu
  launcherUpdater.js         Auto-update du launcher (electron-updater)
src/renderer/
  index.html                 Structure UI (fenêtre custom, hero, news, action bar)
  styles.css                 Toute la DA
  renderer.js                Logique UI + états du bouton (Installer/MAJ/Jouer)
scripts/
  generate-icon.js           Génère l'icône .ico (pur JS, zéro dépendance native)
  publish-game-release.ps1   Zippe un build Unity et crée la release du jeu
.github/workflows/
  release-launcher.yml       CI: build + publish du launcher sur tag v*
```

## Comment fonctionne l'auto-update

- **Launcher** : `electron-updater` lit `latest.yml` publié à chaque release GitHub du repo
  `launcherRepo`. En prod, l'app vérifie au démarrage, télécharge en tâche de fond et propose de
  redémarrer.
- **Jeu** : `gameManager` interroge `…/releases/latest` du repo `gameRepo`, compare le `tag_name`
  à la version installée localement (`launcher-state.json`), télécharge l'asset `.zip`, l'extrait
  dans le dossier d'installation, puis lance `gameExecutable`.

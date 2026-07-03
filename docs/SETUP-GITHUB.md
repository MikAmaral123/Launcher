# Guide GitHub — de zéro à un launcher qui se met à jour

Ce guide crée **deux repos** et branche l'auto-update. Suis-le dans l'ordre.

> Remplace partout `TonCompte` par ton pseudo/organisation GitHub.

---

## Étape 0 — Outils

- **Git** : déjà installé ✅
- **GitHub CLI** (facilite tout) : `winget install GitHub.cli` puis `gh auth login`
  (choisis *GitHub.com* → *HTTPS* → *Login with a web browser*).

---

## Étape 1 — Créer les deux repos

| Repo | Rôle | Public/Privé |
|------|------|--------------|
| `my-universe-launcher` | Code du launcher + releases de l'app | **Public** conseillé (auto-update sans token) |
| `my-universe` | Releases du **jeu** uniquement | Public conseillé (voir la note privé plus bas) |

Avec gh, depuis le dossier du launcher :

```powershell
# Repo du LAUNCHER (on y pousse ce projet)
git init
git add .
git commit -m "Basalt Launcher v1.0.0"
gh repo create TonCompte/my-universe-launcher --public --source=. --remote=origin --push

# Repo du JEU (vide, servira juste aux releases)
gh repo create TonCompte/my-universe --public
```

---

## Étape 2 — Renseigner la config

1. **`launcher.config.json`** → mets ton `owner` dans `launcherRepo` **et** `gameRepo`.
2. **`package.json`** → section `build.publish` → `owner: "TonCompte"`.

Commit :

```powershell
git add launcher.config.json package.json
git commit -m "config: repos GitHub"
git push
```

---

## Étape 3 — Première release du LAUNCHER

Le tag déclenche le workflow CI qui build l'installeur et le publie.

```powershell
git tag v1.0.0
git push origin v1.0.0
```

Va dans l'onglet **Actions** du repo `my-universe-launcher` : le job *Release Launcher* tourne
(~3-5 min) puis crée une **Release v1.0.0** avec :
- `Basalt Launcher-Setup-1.0.0.exe` (l'installeur à distribuer aux joueurs)
- `latest.yml` (lu par l'auto-update)

> **C'est cet `.exe` que tes joueurs téléchargent et installent.** Ensuite il se met à jour seul.

### Publier une future version du launcher
Change `"version"` dans `package.json` (ex `1.0.1`), commit, puis :
```powershell
git tag v1.0.1 ; git push origin v1.0.1
```

---

## Étape 4 — Première release du JEU

1. Dans Unity : **File → Build Settings → Windows → Build**. Choisis un dossier, ex `D:\Builds\MyUniverse`.
   Vérifie que le dossier contient bien `My Universe.exe` (+ `My Universe_Data`, `UnityPlayer.dll`…).
   > Le nom de l'exe doit correspondre à `gameExecutable` dans `launcher.config.json`.
2. Publie :
```powershell
./scripts/publish-game-release.ps1 -BuildDir "D:\Builds\MyUniverse" -Version 0.1.0 -Repo TonCompte/my-universe
```
3. Lance le launcher → il affiche la version, les notes, et le bouton **Installer**.

### Publier une future version du jeu
Rebuild dans Unity, puis relance le script avec un nouveau `-Version` (ex `0.2.0`).
Le launcher passera le bouton en **Mettre à jour**.

---

## Cas d'un repo de JEU PRIVÉ

Si tu ne veux pas exposer les builds :

1. Crée le repo `my-universe` en **privé**.
2. Génère un **fine-grained token** GitHub :
   *Settings → Developer settings → Fine-grained tokens → Generate*
   - *Resource owner* : ton compte
   - *Repository access* : seulement `my-universe`
   - *Permissions* → **Contents : Read-only**
3. Colle-le dans `launcher.config.json` → `"githubToken": "github_pat_…"`.

> ⚠️ Ce token sera présent dans l'app distribuée : quiconque a le launcher peut lire le repo du jeu.
> Pour un vrai contrôle d'accès (par joueur), il faut un backend qui délivre des liens signés — on
> pourra l'ajouter plus tard. Pour un accès simple « pas indexé publiquement », le token suffit.

---

## Limite des 2 Go

GitHub Releases limite **chaque fichier** à 2 Go (le nombre de releases/leur poids total est illimité).
Si le zip de My Universe dépasse 2 Go, il faudra le découper (archive multi-parties) — dis-le moi et
j'ajoute le support du multi-parties dans `gameManager.js` + le script de publication.

---

## Récap du flux quotidien

```
Nouvelle version du JEU     ->  Unity Build  ->  publish-game-release.ps1  ->  joueurs cliquent "Mettre à jour"
Nouvelle version du LAUNCHER->  bump package.json  ->  git tag vX.Y.Z  ->  auto-update silencieux
```

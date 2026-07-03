# Téléchargement sécurisé du jeu (Edge Function Supabase)

Objectif : distribuer un jeu hébergé sur un repo **privé**, sans jamais mettre le token
GitHub dans le launcher. Le token reste **côté serveur** (secret Supabase). Seuls les
**joueurs connectés** obtiennent une **URL de téléchargement signée temporaire**.

```
Launcher (joueur connecté)
   │  invoke('download-game')  + JWT de session
   ▼
Edge Function download-game (Supabase)
   │  1. vérifie le joueur (getUser)
   │  2. lit la dernière release du repo privé  (token GitHub côté serveur)
   │  3. récupère l'URL signée GitHub (302, expire en ~minutes)
   ▼
Launcher télécharge directement depuis l'URL signée (sans token)
```

Le launcher est déjà configuré pour ce mode : `"downloadMode": "supabase"` dans
`launcher.config.json`. **Aucun token dans l'app.**

---

## Étape 1 — Token GitHub (lecture seule, repo du jeu)

1. https://github.com/settings/tokens?type=beta → **Generate new token**
2. **Resource owner** : `MikAmaral123`
3. **Repository access** → *Only select repositories* → **`MyUniverse-Release`**
4. **Permissions** → *Repository permissions* → **Contents : Read-only**
5. Génère et copie le token (`github_pat_…`). **Il n'ira QUE dans Supabase, jamais dans le launcher.**

## Étape 2 — Déployer l'Edge Function

Le code est dans [`supabase/functions/download-game/index.ts`](../supabase/functions/download-game/index.ts).

### Option A — Supabase CLI (recommandé)
```bash
npm install -g supabase           # ou scoop install supabase
supabase login                    # ouvre le navigateur
cd "C:\Users\micka\Desktop\DevProjects\Basalt Game"
supabase functions deploy download-game --project-ref pbuxpxwxaoqypqgsizei
```

### Option B — Dashboard (sans CLI)
Dashboard Supabase (compte Basalt Game) → **Edge Functions** → **Deploy a new function** →
nom **`download-game`** → colle le contenu de `index.ts` → **Deploy**.

## Étape 3 — Définir les secrets côté serveur

### CLI
```bash
supabase secrets set GH_GAME_TOKEN=github_pat_xxx GAME_REPO=MikAmaral123/MyUniverse-Release --project-ref pbuxpxwxaoqypqgsizei
```
### Dashboard
**Edge Functions → (ta fonction) → Secrets** (ou **Project Settings → Edge Functions → Secrets**) :
- `GH_GAME_TOKEN` = `github_pat_…`
- `GAME_REPO` = `MikAmaral123/MyUniverse-Release`  *(optionnel, c'est le défaut)*

## Étape 4 — Publier le jeu (repo privé)

Le zip est prêt : `C:\Users\micka\Desktop\MyUniverse-Windows-0.1.0.zip`.
Sur https://github.com/MikAmaral123/MyUniverse-Release/releases → **Create a new release** →
tag **`v0.1.0`** → glisse le zip → **Publish**.

## Étape 5 — Tester

```bash
npm start
```
Connecte-toi → **Installer** → le launcher appelle l'Edge Function (avec ta session),
reçoit l'URL signée, télécharge, extrait, lance `My Universe.exe`.

Test négatif utile : si tu te déconnectes et forces un appel, la fonction renvoie **401**
(« Tu dois être connecté »). Personne d'anonyme ne peut télécharger.

---

## Notes

- **Rien à changer dans le launcher** : tout passe par la session Supabase existante.
- **Nouvelle version du jeu** : publie une nouvelle release (tag `v0.2.0`…) sur `MyUniverse-Release`.
  Le launcher détectera la mise à jour automatiquement.
- **Repli** : pour repasser en mode direct GitHub (repo public), mets `"downloadMode": "github"`.
- **Sécurité** : le token GitHub n'est que dans les secrets Supabase. L'URL signée renvoyée au
  joueur expire en quelques minutes et ne donne accès qu'à ce fichier.

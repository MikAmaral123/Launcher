# Système de comptes joueurs (Supabase)

Le launcher intègre un vrai système de comptes : **inscription, connexion, session
persistante, déconnexion, mot de passe oublié**. Tant que le joueur n'est pas connecté,
le launcher reste verrouillé sur l'écran de login.

- Le client Supabase tourne dans le **process principal** (sécurité : la clé et la session
  ne sont pas exposées à la page). Le renderer passe par IPC.
- La session est stockée dans `%APPDATA%/Basalt Launcher/auth-session.json` et
  **rafraîchie automatiquement** (le joueur reste connecté entre deux lancements).

Projet Supabase ciblé : **`pbuxpxwxaoqypqgsizei`**
(`https://pbuxpxwxaoqypqgsizei.supabase.co`).

---

## Ce que TU dois faire (3 étapes, ~5 min)

### 1. Coller la clé publique `anon`
Dashboard Supabase → **Project Settings → API** → copie la clé **`anon` / `publishable`**
(elle commence par `eyJ...` ou `sb_publishable_...`).
Colle-la dans **`launcher.config.json`** :

```jsonc
"supabase": {
  "url": "https://pbuxpxwxaoqypqgsizei.supabase.co",
  "anonKey": "COLLE_ICI"
}
```
> Cette clé est **publique par design** : sans danger dans l'app distribuée, la RLS protège les données.

### 2. Créer la table des profils
Dashboard → **SQL Editor → New query** → colle tout le contenu de
[`docs/supabase-schema.sql`](supabase-schema.sql) → **Run**.

> Le login fonctionne même sans cette table (le pseudo est stocké dans les métadonnées du
> compte), mais elle sert de base pour l'avatar et les futures données de jeu.

### 3. Désactiver la confirmation d'email (tu as choisi « connexion immédiate »)
Dashboard → **Authentication → Sign In / Providers → Email** → décoche **« Confirm email »**
→ Save.

> Si tu laisses cette option activée : à l'inscription, le joueur recevra un mail de
> confirmation et le launcher affichera « Vérifie ta boîte mail ». Le code gère les deux cas.

---

## Tester

```bash
npm start
```
1. L'écran de login s'affiche.
2. Onglet **Inscription** → pseudo + email + mot de passe → **S'inscrire**.
3. Tu entres directement dans le launcher, ton pseudo apparaît en haut à droite.
4. Ferme puis relance : tu es toujours connecté.
5. Vérifie dans Dashboard → **Authentication → Users** que le compte existe,
   et **Table Editor → profiles** que le profil a été créé.

---

## Options

- **Rendre le login facultatif** : `"requireLogin": false` dans `launcher.config.json`
  (le launcher s'ouvre sans connexion).
- **Ajouter Google/Discord plus tard** : possible, mais nécessite un flux OAuth navigateur +
  redirection (loopback) dans Electron. Dis-le moi et je l'ajoute.
- **Contrôle d'accès au jeu par compte** (ex : builds réservés aux comptes autorisés) :
  demande un backend qui délivre des liens de téléchargement signés — à voir dans un 2e temps.

---

## Alternative : me laisser tout configurer via MCP

Si tu préfères que j'applique le schéma et récupère la clé automatiquement, reconnecte le
MCP Supabase à ce projet, dans un **terminal** (pas l'extension IDE) :

```bash
claude mcp add --scope project --transport http supabase "https://mcp.supabase.com/mcp?project_ref=pbuxpxwxaoqypqgsizei"
claude   # puis  /mcp  -> selectionne supabase -> Authenticate
```
Ensuite, redis-moi « c'est reconnecté » et j'applique la migration + je vérifie tout côté serveur.

// Edge Function : download-game
// -----------------------------------------------------------------------------
// Renvoie une URL de téléchargement SIGNÉE et temporaire pour la dernière release
// du jeu, UNIQUEMENT si l'appelant est un joueur connecté (session Supabase valide).
//
// Le token GitHub (lecture du repo privé) reste ici, côté serveur : il n'est
// jamais présent dans le launcher distribué.
//
// Secrets à définir (Dashboard > Edge Functions > Secrets, ou `supabase secrets set`):
//   GH_GAME_TOKEN = github_pat_...   (fine-grained, Contents:Read sur le repo du jeu)
//   GAME_REPO     = MikAmaral123/MyUniverse-Release   (optionnel, défaut ci-dessous)
//   ASSET_MATCH   = \.zip$                              (optionnel)
// -----------------------------------------------------------------------------

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const GH_GAME_TOKEN = Deno.env.get('GH_GAME_TOKEN') ?? '';
const GAME_REPO = Deno.env.get('GAME_REPO') ?? 'MikAmaral123/MyUniverse-Release';
const ASSET_MATCH = Deno.env.get('ASSET_MATCH') ?? '\\.zip$';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });

  try {
    if (!GH_GAME_TOKEN) return json({ error: 'GH_GAME_TOKEN non configuré côté serveur.' }, 500);

    // 1. Authentifier le joueur via sa session Supabase
    const authHeader = req.headers.get('Authorization') ?? '';
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return json({ error: 'Tu dois être connecté pour télécharger le jeu.' }, 401);
    }

    // 2. Dernière release du repo privé (token serveur)
    const ghHeaders = {
      'User-Agent': 'BasaltLauncher',
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${GH_GAME_TOKEN}`,
    };
    const relRes = await fetch(
      `https://api.github.com/repos/${GAME_REPO}/releases/latest`,
      { headers: ghHeaders }
    );
    if (!relRes.ok) {
      return json({ error: `GitHub a répondu ${relRes.status} (repo/token ?).` }, 502);
    }
    const release = await relRes.json();

    const rule = new RegExp(ASSET_MATCH, 'i');
    const zips = (release.assets ?? []).filter((a: any) => /\.zip$/i.test(a.name));
    const asset = zips.find((a: any) => rule.test(a.name)) ?? zips[0];
    if (!asset) return json({ error: 'Aucune archive .zip dans la dernière release.' }, 404);

    // 3. Demander l'asset en octet-stream SANS suivre la redirection :
    //    GitHub renvoie un 302 vers une URL signée (objects.githubusercontent.com),
    //    temporaire et accessible sans token.
    const assetRes = await fetch(asset.url, {
      headers: { ...ghHeaders, Accept: 'application/octet-stream' },
      redirect: 'manual',
    });
    const signedUrl = assetRes.headers.get('location');
    if (!signedUrl) {
      return json({ error: 'URL signée indisponible (statut ' + assetRes.status + ').' }, 502);
    }

    // 4. Réponse au launcher
    return json({
      version: release.tag_name,
      name: asset.name,
      size: asset.size,
      url: signedUrl,
      notes: release.body ?? '',
      releaseName: release.name ?? release.tag_name,
      publishedAt: release.published_at,
    });
  } catch (e) {
    return json({ error: String((e as Error)?.message ?? e) }, 500);
  }
});

// DROPZY instant-publish catalogue + private stream endpoint.
// Deploy with: supabase functions deploy dropzy-catalog
// Set SUPABASE_URL, SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY as function secrets.
// The service-role key must never be placed in browser code.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Content-Type": "application/json",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: cors });

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  const url = Deno.env.get("SUPABASE_URL");
  const service = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !service) return json({ error: "Catalogue service is not configured." }, 503);

  const admin = createClient(url, service, { auth: { persistSession: false } });
  const authHeader = req.headers.get("Authorization") || "";

  if (req.method === "GET") {
    const id = new URL(req.url).searchParams.get("id");
    if (id) {
      const { data: row, error } = await admin
        .from("song_submissions")
        .select("id,title,artist,language,genre,version_label,storage_path,status")
        .eq("id", id).eq("status", "approved").maybeSingle();
      if (error) return json({ error: "Could not load approved track." }, 500);
      if (!row) return json({ error: "Track not found or not approved." }, 404);
      const { data, error: signError } = await admin.storage
        .from("artist-submissions").createSignedUrl(row.storage_path, 300);
      if (signError || !data?.signedUrl) return json({ error: "Could not create stream URL." }, 500);
      return json({ track: {
        id: row.id, title: row.title, artist: row.artist, language: row.language,
        genre: row.genre, version_label: row.version_label, stream_url: data.signedUrl
      }});
    }

    const { data: rows, error } = await admin.from("song_submissions")
      .select("id,title,artist,language,genre,version_label,created_at")
      .eq("status", "approved").order("created_at", { ascending: false }).limit(100);
    if (error) return json({ error: "Could not load approved catalogue." }, 500);
    return json({ tracks: rows || [] });
  }



  return json({ error: "Method not allowed." }, 405);
});

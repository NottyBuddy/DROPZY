# DROPZY artist submissions setup

The artist submission page is `artist-upload.html`. It is a private intake portal; submissions do not appear in the public catalogue automatically.

## One-time secure backend setup

1. Create a Supabase project under an account controlled by DROPZY.
2. Open the SQL editor and run `supabase/schema.sql`.
3. In the project settings, copy the Project URL and the public anon/publishable key.
4. Put those two public values into `artist-upload.html` at:
   - `DROPZY_SUPABASE_URL`
   - `DROPZY_SUPABASE_ANON_KEY`
5. In Authentication settings, configure the allowed site URL and email confirmation.
6. Open `https://<your-site>/artist-upload.html` and test with an artist account.

Never put a Supabase service-role key or database password in GitHub Pages, HTML, JavaScript, or any public repository.

## Review and catalogue rules

- All uploads go into a private storage bucket.
- New rows start with `status = pending`; artists cannot approve their own tracks.
- Review rights to the master recording AND composition, contributor agreements, territories, licence term, attribution, and takedown contact before approval.
- Mainstream label/film songs require direct written agreements from the relevant rights holders. An artist account alone is not proof that they own a commercial master.
- Do not expose pending audio or create public URLs for it.
- Public streaming is a separate next step: add a server-side approval and signed-stream endpoint, then connect the DROPZY player only to approved rows. Do not make the bucket public.

## Important limitation

GitHub Pages is static hosting. It cannot securely receive and store audio or protect administrator credentials on its own. This repository now contains the portal and database policy foundation, but live uploads will remain disabled until the project URL/key are configured and the SQL is run in DROPZY's own backend account.

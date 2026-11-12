# DROPZY instant artist publishing

The artist portal is `artist-upload.html`. Artists create an account, upload their audio, confirm they control the required rights, and the track is published to the DROPZY catalogue immediately. There is no manual approval queue or admin review dashboard.

## One-time backend setup (required)

1. Create a Supabase project controlled by DROPZY.
2. Run the complete `supabase/schema.sql` in the Supabase SQL Editor.
3. In Supabase Project Settings, copy the Project URL and public anon/publishable key.
4. Add those public values to `artist-upload.html` in `DROPZY_SUPABASE_URL` and `DROPZY_SUPABASE_ANON_KEY`.
5. Deploy the Edge Function: `supabase functions deploy dropzy-catalog`.
6. Set Edge Function secrets (never commit them): `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. Keep the service-role key only as a server-side function secret.
7. In Supabase Auth, set the allowed site URL and email confirmation settings.
8. Put the deployed function URL (`https://<project-ref>.supabase.co/functions/v1/dropzy-catalog`) in `index.html` as `DROPZY_CATALOG_FUNCTION`.
9. Test an artist account and upload a track for which you own or control all required rights.

## Publishing and rights

- New uploads are marked `approved` automatically after the artist confirms rights; no admin approval is required.
- Audio and rights evidence remain in private storage. The public catalogue receives metadata and short-lived signed stream URLs.
- Artists must have the necessary rights for both the recording (master) and the underlying composition, including contributors, samples, territories, licence term, attribution and derivative/remix rights.
- Covers, slowed/reverb edits, remixes, reply versions and male/female versions are not automatically cleared just because the uploader made the edit. Check permissions for the underlying composition and any original recording used.
- Mainstream label/film songs require direct written agreements from the relevant rights holders. Availability on YouTube, Spotify, Apple Music, Gaana, Hungama or JioSaavn does not grant DROPZY permission to copy or host the audio.
- A valid rights complaint should be investigated promptly; the project owner can change a disputed track status to `taken_down` in Supabase.

## Edge Function

The public GET endpoint returns tracks with status `approved`; GET with `?id=<track-id>` returns a short-lived signed stream URL only for an approved track. There is no review/approval endpoint.

## Important limitation

GitHub Pages is static hosting. The live upload/catalogue service will not work until the owner creates and configures a Supabase project, runs the SQL, sets secrets, and deploys the function. This setup cannot be completed without access to the user's Supabase project.

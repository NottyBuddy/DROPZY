# DROPZY rights-cleared music catalogue

The artist portal is `artist-upload.html`. Artist uploads remain private and pending until a DROPZY administrator verifies the rights and approves them. Only approved rows are returned by the public catalogue endpoint.

## One-time backend setup (required)

1. Create a Supabase project controlled by DROPZY.
2. Run the complete `supabase/schema.sql` in the Supabase SQL Editor.
3. In Supabase Project Settings, copy the Project URL and public anon/publishable key.
4. Add those public values to `artist-upload.html` in `DROPZY_SUPABASE_URL` and `DROPZY_SUPABASE_ANON_KEY`.
5. Deploy the Edge Function from this repository:
   `supabase functions deploy dropzy-catalog`
6. Set Edge Function secrets (never commit them):
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
7. In Supabase Auth, set the allowed site URL and email confirmation settings.
8. Assign the DROPZY reviewer role only to a trusted administrator using Supabase Auth user app_metadata `{"role":"admin"}`. Do not allow ordinary users to edit app_metadata.
9. Open `/artist-upload.html`, create an artist account and test a private submission.

## Review and rights checks

- Uploads are private in the `artist-submissions` bucket.
- New submissions are `pending`; artists cannot approve their own tracks.
- The form accepts original, lo-fi, slowed + reverb, reverb, male/female versions, reply versions, covers, remixes, acoustic and folk/traditional labels.
- Artists can attach private rights evidence. Verify the master recording AND composition, samples, contributors, territories, licence term, attribution and derivative/remix rights before approval.
- A cover, slowed/reverb edit, remix, reply version or male/female re-recording is not automatically cleared just because the uploader made the edit. Check the underlying composition and any original recording used.
- Mainstream label/film songs require direct written agreements from the relevant rights holders. Being available on YouTube, Spotify, Apple Music, Gaana, Hungama or JioSaavn does not grant DROPZY permission to copy or host the audio.
- Admin review is done by POSTing to the Edge Function with a valid administrator JWT and a pending submission id. Use status `approved` or `rejected`; `taken_down` is available for later takedowns.
- The public GET catalogue endpoint returns approved metadata only. GET with `?id=<submission-id>` returns a short-lived signed stream URL only when the track is approved.

## Edge Function deployment

The source is `supabase/functions/dropzy-catalog/index.ts`. Deploy with the Supabase CLI after linking the project. The function is configured for public approved-catalog reads; POST review operations independently verify the signed-in user's `app_metadata.role = admin`.

## Important limitation

GitHub Pages is static hosting. It cannot securely store audio, administrator credentials, or service-role keys. The repository now includes the intake form, rights-evidence field, private-storage/RLS schema, and secure catalogue/review Edge Function source. **The live upload/catalogue service will not work until the owner creates and configures a Supabase project, runs the SQL, sets secrets, and deploys the function.** This setup cannot be completed without access to the user's Supabase project.

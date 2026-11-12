# DROPZY 🎧

A cinematic, dark-mode music discovery concept for DJ edits, mashups and late-night scenes.

## Live preview
Once GitHub Pages is enabled: https://nottybuddy.github.io/DROPZY/

## Features
- Responsive, Netflix-inspired discovery interface
- Mood and music-scene collections
- Search/filter across visible collections
- Live Audius creator-track search, weekly trending feed, genre shortcuts and in-app playback
- Play queue, seek/progress controls and creator-attribution links
- Free-to-use experience with no subscription/paywall in the current build
- Mainstream artist discovery shortcuts for Bollywood, Punjabi, hip-hop, indie and global music
- Official Spotify embeds for user-supplied track, album, playlist or artist links
- Interactive demo player controls
- 2-track and 3-track mashup flow preview
- No build step required — plain HTML, CSS and JavaScript

## Run locally
Open `index.html` in any modern browser.

## Important
The live Audius section plays available creator-uploaded tracks. The mainstream discovery section opens official YouTube Music / YouTube / Spotify search pages and can embed a Spotify link supplied by the visitor. Mainstream catalog access, availability, ads and playback restrictions remain controlled by those services. DROPZY does not download, copy, or re-host commercial audio. The mashup flow is still a preview UI: actual crossfading, beat matching, stems, generated mashups and synced licensed lyrics require appropriate rights, suitable sources and additional engineering.

## Deploy with GitHub Pages
In the repository, open **Settings → Pages**, choose **Deploy from a branch**, select **main** and **/(root)**, then Save.


## Live music catalog

DROPZY now includes live track discovery and playback using the Audius public read API. The app can search the Audius catalog, load weekly trending tracks, stream available tracks through the official stream endpoint, and show creator attribution. Audius is an open creator catalog; it is not a guaranteed source for mainstream label releases such as every Bollywood or Punjabi hit.

The current live integration supports one track at a time plus a basic play queue. Crossfading, beat-matched mashup rendering, stems, and commercial-catalog playback are not enabled by this integration. Audius creator tracks can carry different usage permissions; streaming availability through the API does not grant DROPZY blanket remix, download, or re-hosting rights. Keep attribution and follow each track's license and Audius API terms. Those features require track-level remix permissions and/or direct licensing and a suitable audio source. See the [Audius API docs](https://docs.audius.co/api/) and [Audius developer guide](https://docs.audius.co/).


## Mainstream music discovery

The artist shortcuts include popular Bollywood, Punjabi, Indian hip-hop, indie and international acts. Search opens the official platform's search results rather than scraping copyrighted audio. Spotify's official embed flow is documented at [Spotify for Developers](https://developer.spotify.com/documentation/embeds), and YouTube's embedded player/API is documented at [Google for Developers](https://developers.google.com/youtube/iframe_api_reference).

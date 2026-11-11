# DROPZY 🎧

A cinematic, dark-mode music discovery concept for DJ edits, mashups and late-night scenes.

## Live preview
Once GitHub Pages is enabled: https://nottybuddy.github.io/DROPZY/

## Features
- Responsive, Netflix-inspired discovery interface
- Mood and music-scene collections
- Search/filter across visible collections
- Interactive demo player controls
- 2-track and 3-track mashup flow preview
- No build step required — plain HTML, CSS and JavaScript

## Run locally
Open `index.html` in any modern browser.

## Important
This repository currently contains a front-end concept/demo. The player controls and mashup flow are UI demonstrations; no commercial music, real audio playback, generated mashups, or synced licensed lyrics are included. Connect rights-cleared audio/catalogue services and a backend before launching a real streaming service.

## Deploy with GitHub Pages
In the repository, open **Settings → Pages**, choose **Deploy from a branch**, select **main** and **/(root)**, then Save.


## Live music catalog

DROPZY now includes live track discovery and playback using the Audius public read API. The app can search the Audius catalog, load weekly trending tracks, stream available tracks through the official stream endpoint, and show creator attribution. Audius is an open creator catalog; it is not a guaranteed source for mainstream label releases such as every Bollywood or Punjabi hit.

The current live integration is single-track playback. Crossfading, beat-matched mashup rendering, stems, and commercial-catalog playback are not enabled by this integration. Those features require track-level remix permissions and/or direct licensing and a suitable audio source. See the [Audius API docs](https://docs.audius.co/api/) and [Audius developer guide](https://docs.audius.co/).

# Soundroom

Soundroom is an offline-first desktop music player for audio files you choose from your device. Imported audio and the library index are stored locally in IndexedDB; the app does not stream music, contact a service, or upload your files.

## App sketch

- **Library:** import tracks with the file picker or drag and drop; search by track name or filename; select a track to play it.
- **Play queue:** plays imported tracks in library order, with previous/next controls.
- **Player:** play/pause, seek, volume, track progress, and automatic advance.
- **Offline storage:** imported audio remains in the local app database between launches.

The current starter labels imported tracks from their filenames. Reading embedded artist, album, duration, and cover-art metadata, plus editable playlists, are natural next features.

## Tools

- Visual Studio Code for editing and debugging
- Node.js 20 or later, which includes npm, to install dependencies and run builds
- Electron for the Windows desktop shell
- React, TypeScript, and Vite for the player interface

The listed npm packages are project dependencies. They still need to be downloaded once with `npm install`; after that, using the installed player does not require an internet connection. No extra VS Code extensions are required.

## Get started

Open a terminal in this folder and run:

```powershell
npm install
npm run dev
```

The development command opens the desktop app and watches the UI for changes. If PowerShell cannot find `npm`, install Node.js 20 or later, restart VS Code, and try again.

Build the renderer and check TypeScript:

```powershell
npm run build
```

Create a Windows installer:

```powershell
npm run dist
```

The installer output is written to `release/`. The first build may need internet access to download npm packages and Electron's packaging tools. The generated player itself does not use network services.

## Run on a phone

Soundroom's phone version is an installable PWA. Build it with `npm run build` and deploy the generated `dist/` folder to a static host with HTTPS enabled. Installation from a phone requires HTTPS; the desktop Electron package cannot be installed on Android or iOS.

For a quick same-Wi-Fi preview before deploying, run `npm run dev:phone`, find this computer's local IPv4 address, then open `http://<computer-ip>:5174` on the phone. This preview is for testing and is not installable or available offline.

- **Android:** open the HTTPS site in Chrome and choose **Install app** or **Add to Home screen** from the browser menu.
- **iPhone:** open the HTTPS site in Safari, tap **Share**, then **Add to Home Screen**.

After the first successful load, the app shell is cached for offline use. Each device has its own local library, so import the audio files on the phone itself. Browser codec support varies by device.

## Project structure

```text
electron/
  main.cjs                 Secure Electron window and app lifecycle
src/
  App.tsx                  Library, queue, import workflow, and playback controls
  main.tsx                 React entry point
  styles.css               Responsive player visual system
  lib/
    music-library.ts       IndexedDB persistence for imported audio
index.html                 Renderer document and content security policy
vite.config.ts             Vite development and production build settings
package.json               Dependencies, scripts, and Windows packaging settings
```

Electron's renderer runs with `contextIsolation` enabled and Node integration disabled. Keep filesystem or operating-system access in the main process if the app later needs it; do not enable Node integration in the renderer.

## Local audio notes

Soundroom accepts common audio files such as MP3, WAV, OGG, M4A, AAC, FLAC, WebM, and Opus. Actual playback support depends on the codecs available to Electron on the target system. Removing the app's site data will also remove its IndexedDB music library; keep original audio files backed up elsewhere.

# Ever Guild Site

Public website for Ever Guild

## Stack

- React
- TypeScript
- Vite
- SCSS
- Three.js

## Development

Install dependencies:

```sh
npm ci
```

Run the local dev server:

```sh
npm run dev
```

Check code:

```sh
npm run lint
npm run build
```

Check the public URL with VirusTotal:

```sh
VIRUSTOTAL_APIKEY=... npm run vt:check
```

Preview the production build:

```sh
npm run preview
```

## Deployment

The site is deployed to GitHub Pages from `main`

CI runs lint and build on pull requests and pushes to `main`

After deployment from `main`, CI requests a VirusTotal re-analysis for `https://ever-guild.net/`
using the `VIRUSTOTAL_APIKEY` repository secret.

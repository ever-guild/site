# `@ever-guild/site`

## Run development website locally
```
npm start
```

## Build production files - to "dist" folder
```
npm run build
```
* Ensure there are no TypeScript errors, otherwise complilation will be aborted.
* Build files will be placed in the "dist" folder by default.
* To change build folder, add this line to *[vite.config.ts](https://github.com/MengLinMaker/PWA-Vite-React-Boilerplate/blob/main/vite.config.ts)* `defineConfig`:
```javascript
build: {
  outDir: './build-directory'
},
```

## Run production build website locally
```
npm run preview
```

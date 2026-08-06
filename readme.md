# VETRO Custom App

This repository contains example code for custom apps that can be deployed on the VETRO platform. A custom app is a web application that is hosted on the VETRO platform and rendered within VETRO using a shared `{ type, render, unmount }` contract.

Example packages are available for React, Svelte, and plain JavaScript (Web Components).

## Placements

Custom apps can be placed in the following locations within the VETRO platform:

- **App**: The app is displayed as a full-screen section within the VETRO platform and available on the main navigation menu. The url for the app is the app id.

- **Feature Panel**: The app is displayed as a tab within the feature panel when a feature is selected.

## Packages

| Package | Framework | Placement |
| --- | --- | --- |
| `packages/react-app-ui` | React | App |
| `packages/react-feature-panel-ui` | React | Feature Panel |
| `packages/svelte-feature-panel-ui` | Svelte | Feature Panel |
| `packages/js-feature-panel-ui` | Plain JS / Web Components | Feature Panel |

Each package is independent. From a package directory:

```bash
npm install
npm start   # watch build + serve dist on http://localhost:8801
npm run build
```

## App ID

The app id is a unique identifier for the app. The app id is used to access the app in the VETRO platform. The app id needs to be added to `vite.config.ts` in order for the app to work correctly.

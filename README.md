# Diwali Air Quality Prediction - Patiala

**Live dashboard:** https://patiala-diwali-dashboard.vercel.app/

Station-level PM2.5 forecasting dashboard for the **Model Town, Patiala** CPCB
CAAQMS monitoring station (site_1437), built around Diwali 2026 (Nov 8). It
shows the predicted daily mean PM2.5 concentration before, during and after
Diwali, mapped to the official CPCB PM2.5 breakpoint bands (band label only,
no numeric AQI code), plus a backtest of the model against baselines and a map
view of the station surroundings.

Built as a team hackathon project.

## What it does

- **Forecast:** daily mean PM2.5 (ug/m3) for the festival window, with days to
  Diwali and the CPCB band for each day.
- **Backtest:** held-out test window (2024-10-20 to 2024-11-10) comparing the
  model against lead-matched weather-forecast variants and a naive climatology
  baseline.
- **Map:** station location and gridded values around Model Town, Patiala.
- **PWA:** installable, with a service worker for web-push notifications
  (push backend not included, see below).

## Data and model

- Historical PM2.5 from CPCB / CAAQMS (station site_1437).
- Weather inputs and live 16-day forecasts from Open-Meteo.
- The model was refit on complete daily rows from 2021-01-01 to 2024-12-31 and
  run once, offline, on 2026-11-01 IST. Its outputs are the precomputed
  payloads served by `api/forecast.js`, `api/backtest.js` and the static files
  under `data/`. Training code is not part of this repository.
- Map tiles: OpenFreeMap (Positron) and EOX Sentinel-2 cloudless.

## Repository layout

- `index.html`, `assets/`, `manifest.webmanifest`, `sw.js`, icons - the
  frontend exactly as deployed (a React + Vite production build).
- `data/` - static JSON used by the frontend (predictions, scenarios, map
  grid/values/meta, cityscape).
- `api/` - Vercel serverless functions. `forecast.js` and `backtest.js` serve
  the precomputed model payloads, matching the live API responses.

## Provenance

The original source code was not available. This repository was reconstructed
from the live deployment on 2026-11-08: the frontend is the deployed
production build (minified), and the API functions are minimal
re-implementations that serve the same precomputed payloads the live endpoints
return. Community photo reports were never enabled (the endpoints answer with
`{"error":"community reporting is not enabled","enabled":false}`). Web-push
subscriptions depended on server-side VAPID keys that were not recoverable, so
`api/subscribe.js` declines new subscriptions honestly.

## Running it

It is a static site plus Vercel serverless functions. Deploy the repository to
Vercel as-is, or serve the root with any static file server for the frontend
only (the map, charts and scenario views work from `data/`; the forecast and
backtest panels need the `/api` functions).

## Scope and caveats

- Forecasts are for one monitoring station. They describe that station's
  conditions, not neighborhood-level accuracy.
- PM2.5 is reported as a concentration with a CPCB band label, not a numeric
  AQI value.
- The forecast was generated on 2026-11-01 for Diwali 2026 and does not update
  itself.

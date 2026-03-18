# SupplAi — Prototype Demo Design Spec

## Overview

Interactive prototype demo for PIDI 2026 hackathon submission. SupplAi is an AI-based early warning system for food price volatility in Indonesia. The prototype uses dummy data to let judges experience the full product concept across 5 pages.

**Goal:** Impress judges with a polished, interactive, responsive prototype that demonstrates the SupplAi concept — predicting food prices, visualizing price disparities, recommending redistribution routes, and alerting regional officers (TPID).

## Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components
- **Charts:** Recharts (line, bar, heatmap)
- **Maps:** React Simple Maps (SVG-based Indonesia map)
- **Animations:** Framer Motion (page transitions, counting numbers, route animations)
- **Data:** Dummy data served via Next.js API Routes
- **Deploy:** Vercel (frontend-only, zero backend)

## Pages

### 1. Landing Page (`/`)

Hero section introducing SupplAi to judges before they dive into the dashboard.

**Content:**
- Logo + tagline: "Sistem Peringatan Dini Inflasi Pangan Berbasis AI"
- Animated counting-up stats: Rp4.5T potensi penghematan, 514 kabupaten, 542 TPID, 5 komoditas
- Mini Indonesia map with pulsing dots on critical regions
- Brief explanation of 3 modules (Predict, Match, Agent) with icons
- CTA button: "Masuk ke Dashboard"
- Team info footer (SupplAi - PIDI 2026)

### 2. Dashboard Prediksi (`/dashboard`)

Main prediction dashboard showing price forecasts per commodity per region.

**Filter bar:**
- Dropdown komoditas: beras, cabai rawit, bawang merah, bawang putih, gula pasir
- Dropdown wilayah: ~20 kabupaten/kota sample
- Selector rentang waktu: 7 hari, 14 hari, 30 hari

**Summary cards (4):**
- Harga saat ini (e.g. Rp54.400/kg)
- Perubahan harga (e.g. +147, arrow indicator)
- Prediksi 14 hari (e.g. Rp58.200/kg)
- MAPE / confidence (e.g. 7.3%)

**Charts:**
- Line chart: harga aktual (solid) vs prediksi (dashed) with confidence interval shading
- Bar chart: perbandingan harga antarwilayah

**Interactivity:**
- Filter changes → smooth animated chart/card updates
- Hover chart → tooltip with price detail
- Click bar chart region → navigate to heatmap for that region

### 3. Heatmap (`/heatmap`)

Regional price heatmap showing price changes across districts.

**Summary cards (3):**
- Kabupaten/kota terpantau (514)
- Rata-rata kenaikan harga (+22.4%)
- Jumlah wilayah alert

**Heatmap grid:**
- Table matrix: rows = ~20 wilayah, columns = dates
- Cell color: green (stable/down) → yellow (slight increase) → red (spike)
- Hover cell → tooltip: wilayah, date, price, % change
- Sortable by region name / severity

**Right panel:**
- Top 5 Wilayah Kritis list
- Click → navigate to dashboard with that region selected

**Filters:**
- Komoditas dropdown
- Rentang waktu
- Toggle: Harga Aktual vs Prediksi

### 4. Match Redistribusi (`/redistribusi`)

Redistribution recommendation dashboard with Indonesia map.

**Summary cards (4):**
- Jumlah rute rekomendasi (32)
- Total volume redistribusi (845 ton)
- Rute aktif/total (5/13)
- Estimasi biaya logistik (Rp28.5M)

**Indonesia map (main content):**
- SVG map via React Simple Maps with Indonesia GeoJSON
- Surplus provinces highlighted green, deficit highlighted red
- Animated arc lines showing redistribution routes
- Hover province → tooltip: name, surplus/deficit status, stock volume
- Hover route → tooltip: origin, destination, volume, cost

**Left panel:**
- Komoditas filter
- Surplus region list with stock volumes

**Right panel:**
- Linear Programming method info
- Latest recommendations

**Table below map:**
- Redistribution recommendations: origin → destination, commodity, volume (ton), distance, estimated cost, priority (high/medium/low)
- Sortable columns

**Dummy data:** 8 surplus provinces → 10+ deficit kabupaten, ~15 redistribution routes

### 5. Alert Center (`/alerts`)

Monitoring and alert management for TPID officers.

**Summary cards (4):**
- Total alert aktif (38)
- Alert bulan ini (214)
- Rata-rata waktu respons (2.3 hari)
- Alert terselesaikan (127)

**Filters:**
- Severity: Kritis (red), Tinggi (orange), Sedang (yellow), Rendah (blue)
- Komoditas, Wilayah, Status (Aktif/Ditangani/Selesai)

**Alert list:**
- Card-based list per alert:
  - Severity badge (colored)
  - Title (e.g. "Lonjakan Cabai Rawit di Kab. Jayapura naik >30%")
  - Region & commodity
  - Timestamp
  - Status badge
  - Model confidence level (e.g. 87%)
- Click → expand: mini price chart, recommended action, status history

**Interactivity:**
- Real-time filter updates
- Toggle alert status (simulate TPID handling)
- Sort by severity / time / region
- Toast notification simulating new alert arrival

## Shared Layout

**Sidebar (desktop):**
- Dark navy (#1a1f37) background
- SupplAi logo at top
- Navigation links with icons: Overview, Dashboard Prediksi, Heatmap, Match Redistribusi, Alert Center
- Active page highlighted
- Notification badge count on Alert Center link
- Collapsible on tablet

**Responsive behavior:**
- Desktop: sidebar left, full layout per mockup
- Tablet: collapsible hamburger sidebar, charts full width
- Mobile: bottom navigation bar (app-style), cards single column, charts stacked vertical, map full width

## API Routes (Dummy Data)

```
GET /api/predictions?commodity=beras&region=jakarta&range=14
GET /api/heatmap?commodity=beras&range=14
GET /api/redistribution?commodity=beras
GET /api/alerts?severity=kritis&status=aktif
GET /api/commodities
GET /api/regions
```

All return hardcoded dummy data from TypeScript files, filtered by query params.

## Dummy Data Scope

**Commodities (5):** Beras, Cabai Rawit, Bawang Merah, Bawang Putih, Gula Pasir

**Regions (~20 sample):**
- Jawa: Jakarta, Bandung, Surabaya, Semarang, Yogyakarta
- Sulawesi: Makassar, Manado, Palu
- Sumatera: Medan, Palembang, Padang
- Kalimantan: Balikpapan, Pontianak
- NTT: Kupang
- Maluku: Ambon
- Papua: Jayapura, Merauke, Sorong, Manokwari

**Price data:** 90 days historical + 14 days prediction per commodity per region. Realistic price ranges based on proposal data (e.g. beras Jawa ~Rp14.700/kg, Papua ~Rp54.700/kg).

**Alerts:** ~30 alerts with mixed severity, commodity, region, status.

**Redistribution:** 8 surplus provinces, 10+ deficit regions, ~15 routes.

## Wow-Factor Polish

- Animated counting-up numbers on landing page and summary cards
- Framer Motion page transitions
- Loading skeletons when switching data (simulate real API feel)
- Smooth chart animations on filter change
- Pulsing dots on map for critical regions
- Animated arc lines on redistribution map
- Toast notifications for simulated real-time alerts
- Export PDF button (simulated)
- Consistent dark navy theme matching mockups
- Fully responsive (mobile bottom nav)

## Deployment

- GitHub repo: Richjuliano20
- Vercel project: richard-julianos-projects
- Single `next build` → static export + API routes on Vercel serverless

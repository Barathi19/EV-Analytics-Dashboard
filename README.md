## EV Dashboard

A responsive dashboard built with Next.js, TypeScript, Tailwind CSS, and Recharts to visualize Electric Vehicle (EV) data.

## Features
- KPI cards (Total EVs, Avg Range, % BEV, Top Make)
- Interactive charts (growth by year, BEV vs PHEV, top makers & cities)
- Paginated EV data table
- Fully responsive layout

## Tech Stack
- Next.js – React framework
- TypeScript – Type-safe coding
- Tailwind CSS – Utility-first styling
- Recharts – Charting library


## Project Structure

```text
src/
 ├── components/
 │   ├── ChartsSection.tsx   # Charts wrapper & graphs
 │   ├── OverviewCard.tsx    # KPI cards
 │   ├── EVTable.tsx         # Paginated searchable table
 │   └── Layout.tsx          # App layout
 ├── data/
 │   └── ev.json             # EV dataset (mock)
 ├── pages/
 │   └── index.tsx           # Main dashboard
 └── styles/
     └── globals.css         # Tailwind + custom styles

```
## Getting Started
1. npm install
2. npm run dev


Open http://localhost:3000
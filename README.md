# SQL Runner

## Key Implementation Highlights

- Editor: Monaco with Run (Cmd/Ctrl + Enter) and Format (Cmd/Ctrl + K) shortcuts
- State: `zustand` stores global state and actions;
- Table: `react-window` virtualization, sticky header, per-column sorting
- Export: JSON and CSV downloads

## Local Development

1. Install: `npm install`
2. Run dev: `npm run dev`
3. Open the app and load a table from the dataset to preview and interact with results

## Project Structure

```text
public/
  data/                 # CSV dataset used by the app
src/
  App/
    components/         # App-level UI (Query panel, Result panel)
    states/             # Zustand stores, helpers, and API shims
  components/           # Reusable UI building blocks
    Table/              # Virtualized table + sorting hook
      index.tsx         # Table wrapper integrating virtualization + headers
      VirtualTable.tsx  # react-window wrapper with sticky header context
      Inner.tsx         # Sticky header + table layout
      Row.tsx           # <tr/>
      Cell.tsx          # <th/> / <td/>
      helpers.ts        # defaultCompare and table helpers
      useTableSort.ts   # Column sorting hook (asc/desc/none)
    Button/
    Layout/
    Header/
    Footer/
    Container/
    QueryEditor/
    Pagination/
  main.tsx              # App bootstrap (Vite/React)
  index.css             # Styles
```

## Tech Stack

- **react, react-dom**: UI framework and DOM renderer.
- **vite**: Fast dev server and build tool; **@vitejs/plugin-react-swc** for React/SWC.
- **@monaco-editor/react**: Embeds Monaco editor for SQL editing and shortcuts.
- **zustand**: For managing global states and sharing data between components
- **react-window**: Virtualized row rendering for large tables.
- **papaparse**: CSV parsing.
- **sql-formatter**: Client-side SQL formatting. (Optional)
- **node-sql-parser**: SQL query parser (Optional).
- **react-icons**: Icon set (headers, buttons, status cues).
- **tailwindcss, @tailwindcss/vite**: Utility-first styling; Vite integration.
- **tailwind-merge, tw-merge**: Class utilities to resolve Tailwind class conflicts.

- Dev tooling: **typescript**, **eslint**, **typescript-eslint**, **@eslint/js**, **eslint-plugin-react-hooks**, **eslint-plugin-react-refresh**, **globals**.

## Page Load time

I used Lighthouse from Chrome devtools to measure page load time.

- **FCP**: less than 1 second.
- **LCP**: 2 seconds, because of monaco editor rendering.
- **TBT**: 40 ms, already optimized.

## Optimization

This app is built using CSR(client side rendering) strategy. This the application is small in size, but still we can optimize the initial load time:

### Bundle Size Optimization

a. Lazy load the QueryEditor component which is loading monaco editor under the hood.
b. Lazy load the ResultPanel component which is loading the table component with react-window dependency.
c. I used rollup-plugin-visualizer bundle analyzer to further debug the assets in the bundles.

### Assets optimization

a. Implemented fonts from CDN (google CDN)
b. Using SVG based icons with react-icon packages
c. Data CSVs are downloaded on demand.

### Performance at Runtime

a. I've implemented react-window to load large dataset in the table
b. Used react hooks like useMemo at the places where we can optimize the computations.

## Future Scope

- **Unit Tests**: Use vitest as unit testing framework to test the components in isolation.
- **E2E Tests**: Use playwright as e2e testing framework for UI and accessibility testing.

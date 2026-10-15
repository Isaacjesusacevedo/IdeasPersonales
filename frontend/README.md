# Ideas Personales · Web (réplica visual La Industrial)

Frontend **solo lectura visual** en Vue 3 + Vite + TS.

Referencia: `Sistema industrial/Frontend` — se replica:
- Sidebar fijo 220px + brand + secciones + footer status
- Tokens: `--bg-0 #060a12`, `--accent #3b82f6`, fonts Syne / DM Sans / IBM Plex Mono
- Componentes: `.page`, `.stat-grid`, `.card`, `.table-wrap`, `.badge-*`, `.btn-*`
- Rutas: `/` dashboard, `/ideas` tabla, `/ideas/:id` detalle

## Dev
```
cd frontend
npm install
npm run dev
```

## Build
```
npm run build
```

Sin backend por ahora. Si se necesita CRUD real, replicar N-Tier Industrial (API→BR→AD + JWT).

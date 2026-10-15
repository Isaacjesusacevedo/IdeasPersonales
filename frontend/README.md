# Ideas Personales · Web (Obsidian Vault → Pages)

Vue 3 + Vite + TS, **100% estático**, réplica visual de La Industrial
(`Sistema industrial/Frontend`): sidebar 220px, tokens `--bg-0 #060a12`,
`--accent #3b82f6`, fonts Syne / DM Sans / IBM Plex Mono, `.page`, `.stat-grid`,
`.card`, `.table-wrap`, `.badge-*`, `.btn-*`.

## Contenido (Obsidian Vault, 76 notas → 7 secciones)
- `Yo` — perfil, contacto, experiencia, educación, habilidades, proyectos
- `Sistema de Decisión` — Consilium, Decisorium, Index, Integración, Plan 3 pasadas, plantillas
- `Proyecto Brownies` — ADN, OKR, Fases 1-3, eventos, mapa Palermo, log, protocolos + red (Luciano, clientes, locales, proveedores)
- `Proyecto Oxida` — Resplandor Naranja ARG: entidades, personajes, DAVA, Capítulo I, ARG web
- `Biblioteca Mental` — 13 sesgos + plan de venta, paradigmas, 48 leyes, Maquiavelo
- `Facultad` — .NET/C#, ADO, parcial, DemoAdo, info académica
- `Ideas sueltas` — lectura rápida (IDEAS.md)

Relaciones `[[...]]` del vault → rutas internas `/n/:id`. Búsqueda local en `/buscar`.

## Dev
```
cd frontend
npm install
npm run dev
```

## Build + Pages
- `base: '/IdeasPersonales/'` + `createWebHashHistory` (sin 404 en Pages)
- `npm run build` → `dist/` (verificado)
- Push a `main` → Action `.github/workflows/deploy.yml` publica `frontend/dist`
- URL: `https://isaacjesusacevedo.github.io/IdeasPersonales/`
- Activar en GitHub: Settings → Pages → Source: GitHub Actions

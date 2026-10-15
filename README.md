# IdeasPersonales

Base de conocimiento personal navegable: mis notas de Obsidian convertidas en web
estática (Vue 3 + Vite), con grafo de conexiones, nube de conceptos, búsqueda con
filtros y paleta de comandos. La leo cada vez que necesito inspiración o repasar.

🔗 GitHub: https://github.com/Isaacjesusacevedo/IdeasPersonales.git
🌐 Web: https://isaacjesusacevedo.github.io/IdeasPersonales/
📁 Local: `Documentos/Proyectos Profecionales/IdeasPersonales/`

## Secciones de la web

- **Dashboard** (`/`) — hero, métricas, secciones, "Empieza por aquí" y "Descubrí".
- **Explorar** (`/explorar`) — nube de conceptos y grafo interactivo de las 71 notas.
- **Vault** (`/s/:seccion`) — Yo, Sistema de Decisión, Brownies, Oxida, Biblioteca Mental, Facultad e Ideas.
- **Nota** (`/n/:id`) — plantilla por tipo (artículo, ficha, colección, proyecto, índice) con índice lateral, relacionadas, backlinks y modo lectura.
- **Etiquetas** (`/t/:tag`) — 53 etiquetas con co-ocurrencias.
- **Buscar** (`/buscar`) — ranking, filtros por sección/tipo/etiqueta y orden.

## Atajos de teclado

- `Ctrl/⌘ + K` o `/` → paleta de comandos (↑↓ + Enter).
- `Ctrl/⌘ + B` → plegar/expandir el sidebar.
- `Esc` → cerrar drawer, paleta o modo lectura.

## Cómo agregar una nota

1. En `frontend/src/data/vault.ts`, sumá un objeto al array `notas` **sin tocar** los
   campos existentes de las demás (`id`, `titulo`, `resumen`, `puntos`, `relaciones`, `origen`).
2. Campos nuevos (todos opcionales): `tipo` (`articulo`|`ficha`|`coleccion`|`proyecto`|`indice`),
   `intro` (1–2 frases con lo que la nota ya dice), `claves` (término + definición
   literales), `bloques` (`h2`|`h3`|`p`|`lista`|`card`|`desplegable`), `tags` (minúsculas,
   cada una usada en 2+ notas). En los textos valen `[[id]]`, `[[id|visible]]`, `**negrita**` y `código`.
3. Verificá: `cd frontend && npm run check:vault && npx vue-tsc -b && npm run build`.
4. Documentá el agregado en `docs/REVISION_CONTENIDO.md`.

## Estructura

- `README.md` → presentación del repo (este archivo)
- `IDEAS.md` → lista viva de ideas para leer siempre
- `docs/REFERENCIAS.md` → auditoría de arquitectura y referencias de diseño
- `docs/REVISION_CONTENIDO.md` → checklist de revisión por nota
- `frontend/` → web Vue 3 + Vite (sin backend, lista para GitHub Pages)
- `.github/workflows/deploy.yml` → publica `frontend/dist` en Pages con cada push a `main`

## Web local

```
cd frontend
npm install
npm run dev
```

## Publicación

- URL: `https://isaacjesusacevedo.github.io/IdeasPersonales/`
- Activar: GitHub → Settings → Pages → Source: GitHub Actions

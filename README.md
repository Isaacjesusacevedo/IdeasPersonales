# IdeasPersonales

Repositorio personal de ideas, notas y proyectos futuros.
Lo leo cada vez que necesito inspiración o repasar pendientes.

🔗 GitHub: https://github.com/Isaacjesusacevedo/IdeasPersonales.git
📁 Local: `Documentos/Proyectos Profecionales/IdeasPersonales/`

## Cómo usar
1. Escribe tus ideas en `IDEAS.md`
2. Haz commit y push para tenerlas siempre disponibles:
   ```
   git add .
   git commit -m "nueva idea"
   git push
   ```

## Estructura
- `README.md` → presentación del repo (este archivo)
- `IDEAS.md` → lista viva de ideas para leer siempre
- `frontend/` → web Vue 3 + Vite (Obsidian Vault → 7 secciones, estilo La Industrial, lista para GitHub Pages)
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

# Arquitectura actual (auditoría Fase 0)

1. `main.ts` monta `App.vue` con el router e importa el CSS global; sin stores ni librerías.
2. `App.vue` es el shell: sidebar fijo 248px (brand, nav Principal/Vault, command bar, footer), topbar con breadcrumb y `<Transition fade-slide>`.
3. `router/index.ts` usa hash history con 7 rutas (`/`, `/ideas`, `/ideas/:id`, `/s/:seccion`, `/n/:id`, `/buscar`, 404) y `afterEach` para el título.
4. `data/vault.ts` es el único contenido: `secciones[7]` (+`acento` opcional) y `notas[71]` con `titulo/resumen/puntos/relaciones/origen`.
5. Vistas: `HomeView` (hero+stats+secciones+destacadas), `SeccionView` (grilla+filtrito), `NotaView` (ficha+relacionadas), `BuscarView` (filtro+`<mark>` vía resalta con escape), `Ideas*` (compat), `NotFoundView`.
6. `main.css` concentra todo el design system (tokens noche/morado/turquesa, cards, pills, botones, stats, tablas, responsive, reduced-motion).
7. Deploy: `base '/IdeasPersonales/'`, `public/404.html` + `.nojekyll`, workflow que publica `dist/`.
8. Reutilizo: tokens, `.card/.pill/.badge/.btn-*`, stat-cards, transición, hash-router, `vault.ts` como fuente, `notaPorId/notasPorSeccion`.
9. Deuda visible: links subrayados en cards, H1 sin balance, números Syne 800, columna vacía en ancho, topbar pasiva, brand apretado.
10. Plan: shell plegable → modelo+lectura → reescritura por lotes → tags/nube → grafo → búsqueda/paleta → microinteracciones.

# Referencias (qué funciona, qué tomo, qué descarto)

## Quartz / Obsidian Publish
Funciona: grafo global y local como mapa mental, backlinks ("mencionada en"), preview al hover, URLs por nota.
Tomo: grafo local en el rail de lectura, backlinks, índice "En esta página" con scroll suave sin romper el hash-router.
Descarto: preview flotante al hover (coste móvil, poco valor con resúmenes ya visibles).

## maggieappleton.com (jardín digital)
Funciona: tono editorial, tarjetas por tema, taxonomía visible de jardín (semilla/brote/maduro), ilustraciones propias.
Tomo: tarjetas de sección con acento de color, etiquetas como taxonomía viva, nube de conceptos como puerta de entrada.
Descarto: sistema de estados de madurez (mis notas no lo declaran; inventarlo rompería fidelidad).

## notes.andymatuschak.org
Funciona: lectura enfocada, notas cortas muy enlazadas, cada nota respira, los enlaces invitan a seguir.
Tomo: columna de 68ch, "Seguí explorando" (relacionadas+backlinks+vecinas), modo lectura sin distracciones.
Descarto: notas atomizadas de un párrafo (las mías son fichas ricas; las presento por plantillas).

## gwern.net
Funciona: lectura larga seria, notas al margen, tabla de contenidos lateral, citas y referencias cuidadas.
Tomo: TOC sticky con scrollspy, bloque colapsable "Contenido original del vault" como aparato crítico, metadatos en mono.
Descarto: notas al margen flotantes (rompen el responsive; van inline como callouts).

## joshwcomeau.com
Funciona: microinteracciones con sentido (cada animación explica algo), juego + texto, accesibilidad cuidada.
Tomo: transiciones 150–250ms solo transform/opacity, stagger de entrada una sola vez, `prefers-reduced-motion` estricto, foco visible.
Descarto: widgets jugables pesados (el grafo interactivo ya cubre la cuota de juego).

## Linear / Vercel (fondos oscuros)
Funciona: rejilla sutil + luz ambiental que da profundidad sin competir con el texto, bordes con gradiente moderado.
Tomo: capas luz ambiente + red de ideas + grano + viñeta, todo fijo y pasivo, atenuado en lectura.
Descarto: beams animados intensos y blur grande en movimiento (rendimiento y distracción).

## are.na (bloques y conexiones)
Funciona: el contenido son bloques conectables, las conexiones son el contenido, explorar por vecindad.
Tomo: `aristas()` no dirigidas como modelo, página Explorar con tabs Conceptos|Grafo, etiquetas por co-ocurrencia.
Descarto: muros infinitos tipo masonry (la grilla editorial con cards uniformes lee mejor).

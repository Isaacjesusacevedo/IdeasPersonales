export type NoteTipo = 'articulo' | 'ficha' | 'coleccion' | 'proyecto' | 'indice'

export type NoteBlock =
  | { t: 'h2' | 'h3'; texto: string }
  | { t: 'p'; texto: string }
  | { t: 'lista'; items: string[]; ordenada?: boolean }
  | { t: 'card'; variante: 'definicion' | 'idea' | 'conclusion' | 'ejemplo'; titulo?: string; texto: string }
  | { t: 'desplegable'; titulo: string; bloques: NoteBlock[] }

export interface VaultNote {
  id: string
  titulo: string
  seccion: string
  categoria: string
  resumen: string
  puntos: string[]
  relaciones: string[]
  origen: string
  tipo?: NoteTipo
  intro?: string
  claves?: { termino: string; definicion: string }[]
  bloques?: NoteBlock[]
  tags?: string[]
}

export interface VaultSeccion {
  id: string
  nombre: string
  subtitulo: string
  descripcion: string
  acento?: 'purple' | 'teal' | 'mix'
}

export const secciones: VaultSeccion[] = [
  { id: 'yo', nombre: 'Yo', subtitulo: 'Perfil · Contacto · Trayectoria', descripcion: 'Quién soy: perfil dual operativo-técnico, experiencia en Toxic Shine y tutoría, formación Analista en Sistemas, stack y proyectos.', acento: 'purple' },
  { id: 'sistema', nombre: 'Sistema de Decisión', subtitulo: 'Consilium · Decisorium · Plan', descripcion: 'Cómo pienso y decido: kernel Consilium P1-P6, fork Decisorium matriz 5D, Plan en 3 pasadas y plantillas.', acento: 'teal' },
  { id: 'brownies', nombre: 'Proyecto Brownies', subtitulo: 'Palermo · MVP · Venta', descripcion: 'Emprendimiento en Palermo: ADN, OKR 100 u/sem, receta MVP, logística, precio, eventos, mapa y red de apoyo.', acento: 'mix' },
  { id: 'oxida', nombre: 'Proyecto Oxida', subtitulo: 'Resplandor Naranja · ARG', descripcion: 'Universo horror analógico: Resplandor vs Tenue Azul, Herederos, DAVA, Lucian, Descendiente, Capítulo I y ARG web.', acento: 'purple' },
  { id: 'mente', nombre: 'Biblioteca Mental', subtitulo: 'Sesgos · Paradigmas · Poder', descripcion: 'Cómo se deforma la lectura y cómo jugar el tablero: 13 sesgos, paradigmas, pensamientos rápidos, 48 leyes y Maquiavelo.', acento: 'teal' },
  { id: 'facultad', nombre: 'Facultad', subtitulo: '.NET · C# · ADO · SQL', descripcion: 'Apuntes técnicos de Análisis en Sistemas: interfaces, recursividad, lambdas, patrones, DI, ADO.NET, EF Core y Vue.', acento: 'mix' },
  { id: 'ideas', nombre: 'Ideas sueltas', subtitulo: 'Lectura rápida', descripcion: 'Capturas rápidas del día a día, sincronizadas con IDEAS.md.', acento: 'purple' }
]

export const notas: VaultNote[] = [
  // ── YO ──
  {
    id: 'yo-perfil', titulo: 'Perfil profesional', seccion: 'yo', categoria: 'Perfil', resumen: 'Estudiante avanzado Analista en Sistemas + 5 años de operaciones + desarrollo web full-stack.', puntos: ['Perfil dual conector operativo-técnico: monitoreo, inventarios, logística y desarrollo JS/Vue/React/Node/C#/SQL.', 'Operaciones: sistema propio de control en Excel avanzado que automatizó reportes manuales en Toxic Shine.', 'Desarrollo: frontend + backend + SQL + REST con foco en calidad, testing e ingeniería inversa pre-deploy.', 'Fortalezas: detalle, análisis, organización, comunicación técnica. Inglés B2.'], relaciones: ['yo-habilidades', 'yo-experiencia', 'yo-proyectos'], origen: 'Información Yo/Perfil profesional.md',
    tipo: 'ficha',
    intro: 'Perfil dual: operaciones y datos por un lado, desarrollo web full-stack por el otro, con base de Analista en Sistemas.',
    tags: ['trayectoria', 'operaciones', 'csharp'],
    claves: [
      { termino: 'Operaciones', definicion: 'Monitoreo de producción, inventario y logística; sistema propio de control en Excel avanzado que automatizó reportes manuales.' },
      { termino: 'Desarrollo', definicion: 'Frontend + backend + SQL + REST con foco en calidad, testing e ingeniería inversa pre-deploy.' },
      { termino: 'Fortalezas', definicion: 'Detalle, análisis, organización y comunicación técnica. Inglés B2.' }
    ]
  },
  {
    id: 'yo-contacto', titulo: 'Datos de contacto', seccion: 'yo', categoria: 'Contacto', resumen: 'Isaac Jesús Acevedo — José León Suárez, GBA. Email, tel, portfolio y GitHub.', puntos: ['Email isaac.acevedor1610@gmail.com · Tel +54 11 2729-8993.', 'Portfolio isaacjesusacevedo.github.io/portfolio · GitHub Isaacjesusacevedo.'], relaciones: ['yo-perfil'], origen: 'Información Yo/Datos de Contacto.md',
    tipo: 'articulo',
    intro: 'Cómo contactarme: email, teléfono, ubicación y enlaces.',
    tags: ['trayectoria']
  },
  {
    id: 'yo-experiencia', titulo: 'Experiencia laboral', seccion: 'yo', categoria: 'Trabajo', resumen: 'Toxic Shine (2021–hoy) encargado/supervisor + Tutoría Tupac Amaru (2023–2024).', puntos: ['Toxic Shine: monitoreo diario producción/inventario/logística, reportes semanales de cumplimiento y desvíos, sistema Excel VBA activo.', 'Tutor Programación: clases prácticas HTML/CSS/JS/Vue, revisión de código y debugging.', 'Puente operaciones↔código: validar datos, coordinar equipos, comparar períodos y KPIs.'], relaciones: ['yo-perfil', 'yo-habilidades'], origen: 'Información Yo/Experiencia laboral.md',
    tipo: 'articulo',
    intro: 'Dos etapas: operación y supervisión en Toxic Shine desde 2021, y tutoría de programación entre 2023 y 2024.',
    tags: ['trayectoria', 'operaciones'],
    bloques: [
      { t: 'h2', texto: 'Toxic Shine (2021–hoy)' },
      { t: 'p', texto: 'Monitoreo diario de producción, inventario y logística en grandes volúmenes bajo plazo, con reportes semanales de cumplimiento, desvíos y performance.' },
      { t: 'lista', items: ['Sistema propio de control en Excel VBA, hoy activo.', 'Validación y corrección de datos, coordinación multidisciplinaria y análisis comparativos por período.'] },
      { t: 'h2', texto: 'Tutoría Tupac Amaru (2023–2024)' },
      { t: 'p', texto: 'Clases prácticas de HTML, CSS, JS y Vue con proyectos reales, revisión de código, debugging y comunicación técnica clara.' },
      { t: 'p', texto: 'El puente entre ambos mundos está descrito en [[yo-perfil]].' }
    ]
  },
  {
    id: 'yo-educacion', titulo: 'Educación', seccion: 'yo', categoria: 'Estudio', resumen: 'Analista en Sistemas 3er año (Tupac Amaru) + curso web 6 meses + secundaria completa.', puntos: ['Terciario en curso desde 2023, compatibilizado con full-time y tutoría.', 'Curso Creación Páginas Web: HTML semántico, CSS Flex/Grid, JS DOM, a11y, Git y deploy.', 'Secundaria: Bachiller ES N°9 María G. de Galvagno.'], relaciones: ['fac-parcial', 'fac-guia-net'], origen: 'Información Yo/Educación.md',
    tipo: 'articulo',
    intro: 'Formación en curso (Analista en Sistemas, 3er año) más un curso web de 6 meses y la secundaria completa.',
    tags: ['trayectoria', 'programacion'],
    bloques: [
      { t: 'h2', texto: 'Terciario' },
      { t: 'p', texto: 'Analista en Sistemas en curso desde 2023, compatibilizado con full-time y tutoría.' },
      { t: 'h2', texto: 'Curso web (6 meses)' },
      { t: 'p', texto: 'Creación de Páginas Web: HTML semántico, CSS Flex/Grid, JS con DOM y eventos, accesibilidad, Git y deploy.' },
      { t: 'h2', texto: 'Secundaria' },
      { t: 'p', texto: 'Bachiller en la ES N°9 María G. de Galvagno, completo.' },
      { t: 'p', texto: 'Apuntes de la carrera en [[fac-parcial]] y [[fac-guia-net]].' }
    ]
  },
  {
    id: 'yo-habilidades', titulo: 'Habilidades técnicas', seccion: 'yo', categoria: 'Stack', resumen: 'JS/Vue fuerte, React, HTML/CSS, C#/.NET, SQL Server, REST, Git, Scrum y calidad.', puntos: ['Lenguajes: JavaScript sólido, Vue fuerte, React, C#/.NET intermedio con capas y SOLID.', 'Datos/APIs: SQL Server, stored procedures, REST/JSON, fetch/axios, Postman, async y manejo de errores.', 'Agile/calidad: Git branching/PR, Scrum/Kanban, tests unitarios y funcionales, debugging e ingeniería inversa.'], relaciones: ['yo-proyectos', 'fac-demoado'], origen: 'Información Yo/Habilidades técnicas.md',
    tipo: 'ficha',
    intro: 'Stack de lenguajes, datos, versionado y calidad, con idiomas.',
    tags: ['csharp', 'sql', 'programacion', 'testing'],
    claves: [
      { termino: 'Lenguajes', definicion: 'JavaScript sólido, Vue fuerte, React, HTML5/CSS3 y C#/.NET intermedio con capas y SOLID.' },
      { termino: 'Datos y APIs', definicion: 'SQL Server con stored procedures, REST/JSON con fetch/axios, Postman y manejo de errores async.' },
      { termino: 'Calidad', definicion: 'Tests unitarios y funcionales, debugging e ingeniería inversa pre-deploy; Git con branching y PR.' }
    ]
  },
  {
    id: 'yo-proyectos', titulo: 'Proyectos personales', seccion: 'yo', categoria: 'Portfolio', resumen: 'Orange-Blue, Sistema Académico, Librerías, Galones Excel y portfolio full-stack.', puntos: ['Orange-Blue: web Vue+TS con visibilidades dinámicas y testing funcional.', 'Sistemas de consola C# en 3 capas con JSON y SOLID.', 'Gestión Área Galones: Excel VBA en uso real que reemplazó planillas manuales.', 'Método: interfaces → APIs → Kanban/Git → testing exhaustivo pre-deploy.'], relaciones: ['oxi-web-arg', 'fac-info-academica'], origen: 'Información Yo/Proyectos personales.md',
    tipo: 'proyecto',
    intro: 'Cinco proyectos que muestran el método: interfaces, APIs, Kanban y testing antes del deploy.',
    tags: ['csharp', 'programacion'],
    bloques: [
      { t: 'h2', texto: 'Proyectos' },
      { t: 'lista', items: ['Orange-Blue: web Vue+TS con visibilidades dinámicas y testing funcional.', 'Sistemas de consola C# en 3 capas con JSON y SOLID.', 'Gestión Área Galones: Excel VBA en uso real que reemplazó planillas manuales.'] },
      { t: 'h2', texto: 'Método' },
      { t: 'p', texto: 'Interfaces → APIs → Kanban/Git → testing exhaustivo pre-deploy.' },
      { t: 'p', texto: 'La web ARG del Proyecto Oxida usa este mismo stack: [[oxi-web-arg]].' }
    ]
  },

  // ── SISTEMA ──
  {
    id: 'sis-consilium', titulo: 'Consilium — Kernel', seccion: 'sistema', categoria: 'Núcleo', resumen: 'Única fuente de verdad: rampa 60s, umbral 0.5, tabla de activación y principios P1-P6.', puntos: ['Clasifica cada consulta en Simple / Contextual / Compleja para no sobre-analizar.', 'Tabla de Activación con 11 disparadores (Lu, brownie, cliente, CV, sesgo, poder…) → archivo exacto.', 'P1 Observador Invisible · P2 Homo Homini Lupus · P3 Virtù vs Fortuna · P4 Velo · P5 Príncipe y Aliados · P6 Mínima Exposición.', 'Flujo en 7 pasos + registro de casos. No dice qué hacer, dice cómo actuar.'], relaciones: ['sis-decisorium', 'sis-plan', 'sis-integracion'], origen: 'Consilium.md',
    tipo: 'articulo',
    intro: 'El kernel operativo: rampa de 60 segundos, tabla de activación y seis principios para actuar sin sobre-analizar.',
    tags: ['decision', 'poder', 'principios'],
    bloques: [
      { t: 'h2', texto: 'Cómo clasifica' },
      { t: 'p', texto: 'Rampa de 60 segundos + Filtro de Umbral 0.5: cada consulta cae en Simple, Contextual o Compleja.' },
      { t: 'h2', texto: 'Tabla de Activación' },
      { t: 'p', texto: 'Once disparadores (Lu, brownie, cliente, CV, sesgo, poder…) apuntan al archivo exacto a cargar.' },
      { t: 'h2', texto: 'Principios P1-P6' },
      { t: 'lista', items: ['P1 Observador Invisible · P2 Homo Homini Lupus · P3 Virtù vs Fortuna.', 'P4 Velo · P5 Príncipe y Aliados · P6 Mínima Exposición.'] },
      { t: 'p', texto: 'Flujo en 7 pasos + registro de casos. No dice qué hacer, dice cómo actuar.' },
      { t: 'p', texto: 'La decisión previa vive en [[sis-decisorium]] y el método completo en [[sis-plan]].' }
    ]
  },
  {
    id: 'sis-decisorium', titulo: 'Decisorium — Qué hacer', seccion: 'sistema', categoria: 'Decisión', resumen: 'Pre-Consilium: fork A/B/C, matriz 5D ponderada y filtro de recursividad.', puntos: ['Score = B*0.30 + (11-R)*0.25 + (11-C)*0.20 + V*0.15 + A*0.10.', 'Regla: siempre 3 opciones; si ves 2, la tercera es no hacer nada.', 'Ejemplos resueltos: proveedor +15%, sociedad 50/50 con Lu, alfajores vs brownies.', 'Salida: una opción + justificación → pasa a Consilium para ejecución.'], relaciones: ['sis-consilium', 'sis-plantilla-fork'], origen: 'Decisorium.md',
    tipo: 'articulo',
    intro: 'La capa previa: decide qué hacer con fork de 3 opciones, matriz 5D y filtro de recursividad, antes de pasar a Consilium.',
    tags: ['decision', 'matriz', 'evaluacion'],
    bloques: [
      { t: 'h2', texto: 'La matriz 5D' },
      { t: 'card', variante: 'definicion', titulo: 'La fórmula', texto: '`Score = (B×0.30) + ((11-R)×0.25) + ((11-C)×0.20) + (V×0.15) + (A×0.10)`, con Beneficio, Riesgo, Costo, reversibilidad (V) y Alineación.' },
      { t: 'h2', texto: 'Reglas' },
      { t: 'lista', items: ['Siempre 3 opciones; si ves 2, la tercera es no hacer nada.', 'Filtro de recursividad: si falla, ¿se deshace? ¿cómo?'] },
      { t: 'h2', texto: 'Ejemplos resueltos' },
      { t: 'lista', items: ['Proveedor +15% → gana B.', 'Lu pide 50/50 → gana A.', 'Alfajores vs brownies → gana A, foco 100 u/sem.'] },
      { t: 'p', texto: 'Salida: una opción + justificación. La ficha para aplicarlo está en [[sis-plantilla-fork]] y la ejecución en [[sis-consilium]].' }
    ]
  },
  {
    id: 'sis-index', titulo: 'Index Generalis — Mapa', seccion: 'sistema', categoria: 'Mapa', resumen: 'Mapa estructural del vault: 76 archivos, árbol, 47 vínculos y diagramas Mermaid.', puntos: ['Secciones raíz + 9 carpetas con etiquetas y estados.', 'Detecta 1 enlace frágil en Parci por guion corto vs largo.', '3 diagramas: Sistema Núcleo, Proyecto Brownies, Dominios Conocimiento.'], relaciones: ['sis-integracion', 'sis-consilium'], origen: 'Index_Generalis.md',
    tipo: 'indice',
    intro: 'El mapa estructural del vault: árbol, vínculos, diagramas y mantenimiento.',
    tags: ['mapas', 'nucleo', 'estructura'],
    bloques: [
      { t: 'h2', texto: 'Qué contiene' },
      { t: 'lista', items: ['Árbol de secciones raíz + 9 carpetas con etiquetas y estados.', '47 vínculos internos válidos y 1 enlace frágil detectado en Parci.', '3 diagramas: Sistema Núcleo, Proyecto Brownies y Dominios Conocimiento.'] },
      { t: 'p', texto: 'Cómo se conectan los dominios está en [[sis-integracion]].' }
    ]
  },
  {
    id: 'sis-integracion', titulo: 'Integración Total — Señales', seccion: 'sistema', categoria: 'Mapa', resumen: 'Matriz de 11 dominios + sistema de señales calientes/tibias/frías y rutas críticas.', puntos: ['Calientes semanales: Consilium, Decisorium, Plan, Consolidado, Log, Luciano, Locales.', 'Flujo: disparador → dominio → fork 5D → Consilium P1-P6.', 'Rutas copiar-pegar para brownies, negociación y CV.'], relaciones: ['sis-consilium', 'bro-consolidado', 'bro-log'], origen: 'Integración_Total.md',
    tipo: 'indice',
    intro: 'Once dominios conectados: qué aporta cada uno, señales calientes y tibias, y rutas críticas.',
    tags: ['nucleo', 'mapas', 'estructura'],
    bloques: [
      { t: 'h2', texto: 'Señales' },
      { t: 'lista', items: ['Calientes semanales: Consilium, Decisorium, Plan, Consolidado, Log, Luciano y Locales.', 'Flujo: disparador → dominio → fork 5D → Consilium P1-P6.', 'Rutas copiar-pegar para brownies, negociación y CV.'] },
      { t: 'p', texto: 'La tabla única de activación vive en [[sis-consilium]] y el estado del proyecto en [[bro-consolidado]].' }
    ]
  },
  {
    id: 'sis-plan', titulo: 'Plan — 3 pasadas', seccion: 'sistema', categoria: 'Método', resumen: 'No es lista de respuestas: pasada 1 sesgos, 2 poder, 3 paradigma. Salida: ficha de 1 página.', puntos: ['P1 Sesgos: ¿qué quiero creer? ¿autoridad falsa? ¿exceso de confianza?', 'P2 Poder: quién tiene poder real, qué oculta, timing actuar/esperar/retirarse.', 'P3 Paradigma: elegir lente útil, no verdadero; validar con acción pequeña.', 'Uso inverso: aplicar sesgos para comunicar y vender.'], relaciones: ['men-indice-sesgos', 'men-leyes', 'men-paradigmas'], origen: 'Plan/Plan.md',
    tipo: 'articulo',
    intro: 'Tres pasadas para decidir la jugada: limpiar sesgos, leer el poder y elegir el lente. Salida: ficha de 1 página.',
    tags: ['decision', 'poder', 'metodo'],
    bloques: [
      { t: 'h2', texto: 'Pasada 1 — Sesgos' },
      { t: 'p', texto: '¿Qué quiero creer? ¿Autoridad falsa? ¿Exceso de confianza? Los sesgos nunca deciden al final.' },
      { t: 'h2', texto: 'Pasada 2 — Poder' },
      { t: 'p', texto: 'Quién tiene poder real, qué oculta, de qué depende; timing para actuar, esperar o retirarse.' },
      { t: 'h2', texto: 'Pasada 3 — Paradigma' },
      { t: 'p', texto: 'Elegir el lente útil, no el verdadero; validar con una acción pequeña.' },
      { t: 'card', variante: 'idea', titulo: 'Uso inverso', texto: 'Aplicar sesgos para comunicar y vender.' },
      { t: 'p', texto: 'Los lentes están en [[men-paradigmas]], los sesgos en [[men-indice-sesgos]] y el tablero en [[men-leyes]].' }
    ]
  },
  {
    id: 'sis-plantilla-persona', titulo: 'Plantilla Análisis de Persona', seccion: 'sistema', categoria: 'Plantilla', resumen: 'Clasifica Aliado / Lastre / Peligro con P1-P6 antes de invertir en alguien.', puntos: ['P1 hechos duros · P2 interés declarado vs probable · P3 ventana temporal.', 'P4 velo discurso vs lógica · P5 veredicto + inversión · P6 una acción con canal y deadline.'], relaciones: ['sis-consilium', 'con-luciano'], origen: 'Plantillas/Plantilla_Analisis_de_Persona.md',
    tipo: 'articulo',
    intro: 'Antes de invertir en alguien: clasificar Aliado, Lastre o Peligro con P1-P6.',
    tags: ['plantillas', 'principios', 'poder', 'metodo'],
    bloques: [
      { t: 'h2', texto: 'La grilla P1-P6' },
      { t: 'lista', items: ['P1 hechos duros · P2 interés declarado vs probable · P3 ventana temporal.', 'P4 velo discurso vs lógica · P5 veredicto + inversión · P6 una acción con canal y deadline.'] },
      { t: 'p', texto: 'Notas post: resultado, desviación y próximo paso.' },
      { t: 'p', texto: 'El marco para leer intenciones está en [[men-principe]] y el kernel en [[sis-consilium]].' }
    ]
  },
  {
    id: 'sis-plantilla-fork', titulo: 'Plantilla Fork Decisorium', seccion: 'sistema', categoria: 'Plantilla', resumen: 'Situación en 2 líneas → 3 opciones → matriz B/R → filtro recursividad → selección.', puntos: ['Tabla beneficio/riesgo/costo/reversibilidad/alineación + ratio B÷R.', 'Filtro: si falla, ¿se deshace en X días? ¿cómo?', 'Pase a Consilium con principios, primer paso y fecha de revisión.'], relaciones: ['sis-decisorium'], origen: 'Plantillas/Plantilla_Fork_Decisorium.md',
    tipo: 'articulo',
    intro: 'Antes de una decisión con impacto: situación en 2 líneas, 3 opciones, matriz y filtro.',
    tags: ['plantillas', 'matriz', 'decision', 'evaluacion'],
    bloques: [
      { t: 'h2', texto: 'La ficha' },
      { t: 'lista', items: ['Tabla beneficio/riesgo/costo/reversibilidad/alineación + ratio B÷R.', 'Filtro: si falla, ¿se deshace en X días? ¿cómo?', 'Pase a Consilium con principios, primer paso y fecha de revisión.'] },
      { t: 'p', texto: 'Viene de [[sis-decisorium]].' }
    ]
  },

  // ── BROWNIES ──
  { id: 'bro-adn', titulo: 'ADN del Brownie', seccion: 'brownies', categoria: 'Visión', resumen: 'Artesanal, belga, húmedo dentro + crocante fuera, para after-office. No somos precio ni panadería.', puntos: ['Diferenciación: textura + chocolate belga + presentación instagrameable.', 'Momento: antojo 5pm y after-office. NO: abuela, barato, genérico.'], relaciones: ['bro-okr', 'bro-fase1'], origen: 'Plan/01_Vision_y_Objetivos/ADN_del_Brownie.md' },
  { id: 'bro-okr', titulo: 'OKR 3 meses — 100 u/sem', seccion: 'brownies', categoria: 'Objetivos', resumen: '100 u/semana en Palermo con 30% recurrentes al mes 3. Revisión domingos vs Log.', puntos: ['Mes1 20u/5% cata · Mes2 50u/15% canales · Mes3 100u/30% escalar.', 'KR: volumen, recurrencia, presencia Soho/Hollywood.'], relaciones: ['bro-log', 'bro-eventos'], origen: 'Plan/01_Vision_y_Objetivos/OKR_Brownies_3_meses.md' },
  { id: 'bro-acuerdo', titulo: 'Acuerdo con socio', seccion: 'brownies', categoria: 'Sociedad', resumen: 'Roles, reparto, horarios y conflictos por escrito. Si no está escrito, no existe.', puntos: ['Cocina / ventas / redes por definir responsable.', 'Reglas: % reparto, última palabra, resolución de conflictos, firma con fecha.'], relaciones: ['con-luciano', 'bro-okr'], origen: 'Plan/01_Vision_y_Objetivos/Acuerdo_con_Socio.md' },
  { id: 'bro-fase1', titulo: 'Fase 1 — Receta MVP', seccion: 'brownies', categoria: 'Producto', resumen: 'Cata ciega A/B/C con 10 personas y puntaje 1-10. La ganadora = Receta Base.', puntos: ['Variables controladas, no intuición. Registrar todo en Log.', 'Mide humedad, intensidad, dulzor y crocancia.'], relaciones: ['bro-log', 'bro-eventos'], origen: 'Plan/02_Proyectos_Activos/Brownie_Project/Fase_1_Receta_MVP.md' },
  { id: 'bro-fase2', titulo: 'Fase 2 — Logística y packaging', seccion: 'brownies', categoria: 'Operación', resumen: 'Palermo instagrameable = moneda. Kraft + sello, delivery 19-21h, checklist de salida.', puntos: ['Pedidos hasta 18h, rapidez como diferenciador.', 'Bolso térmico, cambio chico, stock verificado, envases con logo.'], relaciones: ['bro-fase3', 'bro-mapa'], origen: 'Plan/02_Proyectos_Activos/Brownie_Project/Fase_2_Logistica_y_Embalaje.md' },
  { id: 'bro-fase3', titulo: 'Fase 3 — Precio y canales', seccion: 'brownies', categoria: 'Ventas', resumen: 'Precio = (MP + hora + delivery) x3. Cara a cara, WhatsApp, consignación 20% e IG.', puntos: ['Referencia Palermo $1500-2500. Promos: mini-trozo + fidelidad 5ta caja.', 'Canal principal: probar sin presión → encargo → comunidad.'], relaciones: ['con-locales', 'bro-protocolo-venta'], origen: 'Plan/02_Proyectos_Activos/Brownie_Project/Fase_3_Precio_y_Canales.md' },
  { id: 'bro-eventos', titulo: 'Eventos y lanzamiento', seccion: 'brownies', categoria: 'Lanzamiento', resumen: 'Calidad sobre cantidad: cata día 30 → preview día 75 → ruta semanal jueves+sábado.', puntos: ['Evento1: 6-8 amigos gratis + pregunta ¿comprarías caja de 6?', 'Evento2: pop-up Plazoleta Cortázar 40 unidades + preventa WhatsApp.', 'Evento3: mensaje miércoles, hornear solo lo encargado, cero desperdicio.'], relaciones: ['bro-clientes-semilla', 'bro-mapa'], origen: 'Plan/02_Proyectos_Activos/Brownie_Project/Plan_de_Eventos_y_Lanzamiento.md' },
  { id: 'bro-calendario', titulo: 'Calendario y cuenta regresiva', seccion: 'brownies', categoria: 'Cultivo', resumen: '55 días floración + secado + curado. 8 semanas para dominar línea común. Solo común a la venta.', puntos: ['Hitos +55 corte, +62 secado, +72 curado, +73 infusión.', 'Nota legal: Ley 27.350/Reprocann cubre personal; venta abierta = solo común.'], relaciones: ['bro-protocolo-manteca', 'bro-errores'], origen: 'Plan/02_Proyectos_Activos/Brownie_Project/Calendario_y_Cuenta_Regresiva.md' },
  { id: 'bro-protocolo-manteca', titulo: 'Protocolo manteca infusionada', seccion: 'brownies', categoria: 'Técnica', resumen: 'Estándar 5 fases sin hervir: secado, water curing frío, descarboxilación, infusión, purificación.', puntos: ['110-115°C 35min obligatorio · infusión 80-85°C baño María con termómetro.', 'Manteca 82% o coco, nunca leche. Checklist por responsable.'], relaciones: ['bro-errores', 'con-luciano'], origen: 'Plan/02_Proyectos_Activos/Brownie_Project/Protocolo_Manteca_Infusionada.md' },
  { id: 'bro-errores', titulo: 'Errores críticos de procesamiento', seccion: 'brownies', categoria: 'Técnica', resumen: '5 errores que arruinan potencia/sabor y su corrección exacta.', puntos: ['No hervir flor · no usar leche · descarboxilar siempre · no pasar 100°C · no secar en horno.'], relaciones: ['bro-protocolo-manteca'], origen: 'Plan/02_Proyectos_Activos/Brownie_Project/Errores_Criticos_Procesamiento.md' },
  { id: 'bro-clientes-semilla', titulo: 'Clientes semilla', seccion: 'brownies', categoria: 'Clientes', resumen: 'Probaron en evento y pidieron repetir: tratar como socios, contacto solo 24h antes.', puntos: ['Tabla nombre/WhatsApp/preferencia/frecuencia/recordatorio.', 'Repetición = métrica clave. Consignación → ficha en Clientes Clave.'], relaciones: ['bro-log', 'con-clientes'], origen: 'Plan/02_Proyectos_Activos/Brownie_Project/Clientes_Semilla.md' },
  { id: 'bro-consolidado', titulo: 'Documento consolidado', seccion: 'brownies', categoria: 'Índice', resumen: 'Índice-resumen de todo el proyecto: visión, fases, contexto, decisiones, modelos y estado día 1.', puntos: ['Replica ADN, OKR, cronograma, eventos y acción inmediata Gurruchaga/Honduras.', 'Estado: día 1 cultivo, 8 semanas de espera, venta = línea común.'], relaciones: ['sis-integracion', 'bro-accion'], origen: 'Plan/02_Proyectos_Activos/Brownie_Project/Consolidado_Del_Proyecto.md' },
  { id: 'bro-accion', titulo: 'Acción inmediata — sábado Palermo', seccion: 'brownies', categoria: 'Acción', resumen: 'Cata + 20 brownies sábado 17h Gurruchaga y Honduras, outfit definido, registrar en Log.', puntos: ['2 días cata a ciegas · logo simple · nombres: Bunker / Dulce Poder / Bloque.', 'Actitud de favor, no miedo. Foto primera venta a IG/WhatsApp.'], relaciones: ['bro-log', 'bro-checklist'], origen: 'Plan/Accion_Inmediata.md' },
  { id: 'bro-mapa', titulo: 'Mapa de Palermo', seccion: 'brownies', categoria: 'Territorio', resumen: '4 microclimas: Soho turista, Hollywood oficinista, Parques familia, Oficinas delivery.', puntos: ['Recorrer cada zona, marcar circulación alta, registrar cada salida en Log.'], relaciones: ['bro-log', 'bro-eventos'], origen: 'Plan/03_Contexto_y_Paradigmas/Mapa_de_Palermo.md' },
  { id: 'bro-paradigma', titulo: 'Paradigma del emprendedor', seccion: 'brownies', categoria: 'Mentalidad', resumen: 'De convencer (presión) a servir (aliado): resolver el antojo 5pm.', puntos: ['Combos café, hora dorada after-office, mensajes del momento.', 'Revisión mensual: ¿vendí desde convencimiento o servicio?'], relaciones: ['men-paradigmas', 'bro-protocolo-venta'], origen: 'Plan/03_Contexto_y_Paradigmas/Paradigma_del_Emprendedor.md' },
  { id: 'bro-log', titulo: 'Log de ventas y feedback', seccion: 'brownies', categoria: 'Ritual', resumen: 'SAGRADO: ubicación, hora, clima y frase textual. El negativo = oro. Revisión domingo.', puntos: ['Prohibido ¿te gustó? → ¿qué mejorarías? / ¿por qué NO lo comprarías?', 'Registrar el mismo día, textual, sin interpretar. Catas A/B/C documentadas.'], relaciones: ['bro-protocolo-venta', 'con-clientes'], origen: 'Plan/04_Decisiones_y_Revisiones/Log_de_Ventas_y_Feedback.md' },
  { id: 'bro-checklist', titulo: 'Checklist imagen personal', seccion: 'brownies', categoria: 'Ritual', resumen: 'Casual premium Palermo: blancas limpias, jean oscuro, remera lisa, delantal de tela.', puntos: ['Manos miran: uñas, mentitas, cabello. Espejo + logo visible + cambio + stock.'], relaciones: ['bro-accion'], origen: 'Plan/04_Decisiones_y_Revisiones/Checklist_Imagen_Personal.md' },
  { id: 'bro-protocolo-venta', titulo: 'Protocolo venta cara a cara', seccion: 'brownies', categoria: 'Ventas', resumen: 'Guion 30s con reciprocidad: mini-trozo gratis → caja lanzamiento → sin compromiso.', puntos: ['70% compra con reciprocidad. Mirar, sonreír, esperar, aceptar el no.', 'Postventa: agradecer, fidelidad, feedback abierto, registrar, fichar prescriptor.'], relaciones: ['bro-log', 'men-plan-venta'], origen: 'Plan/04_Decisiones_y_Revisiones/Protocolo_De_Venta_Cara_a_Cara.md' },
  { id: 'bro-competencia', titulo: 'Competencia directa', seccion: 'brownies', categoria: 'Mercado', resumen: 'Mapear 5 lugares: precio, tamaño, packaging, atención y textura. Actualizar cada 2-3 meses.', puntos: ['Si secos→textura · feos→packaging · caros→valor · lentos→rapidez.'], relaciones: ['bro-fase3'], origen: 'Plan/05_Bateria_de_Ideas_y_Modelos/Competencia_Directa.md' },
  { id: 'bro-sesgos-palermo', titulo: 'Sesgos del cliente palermitano', seccion: 'brownies', categoria: 'Psicología', resumen: 'Escasez real, bandwagon diario, aversión a la pérdida y reciprocidad sin manipulación.', puntos: ['Solo 30 cajas hoy · foto primera caja volando · 5ta extra para no perder.', 'Mini-trozo, compromiso y prueba social con clientes contentos.'], relaciones: ['men-indice-sesgos', 'bro-protocolo-venta'], origen: 'Plan/05_Bateria_de_Ideas_y_Modelos/Sesgos_del_Cliente_Palermitano.md' },
  { id: 'con-luciano', titulo: 'Base fundacional — Luciano', seccion: 'brownies', categoria: 'Sociedad', resumen: 'Yo capital + él trabajo. 70/30 hasta recuperar → 50/50. Corte cada 15 días, llamada domingos 20h.', puntos: ['Yo finanzas/marketing · Luciano Maestro Browniero, autoridad del horno.', 'Alcancía compartida + planilla. Plan A/B según quién vende. Salida digna si consigue fijo.'], relaciones: ['bro-acuerdo', 'sis-plantilla-persona'], origen: 'Conexiones/Base_Fundacional_Luciano.md' },
  { id: 'con-clientes', titulo: 'Clientes clave', seccion: 'brownies', categoria: 'Red', resumen: 'Solo feedback inteligente o prescriptores. Frases textuales, ficha con próximo paso.', puntos: ['Dueña cafetería con comisión = ejemplo de prescriptor.', 'Tabla de prescriptores + historial + próximo paso.'], relaciones: ['bro-clientes-semilla', 'bro-log'], origen: 'Conexiones/Clientes_Clave.md' },
  { id: 'con-locales', titulo: 'Locales amigos', seccion: 'brownies', categoria: 'Red', resumen: 'Kioscos/cervecerías/coworkings con consignación 20%, reposición y packaging con logo.', puntos: ['Dejar caja, 20%, pagar puntual, agradecer en IG, stock actualizado.'], relaciones: ['bro-fase3'], origen: 'Conexiones/Locales_Amigos.md' },
  { id: 'con-proveedores', titulo: 'Proveedores', seccion: 'brownies', categoria: 'Red', resumen: 'Chocolatero Barracas + almacén harina. Comparar 2 por insumo, respaldo por crítico.', puntos: ['Precio actualizado cada compra. Tabla proveedor/producto/precio/calidad.'], relaciones: ['bro-fase3'], origen: 'Conexiones/Proveedores.md' },

  // ── OXIDA ──
  {
    id: 'oxi-indice', titulo: 'Índice — Resplandor Naranja', seccion: 'oxida', categoria: 'Mapa', resumen: 'Puerta de entrada: Resplandor (cortafuegos) vs Tenue Azul, herederos, DAVA y credenciales.', puntos: ['Lucian nº1 (312 a.C.) → Descendiente nº16 (Bs.As. 2025) → Investigador I desaparecido.', 'Símbolos ΘΕΟΣ ὉΡΑΣΕΙΣ ὙΕΤΟΣ ΑἾΜΑ ΛΑΚΚΟΣ ὌΡΟΣ ΤΕΦΡΑ ΦΩΣ · SoloLaSangreLlama / 1652.'], relaciones: ['oxi-resplandor', 'oxi-tenue', 'oxi-dava'], origen: 'Proyecto Oxida/Índice.md',
    tipo: 'indice',
    intro: 'La puerta de entrada: dos entidades, herederos numerados, DAVA y unas credenciales.',
    tags: ['resplandor', 'dava', 'herederos', 'indice'],
    bloques: [
      { t: 'h2', texto: 'El reparto' },
      { t: 'lista', items: ['Resplandor Naranja (cortafuegos) contra Tenue Azul (continuación).', 'Lucian nº1 (312 a.C.) → Descendiente nº16 (Bs.As. 2025) → Investigador I desaparecido.', 'DAVA guía al Heredero porque necesita que llegue.'] },
      { t: 'h2', texto: 'Claves' },
      { t: 'p', texto: 'Símbolos griegos, credenciales `SoloLaSangreLlama` / `1652` y el lema `Vince insaniam`.' },
      { t: 'p', texto: 'Las entidades, en [[oxi-resplandor]] y [[oxi-tenue]].' }
    ]
  },
  {
    id: 'oxi-notas-autor', titulo: 'Notas del autor — 2 ejes', seccion: 'oxida', categoria: 'Diseño', resumen: 'Eje I incomprensibilidad + Eje II eternidad. Sin buenos ni malos. Efectos Mandela = ediciones.', puntos: ['DAVA gestiona qué realidad existe; I sabotea con el protagonista futuro (Memorial).', 'Nunca explicar ejes, ni mostrar cara del Resplandor, ni humanizarlo.'], relaciones: ['oxi-analisis', 'oxi-horror'], origen: 'Proyecto Oxida/Notas del Autor.md',
    tipo: 'articulo',
    intro: 'Las reglas internas del worldbuilding: dos ejes del horror y cero moral.',
    tags: ['diseno', 'horror', 'reglas'],
    bloques: [
      { t: 'h2', texto: 'Los dos ejes' },
      { t: 'lista', items: ['Eje I: incomprensibilidad categórica, nunca mirar el cielo de frente.', 'Eje II: eternidad, millones de años en 1 segundo narrados solo desde afuera.'] },
      { t: 'h2', texto: 'Regla moral' },
      { t: 'p', texto: 'No hay buenos ni malos: DAVA, Investigador I, la guía, el Resplandor y el Heredero actúan por interés propio.' },
      { t: 'h2', texto: 'Prohibiciones' },
      { t: 'p', texto: 'Nunca explicar ejes, ni mostrar cara del Resplandor, ni humanizarlo.' },
      { t: 'p', texto: 'La hoja de ruta en [[oxi-analisis]] y el marco de género en [[oxi-horror]].' }
    ]
  },
  {
    id: 'oxi-analisis', titulo: 'Análisis del proyecto + roadmap', seccion: 'oxida', categoria: 'Diseño', resumen: 'Cap I es lo más fuerte. Falta Cap II y Eje II en prosa. Fases 1 consolidar, 2 horror, 3 expandir.', puntos: ['Completar Descendiente, fichas Resplandor/Tenue, mapa con grises.', 'Horror: mundanidad corrupta + burocracia que necesita que el horror continúe.'], relaciones: ['oxi-notas-autor', 'oxi-capitulo'], origen: 'Proyecto Oxida/Análisis del Proyecto.md',
    tipo: 'articulo',
    intro: 'Diagnóstico: el Capítulo I es lo más fuerte; falta el II y el Eje II en prosa.',
    tags: ['diseno', 'horror', 'reglas'],
    bloques: [
      { t: 'h2', texto: 'Falta' },
      { t: 'lista', items: ['Completar El Descendiente y escribir el Capítulo II.', 'Implementar el Eje II en prosa y completar fichas con grises.'] },
      { t: 'h2', texto: 'Terror' },
      { t: 'p', texto: 'Mundanidad corrupta + burocracia que necesita que el horror continúe.' },
      { t: 'p', texto: 'Bases en [[oxi-notas-autor]] y primer capítulo en [[oxi-capitulo]].' }
    ]
  },
  {
    id: 'oxi-horror', titulo: 'Horror analógico — marco', seccion: 'oxida', categoria: 'Género', resumen: 'Documental que se comporta mal: 4 pilares, wrong turn +10%, dos registros y paleta naranja/azul.', puntos: ['Mundanidad corrupta · arquitectura ausencia · burocracia contenedor · horror eternidad.', 'Sonoro 17-23Hz + Silencio Urbano. Referentes: Mandela, Local58, SCP, Archive 81.'], relaciones: ['oxi-capitulo', 'oxi-informe'], origen: 'Proyecto Oxida/Horror Analógico — Marco de Diseño.md',
    tipo: 'articulo',
    intro: 'Documental que se comporta mal: cuatro pilares, giro gradual y dos registros.',
    tags: ['diseno', 'horror'],
    bloques: [
      { t: 'h2', texto: 'Los 4 pilares' },
      { t: 'lista', items: ['Mundanidad corrupta · arquitectura ausencia · burocracia contenedor · horror eternidad.'] },
      { t: 'h2', texto: 'Sonido y referentes' },
      { t: 'p', texto: 'Zumbido 17-23Hz + Silencio Urbano. Referentes: Mandela, Local58, SCP, Archive 81.' },
      { t: 'p', texto: 'Aplicado en [[oxi-capitulo]] y en el documento [[oxi-informe]].' }
    ]
  },
  {
    id: 'oxi-resplandor', titulo: 'Resplandor Naranja — entidad', seccion: 'oxida', categoria: 'Lore', resumen: 'No criatura: anticuerpo que procesa variabilidad humana con bucles. No juzga, procesa.', puntos: ['Cielo naranja sin sombras, relojes detenidos, lluvias sangre, animales sincronizados.', 'Voces hostiles (rechazo) vs guía Creo en ti (filtración Tenue Azul).', 'No puede: procesar heredero con Tenue, ni borrar memoria documentada.'], relaciones: ['oxi-tenue', 'oxi-herederos'], origen: 'Proyecto Oxida/Resplandor Naranja.md',
    tipo: 'articulo',
    intro: 'No una criatura: un anticuerpo que procesa la variabilidad humana con bucles.',
    tags: ['resplandor', 'entidad'],
    bloques: [
      { t: 'h2', texto: 'Manifestaciones' },
      { t: 'lista', items: ['Cielo naranja sin sombras, relojes detenidos, lluvias de sangre y animales sincronizados.'] },
      { t: 'h2', texto: 'Voces y límites' },
      { t: 'lista', items: ['Voces hostiles de rechazo contra la guía `Creo en ti` (filtración Tenue Azul).', 'No puede: procesar heredero con Tenue, ni borrar memoria documentada.'] },
      { t: 'p', texto: 'Su contraparte en [[oxi-tenue]] y quienes lo perciben en [[oxi-herederos]].' }
    ]
  },
  {
    id: 'oxi-tenue', titulo: 'Tenue Azul — contrafuerza', seccion: 'oxida', categoria: 'Lore', resumen: 'Impulso a continuar el tiempo. Débil pero ineliminable. En bordes nacen Herederos.', puntos: ['Da déjà vu y reconocimiento sin memoria. No elige herederos.', 'Pozo de luz azul: aislante infiltrado que Lucian creyó salida.'], relaciones: ['oxi-resplandor', 'oxi-herederos'], origen: 'Proyecto Oxida/Tenue Azul.md',
    tipo: 'articulo',
    intro: 'La contrafuerza: impulso a continuar el tiempo, débil pero ineliminable.',
    tags: ['resplandor', 'herederos', 'entidad'],
    bloques: [
      { t: 'h2', texto: 'Efecto' },
      { t: 'p', texto: 'Filtra la conexión colmena y da conciencia parcial del bucle: déjà vu y patrones. No elige herederos.' },
      { t: 'h2', texto: 'El pozo azul' },
      { t: 'p', texto: 'Pozo de luz azul bajo la montaña: aislante infiltrado que Lucian creyó salida.' },
      { t: 'p', texto: 'El otro polo en [[oxi-resplandor]].' }
    ]
  },
  {
    id: 'oxi-herederos', titulo: 'Herederos de Sangre', seccion: 'oxida', categoria: 'Lore', resumen: 'Accidentes de colisión Resplandor/Tenue con conciencia parcial del bucle. 0 rupturas en 370 años.', puntos: ['Perciben directo, reconocen símbolos, resisten interferencia. Zumbido 17-23Hz.', 'Lucian caso completo distorsionado · Descendiente nº16 = mismo individuo, 16 intentos.'], relaciones: ['oxi-lucian', 'oxi-descendiente'], origen: 'Proyecto Oxida/Herederos de Sangre.md',
    tipo: 'articulo',
    intro: 'Accidentes de la colisión: humanos con conciencia parcial del bucle. Cero rupturas en 370 años.',
    tags: ['herederos', 'resplandor', 'dava', 'simbolos'],
    bloques: [
      { t: 'h2', texto: 'Capacidades y síntomas' },
      { t: 'lista', items: ['Perciben directo, reconocen símbolos sin aprender y resisten interferencia.', 'Visiones, dolor no físico, pensamientos ajenos y zumbido 17-23Hz.'] },
      { t: 'h2', texto: 'Casos' },
      { t: 'p', texto: 'Lucian, caso completo pero distorsionado; Descendiente nº16, mismo individuo en 16 intentos.' },
      { t: 'p', texto: 'El primero en [[oxi-lucian]] y el actual en [[oxi-descendiente]].' }
    ]
  },
  {
    id: 'oxi-lucian', titulo: 'Lucian de Sangris (312 a.C.)', seccion: 'oxida', categoria: 'Personaje', resumen: 'Bastardo de Ioánina que se autobautiza para liberar niños del estigma. Entra al Pozo por Eudora.', puntos: ['Carta narcisista Yo me reconozco único vs real ladrón dudoso + ἀγαπῶ σε πάτερ.', 'Río Heráclito: dejar de ser quien era era necesario. Cerebro preservado.'], relaciones: ['oxi-cerebro', 'oxi-dava'], origen: 'Proyecto Oxida/Lucian de Sangris.md',
    tipo: 'articulo',
    intro: 'Bastardo de Ioánina que se rebautiza para liberar niños del estigma y entra al Pozo por Eudora.',
    tags: ['herederos', 'personajes', 'pozo'],
    bloques: [
      { t: 'h2', texto: 'La contradicción' },
      { t: 'p', texto: 'Carta narcisista (`Yo me reconozco único`) contra el ladrón dudoso real, más un añadido infantil en griego.' },
      { t: 'h2', texto: 'El río' },
      { t: 'p', texto: 'Heráclito: dejar de ser quien era era necesario. Entra igual; cerebro preservado.' },
      { t: 'p', texto: 'El artefacto en [[oxi-cerebro]] y quien lo custodia en [[oxi-dava]].' }
    ]
  },
  {
    id: 'oxi-descendiente', titulo: 'El Descendiente nº16', seccion: 'oxida', categoria: 'Personaje', resumen: 'Protagonista sin nombre, Bs.As. 2025 (Once/Palermo). Despertó sin recuerdo, ya en umbral.', puntos: ['2 monitores, impresora sola, hoja tibia, símbolos íntimos, dolor = Heredero activo.', 'Ocupación pendiente: dev / archivista / diseñador. No confiar ni en la guía.'], relaciones: ['oxi-capitulo', 'oxi-ka'], origen: 'Proyecto Oxida/El Descendiente.md',
    tipo: 'articulo',
    intro: 'Protagonista sin nombre en Bs.As. 2025: despertó sin recuerdo y ya está en el umbral.',
    tags: ['herederos', 'personajes', 'dava'],
    bloques: [
      { t: 'h2', texto: 'Estado' },
      { t: 'lista', items: ['2 monitores, impresora sola, hoja tibia y símbolos íntimos; el dolor marca Heredero activo.', 'Ocupación pendiente: dev, archivista o diseñador. No confiar ni en la guía.'] },
      { t: 'p', texto: 'Su primer contacto en [[oxi-capitulo]] y la fuerza que lo lleva en [[oxi-ka]].' }
    ]
  },
  {
    id: 'oxi-dava', titulo: 'DAVA — La Fundación', seccion: 'oxida', categoria: 'Organización', resumen: 'Desde 1655 documenta y gestiona qué realidad existe vía percepciones de Herederos.', puntos: ['Manuscrito 1652 → fundación 1655 · 18 puntos calientes Río de la Plata.', 'Operativo / Analítico / Archivo. Deja rastros para que el Heredero crea elegir libre.', 'Sabe: el ciclo no se rompe, se redirige. Clasifica expedición Pozo como inexistente.'], relaciones: ['oxi-investigador', 'oxi-informe'], origen: 'Proyecto Oxida/DAVA.md',
    tipo: 'articulo',
    intro: 'La única institución con certeza: documenta y gestiona qué realidad existe desde 1655.',
    tags: ['dava', 'herederos'],
    bloques: [
      { t: 'h2', texto: 'Origen' },
      { t: 'p', texto: 'Manuscrito 1652 → fundación 1655; 18 puntos calientes en el Río de la Plata.' },
      { t: 'h2', texto: 'Método' },
      { t: 'lista', items: ['Operativo, Analítico y Archivo; deja rastros para que el Heredero crea elegir libre.', 'Sabe que el ciclo no se rompe, se redirige; clasifica la expedición al Pozo como inexistente.'] },
      { t: 'p', texto: 'Su expediente global en [[oxi-informe]] y su díscolo en [[oxi-investigador]].' }
    ]
  },
  {
    id: 'oxi-investigador', titulo: 'Investigador I — el que pregunta', seccion: 'oxida', categoria: 'Personaje', resumen: 'Precisión +47h. Descubrió que mente post-descenso edita el mundo (Mandela). Sabotea con Memorial.', puntos: ['Mundo nº16 ya no es original: 15 ciclos acumulados.', 'Camino no autorizado (video, cipher, URL) + Proyecto Memorial hace 5 días. Estado DESCONOCIDO.'], relaciones: ['oxi-dava', 'oxi-ka'], origen: 'Proyecto Oxida/Investigador I.md',
    tipo: 'articulo',
    intro: 'El analista de +47h que descubrió que la mente post-descenso edita el mundo.',
    tags: ['dava', 'personajes'],
    bloques: [
      { t: 'h2', texto: 'Descubrimiento' },
      { t: 'p', texto: 'Mundo nº16 ya no original: 15 ciclos acumulados de percepciones.' },
      { t: 'h2', texto: 'Sabotaje' },
      { t: 'p', texto: 'Camino no autorizado (video, cipher, URL) + Proyecto Memorial hace 5 días. Estado DESCONOCIDO.' },
      { t: 'p', texto: 'Su institución en [[oxi-dava]] y la mecánica en [[oxi-ka]].' }
    ]
  },
  {
    id: 'oxi-cerebro', titulo: 'Cerebro digital — artefacto', seccion: 'oxida', categoria: 'Objeto', resumen: 'Fragmento en ánfora +2000 años que palpita y cifra en lenguaje eléctrico. Huésped sin nombre.', puntos: ['Hallado 1723 Tracia + 12 monedas Espero veros de nuevo + carta 312 a.C.', '¿Lucian? Solo coincidencia temporal. DAVA Alto Peligrosidad. ¿Qué pasa si el Descendiente lo toca?'], relaciones: ['oxi-lucian', 'oxi-resplandor'], origen: 'Proyecto Oxida/Cerebro digital.md',
    tipo: 'articulo',
    intro: 'Fragmento en ánfora de +2000 años que palpita y cifra en lenguaje eléctrico.',
    tags: ['dava', 'resplandor'],
    bloques: [
      { t: 'h2', texto: 'Hallazgo' },
      { t: 'p', texto: 'Tracia 1723 + 12 monedas con mensaje + carta de 312 a.C.' },
      { t: 'h2', texto: 'Preguntas' },
      { t: 'p', texto: '¿Lucian? Solo coincidencia temporal. DAVA lo marca Alto Peligrosidad. ¿Qué pasa si el Descendiente lo toca?' },
      { t: 'p', texto: 'El candidato a dueño en [[oxi-lucian]] y la entidad que lo consulta en [[oxi-resplandor]].' }
    ]
  },
  {
    id: 'oxi-ka', titulo: 'El Ka y la Expedición', seccion: 'oxida', categoria: 'Mecánica', resumen: 'Fuerza que lleva al Descendiente creyendo elegir. Pozo Orfanos: cuerpo 1.652s, mente eternidad.', puntos: ['15 intentos mismo individuo · 2 registros FOUNDATION censurados.', 'Fallo no fue bajar sino volver: desconexión cuerpo-mente filtra y reinicia.', 'Nº16 desbloqueó 7 estados: calibración, no puzzle. Modificará mundo para nº17.'], relaciones: ['oxi-descendiente', 'oxi-investigador'], origen: 'Proyecto Oxida/El Ka y La Expedición.md',
    tipo: 'articulo',
    intro: 'La fuerza que lleva al Descendiente creyendo elegir; el fallo fue volver, no bajar.',
    tags: ['pozo', 'herederos'],
    bloques: [
      { t: 'h2', texto: 'Intentos' },
      { t: 'p', texto: '15 intentos del mismo individuo; 2 registros FOUNDATION censurados.' },
      { t: 'h2', texto: 'El descenso' },
      { t: 'p', texto: 'Cuerpo 1.652 segundos en Orfanos, mente en eternidad; la desconexión filtra y reinicia.' },
      { t: 'p', texto: 'La nº16 desbloqueó 7 estados: calibración, no puzzle. Modificará el mundo para la nº17.' },
      { t: 'p', texto: 'El protagonista en [[oxi-descendiente]].' }
    ]
  },
  {
    id: 'oxi-capitulo', titulo: 'Capítulo I — Distrito', seccion: 'oxida', categoria: 'Narrativa', resumen: 'Despierta con Creo en ti, luz naranja, impresora sola, hoja tibia griega y videos imposibles.', puntos: ['ACCESO RESTRINGIDO / NO MIRES CIELO · TE ODIO / NO LLEGARÁS / CANAL 03 SIN RESPUESTA.', 'Pergaminos Collegium Obscurum 1652 + Vince insaniam desintegrándose.', 'Entendió algo que no le gustó: dos voces, mismo timbre, distinta cadencia.'], relaciones: ['oxi-descendiente', 'oxi-web-arg'], origen: 'Proyecto Oxida/Capítulo I.md',
    tipo: 'articulo',
    intro: 'Despierta con guía hostil y acogedora a la vez, luz naranja e impresora sola.',
    tags: ['arg', 'simbolos'],
    bloques: [
      { t: 'h2', texto: 'La habitación' },
      { t: 'p', texto: 'Luz naranja sin sombras, monitores solos y hoja tibia con griegos íntimos.' },
      { t: 'h2', texto: 'Los mensajes' },
      { t: 'lista', items: ['`ACCESO RESTRINGIDO` y `NO MIRES CIELO` contra `TE ODIO` y `NO LLEGARÁS`.', 'Pergaminos de 1652 y un Vince que se desintegra.'] },
      { t: 'h2', texto: 'El quiebre' },
      { t: 'p', texto: 'Entendió algo que no le gustó: dos voces, mismo timbre, distinta cadencia.' },
      { t: 'p', texto: 'Quien lo vive en [[oxi-descendiente]]; la puerta web en [[oxi-web-arg]].' }
    ]
  },
  {
    id: 'oxi-informe', titulo: 'Informe Clasificado 113Ω', seccion: 'oxida', categoria: 'Documento', resumen: 'Aparición multi-región 23:30 UTC: colapso EM, relojes detenidos, sol nocturno. DAVA lidera rastreo.', puntos: ['No miren al cielo antes de colapsar · Silencio Urbano · presión torácica universal.', 'Difusión prohibida NIVEL Ω. ONU en emergencia planetaria.'], relaciones: ['oxi-dava', 'oxi-resplandor'], origen: 'Proyecto Oxida/Informe Clasificado Nº 113Ω.md',
    tipo: 'articulo',
    intro: 'Aparición multi-región a las 23:30 UTC: colapso EM, relojes detenidos y sol nocturno.',
    tags: ['dava', 'resplandor'],
    bloques: [
      { t: 'h2', texto: 'Evidencias' },
      { t: 'lista', items: ['Transmisiones (`No miren al cielo`) antes de colapsar.', 'Silencio Urbano y presión torácica universal.'] },
      { t: 'h2', texto: 'Estado' },
      { t: 'p', texto: 'Difusión prohibida NIVEL Ω; la ONU en emergencia y DAVA liderando el rastreo.' },
      { t: 'p', texto: 'La fundación en [[oxi-dava]] y el fenómeno en [[oxi-resplandor]].' }
    ]
  },
  {
    id: 'oxi-mapa-tension', titulo: 'Mapa de Tensión — 6 fases', seccion: 'oxida', categoria: 'Diseño', resumen: 'Cada anomalía +10% inexplicable. De zumbido a Camino A ὌΡΟΣ vs B ΤΕΦΡΑ ΦΩΣ.', puntos: ['F0 umbral → F1 contacto (Cap I) → F2 madriguera → F3 archivo → F4 convergencia → F5 sin retorno → F6 horizonte.', 'Claves que evolucionan: luz, voces, zumbido, símbolos, agua. Web bloquea retroceso en F5.'], relaciones: ['oxi-capitulo', 'men-indice-sesgos'], origen: 'Proyecto Oxida/Mapa de Tensión — Escalada Narrativa.md',
    tipo: 'articulo',
    intro: 'Seis fases donde cada anomalía es 10% más inexplicable, hasta dos caminos finales.',
    tags: ['diseno', 'arg'],
    bloques: [
      { t: 'h2', texto: 'Escalada' },
      { t: 'p', texto: 'De zumbido a Camino A ὌΡΟΣ contra Camino B ΤΕΦΡΑ ΦΩΣ, pasando por madriguera, archivo y convergencia.' },
      { t: 'h2', texto: 'Claves' },
      { t: 'p', texto: 'Luz, voces, zumbido, símbolos y agua evolucionan; la web bloquea el retroceso en F5.' },
      { t: 'p', texto: 'El inicio en [[oxi-capitulo]] y los sesgos por fase en [[men-indice-sesgos]].' }
    ]
  },
  {
    id: 'oxi-web-arg', titulo: 'La Web — ARG (Vue+TS)', seccion: 'oxida', categoria: 'Producto', resumen: 'El usuario ES el Descendiente: login SoloLaSangreLlama/1652 → /home Reporte1.mp4 → archivo DAVA.', puntos: ['/login /alejandria /documentos /investigacion /mapeados /encriptados /pergaminos.', 'Assets: 3 audios Agustina, videos Reporte1/meteorólogo, carta Lucian, cerebro, cielo, mapa.', 'Pendiente: biológicos, mapeados, encriptados, Canal 03. Referencia directa a este proyecto web.'], relaciones: ['yo-proyectos', 'oxi-capitulo'], origen: 'Proyecto Oxida/La Web — El Resplandor Naranja ARG.md',
    tipo: 'proyecto',
    intro: 'El usuario ES el Descendiente: login con credenciales de la narrativa y archivo DAVA navegable.',
    tags: ['arg', 'diseno'],
    bloques: [
      { t: 'h2', texto: 'Secciones' },
      { t: 'p', texto: 'Login, Alejandría, documentos, investigación, mapeados, encriptados y pergaminos.' },
      { t: 'h2', texto: 'Assets y pendiente' },
      { t: 'lista', items: ['3 audios, videos Reporte1 y meteorólogo, carta, cerebro, cielo y mapa.', 'Pendiente: biológicos, mapeados, encriptados y Canal 03.'] },
      { t: 'p', texto: 'Mismo stack que [[yo-proyectos]]; la historia continúa en [[oxi-capitulo]].' }
    ]
  },
  {
    id: 'oxi-sesgos-uso', titulo: 'Sesgos como vectores del sistema', seccion: 'oxida', categoria: 'Puente', resumen: 'Los 13 sesgos son cómo el Resplandor mueve al Descendiente donde quiere.', puntos: ['Autoridad: confía en DAVA por formato · Confirmación: racionaliza anomalías.', 'Halo Creo en ti = trampa · Espectador: DAVA paraliza justo lo necesario.'], relaciones: ['men-indice-sesgos', 'oxi-dava'], origen: 'Proyecto Oxida/Sesgos Cognitivos.md',
    tipo: 'articulo',
    intro: 'Los 13 sesgos como vectores: así mueve el sistema al Descendiente.',
    tags: ['sesgos', 'resplandor', 'dava'],
    bloques: [
      { t: 'h2', texto: 'Vectores' },
      { t: 'lista', items: ['Autoridad: confía en DAVA por formato; Confirmación: racionaliza anomalías.', 'Halo `Creo en ti` como trampa; Espectador: DAVA paraliza justo lo necesario.'] },
      { t: 'p', texto: 'El catálogo en [[men-indice-sesgos]] y el operador en [[oxi-dava]].' }
    ]
  },

  // ── MENTE ──
  {
    id: 'men-indice-sesgos', titulo: 'Índice de 13 sesgos', seccion: 'mente', categoria: 'Sesgos', resumen: 'Repositorio madre: detectar en uno mismo (Plan P1) y aplicar para vender (Plan inverso).', puntos: ['Afinidad, Atribución hostil, Autoridad, Confirmación, Disponibilidad, Halo, Espectador, Encuadre, Exceso confianza, Ilusión conocimiento, Proximidad temporal, Saliencia, Validez aparente.', 'Doble uso: limpiar lectura propia y diseñar mensajes que sí entran.'], relaciones: ['sis-plan', 'men-plan-venta'], origen: 'Sesgos Cognitivos/Índice de Sesgos Cognitivos.md',
    tipo: 'indice',
    intro: 'El repositorio madre de 13 sesgos: para detectar en uno mismo y para comunicar.',
    tags: ['sesgos', 'decision', 'ventas'],
    bloques: [
      { t: 'h2', texto: 'El catálogo' },
      { t: 'lista', items: ['Afinidad, Atribución hostil, Autoridad, Confirmación, Disponibilidad, Halo y Espectador.', 'Encuadre, Exceso de confianza, Ilusión de conocimiento, Proximidad temporal, Saliencia y Validez aparente.'] },
      { t: 'h2', texto: 'Doble uso' },
      { t: 'p', texto: 'Detectar en uno mismo (Plan P1) y aplicar para vender (Plan inverso).' },
      { t: 'p', texto: 'El caso aplicado está en [[men-plan-venta]] y la pasada 1 en [[sis-plan]].' }
    ]
  },
  {
    id: 'men-plan-venta', titulo: 'Plan de venta con 13 sesgos', seccion: 'mente', categoria: 'Ventas', resumen: 'Brownies como caso aplicado: tribu, aval, escasez, post diario, packaging y entrega fija.', puntos: ['F1 fundación → F2 círculo → F3 presencia diaria → F4 expansión 2-3 puntos.', 'Métricas: u/semana, recompra >30%, impulso >50%, menciones ≥3/sem.', 'Oro: los sesgos venden la primera vez; la repetición la gana el producto.'], relaciones: ['bro-protocolo-venta', 'men-indice-sesgos'], origen: 'Sesgos Cognitivos/Plan de Acción — Venta de Brownies.md',
    tipo: 'articulo',
    intro: 'Brownies como caso aplicado de los 13 sesgos, por fases y con métricas.',
    tags: ['sesgos', 'ventas'],
    bloques: [
      { t: 'h2', texto: 'Fases' },
      { t: 'lista', ordenada: true, items: ['F1 fundación.', 'F2 círculo cercano.', 'F3 presencia diaria.', 'F4 expansión a 2-3 puntos.'] },
      { t: 'h2', texto: 'Métricas' },
      { t: 'p', texto: 'Unidades por semana, recompra mayor a 30%, impulso mayor a 50% y menciones de 3 por semana.' },
      { t: 'card', variante: 'conclusion', titulo: 'Regla de oro', texto: 'Los sesgos venden la primera vez; la repetición la gana el producto.' },
      { t: 'p', texto: 'Los sesgos, uno por uno, en [[men-indice-sesgos]]; el guion de venta en [[bro-protocolo-venta]].' }
    ]
  },
  {
    id: 'men-sesgo-autoridad', titulo: 'Sesgos: Autoridad · Halo · Encuadre', seccion: 'mente', categoria: 'Sesgos', resumen: 'Seguir prestigio sin cuestionar, contaminar todo por un rasgo y percibir según presentación.', puntos: ['Bata blanca / jefe / celebridad · atractivo=competente · 95% libre de grasa.', 'En Brownies: receta premiada, packaging lindo, quedan solo 12.'], relaciones: ['men-indice-sesgos'], origen: 'Sesgos Cognitivos/Autoridad.md + Efecto Halo + Encuadre',
    tipo: 'ficha',
    intro: 'Tres atajos juntos: seguir al prestigio, contaminar por un rasgo y percibir según presentación.',
    tags: ['sesgos', 'ventas', 'poder'],
    claves: [
      { termino: 'Autoridad', definicion: 'Seguir a quien tiene prestigio sin cuestionar: bata blanca, jefe o celebridad.' },
      { termino: 'Halo', definicion: 'Una cualidad contamina todo lo demás: atractivo igual competente.' },
      { termino: 'Encuadre', definicion: 'La presentación cambia la percepción: 95% libre de grasa.' }
    ],
    bloques: [
      { t: 'h2', texto: 'En Brownies' },
      { t: 'p', texto: 'Receta premiada, packaging lindo, quedan solo 12.' },
      { t: 'p', texto: 'El catálogo completo en [[men-indice-sesgos]].' }
    ]
  },
  {
    id: 'men-sesgo-lectura', titulo: 'Sesgos: Confirmación · Disponibilidad · Saliencia', seccion: 'mente', categoria: 'Sesgos', resumen: 'Ver lo que confirma, sobreestimar lo memorable y mirar solo lo llamativo.', puntos: ['Solo medios afines · aviones vs autos · juzgar auto por color.', 'Antídoto Plan P1: ¿qué quiero creer? ¿qué sobreestimo? Uso inverso: testimonios + visibilidad + etiqueta dorada.'], relaciones: ['sis-plan'], origen: 'Sesgos Cognitivos/Confirmacion + Disponibilidad + Saliencia',
    tipo: 'ficha',
    intro: 'Tres filtros de lectura: ver lo que confirma, sobreestimar lo memorable y mirar lo llamativo.',
    tags: ['sesgos', 'ventas', 'decision'],
    claves: [
      { termino: 'Confirmación', definicion: 'Buscar solo lo que confirma lo que ya creemos: solo medios afines.' },
      { termino: 'Disponibilidad', definicion: 'Sobreestimar lo que se recuerda fácil: aviones contra autos.' },
      { termino: 'Saliencia', definicion: 'Foco en lo llamativo aunque no sea lo importante: juzgar el auto por el color.' }
    ],
    bloques: [
      { t: 'h2', texto: 'Antídoto y uso' },
      { t: 'p', texto: 'Antídoto Plan P1: ¿qué quiero creer? ¿qué sobreestimo? Uso inverso: testimonios, visibilidad y etiqueta dorada.' },
      { t: 'p', texto: 'La pasada 1 completa en [[sis-plan]].' }
    ]
  },
  {
    id: 'men-paradigmas', titulo: 'Paradigmas — el lente', seccion: 'mente', categoria: 'Paradigmas', resumen: 'Lente que define lo normal. Cambiar paradigma > acumular datos. Elegir el útil, no el verdadero.', puntos: ['4 pasos: identificar lente → cuestionar afuera → elegir útil → actuar dentro/fuera.', 'De convencer a servir: caso emprendedor brownies.'], relaciones: ['sis-plan', 'bro-paradigma'], origen: 'Paradigmas/Paradigmas.md',
    tipo: 'articulo',
    intro: 'El paradigma como lente: cambiarlo rinde más que acumular datos.',
    tags: ['decision', 'metodo', 'accion'],
    bloques: [
      { t: 'h2', texto: 'El método en 4 pasos' },
      { t: 'lista', ordenada: true, items: ['Identificar el lente actual.', 'Cuestionarlo: ¿qué queda afuera?', 'Elegir el útil, no el verdadero.', 'Actuar dentro o fuera; romperlo cuando convenga.'] },
      { t: 'p', texto: 'De convencer a servir: caso emprendedor brownies, en [[bro-paradigma]].' }
    ]
  },
  {
    id: 'men-rapidos', titulo: 'Pensamientos rápidos — 2 min', seccion: 'mente', categoria: 'Paradigmas', resumen: 'Atajos bajo presión: reversible+barato→ya; irreversible+caro→frenar; empate→la que enseña.', puntos: ['Filtro 3: ¿acerca a meta 1 año? ¿respetado aprobaría? ¿pérdida si abandono en 6m? 2 sí = avanzar.', 'Frenar con prisa social, emoción fuerte o una sola fuente.'], relaciones: ['sis-decisorium'], origen: 'Paradigmas/Pensamientos Rápidos.md',
    tipo: 'articulo',
    intro: 'Atajos para decidir con poco tiempo: cuándo actuar, cuándo frenar y el filtro de 3 preguntas.',
    tags: ['decision', 'accion'],
    bloques: [
      { t: 'h2', texto: 'Cuándo actuar' },
      { t: 'lista', items: ['Reversible + barato → ya.', 'Irreversible + caro → frenar.', 'Empate → la que más enseña.', 'Duda → acción mínima que genere info.'] },
      { t: 'h2', texto: 'Cuándo frenar' },
      { t: 'p', texto: 'Con prisa social, emoción fuerte o una sola fuente.' },
      { t: 'h2', texto: 'Filtro 3' },
      { t: 'p', texto: '¿Acerca a meta 1 año? ¿Respetado aprobaría? ¿Pérdida si abandono en 6 meses? 2 sí es avanzar.' },
      { t: 'p', texto: 'Decidir el qué en [[sis-decisorium]].' }
    ]
  },
  {
    id: 'men-leyes', titulo: 'Las 48 Leyes del Poder', seccion: 'mente', categoria: 'Poder', resumen: '6 bloques: imagen, juego psicológico, ofensiva, poder personal, geopolítica y dominio extremo.', puntos: ['Nunca opacar al maestro · decir menos · reputación · atención · dependencia.', 'Ausencia/escasez · imprevisibilidad · concentrar fuerzas · audacia · timing · fluidez.', 'Uso: antes de actuar, en conflicto y como diagnóstico transversal.'], relaciones: ['sis-plan', 'men-principe'], origen: 'Leyes del Poder/Leyes del Poder.md',
    tipo: 'articulo',
    intro: 'Las 48 leyes en 6 bloques: de la imagen al dominio extremo, para leer el tablero.',
    tags: ['poder', 'decision'],
    bloques: [
      { t: 'h2', texto: 'Muestra de leyes' },
      { t: 'lista', items: ['Nunca opacar al maestro · decir menos · reputación · atención · dependencia.', 'Ausencia y escasez · imprevisibilidad · concentrar fuerzas · audacia · timing · fluidez.'] },
      { t: 'h2', texto: 'Uso' },
      { t: 'p', texto: 'Antes de actuar, en conflicto y como diagnóstico transversal.' },
      { t: 'p', texto: 'La pasada 2 en [[sis-plan]] y el caso clásico en [[men-principe]].' }
    ]
  },
  {
    id: 'men-principe', titulo: 'El Príncipe — Maquiavelo', seccion: 'mente', categoria: 'Poder', resumen: 'Eficacia sobre moral: virtù vs fortuna, temido mejor que amado pero nunca odiado.', puntos: ['Favores de a poco, daños de una vez · parecer virtuoso · león + zorro.', 'No mercenarios · anti-adulación · mejor aliado temido que neutral pisoteado.'], relaciones: ['men-leyes', 'sis-plantilla-persona'], origen: 'Leyes del Poder/El Príncipe de Maquiavelo.md',
    tipo: 'articulo',
    intro: 'Eficacia sobre moral: virtù contra fortuna, temido mejor que amado pero nunca odiado.',
    tags: ['poder', 'decision'],
    bloques: [
      { t: 'h2', texto: 'Ideas' },
      { t: 'lista', items: ['Favores de a poco, daños de una vez; parecer compasivo, leal y honesto; león + zorro.', 'No mercenarios; anti-adulación; mejor aliado temido que neutral pisoteado.'] },
      { t: 'p', texto: 'Lectura de personas con [[sis-plantilla-persona]] y tablero en [[men-leyes]].' }
    ]
  },

  // ── FACULTAD ──
  {
    id: 'fac-parcial', titulo: 'Parcial: interfaces, lambdas, patrones, DI + BD', seccion: 'facultad', categoria: 'Parcial', resumen: 'Prog + BD: contratos, recursividad, Func/Action, Singleton/Factory/Observer/Strategy, ADO y SQL.', puntos: ['Interfaces múltiple + default C#8 · IEnumerable/IComparable/IDisposable.', 'Recursividad base+paso, tail, StackOverflow, memo O(2n)→O(n).', 'Lambdas, LINQ Where/Select, closures. DI constructor + AddTransient/Scoped/Singleton.', 'ADO: Connection/Command/Reader, ExecuteReader vs NonQuery, AddWithValue, using anti-inyección.'], relaciones: ['fac-demoado', 'fac-guia-net'], origen: 'Facultad/Parcial — Interfaces, Recursividad, Lambdas, Patrones y DI.md',
    tipo: 'articulo',
    intro: 'Apunte doble para el parcial: programación (interfaces, recursividad, lambdas, patrones y DI) y base de datos (ADO.NET y SQL), con snippets y un POC sin compilar.',
    tags: ['csharp', 'sql', 'patrones'],
    bloques: [
      { t: 'h2', texto: 'Programación' },
      { t: 'p', texto: 'Interfaces como contrato (múltiple, no instanciables, `IEnumerable<T>`), polimorfismo y `IDisposable`.' },
      { t: 'lista', items: ['Caso base + paso recursivo: Factorial, Fibonacci y carpetas; memoización de O(2ⁿ) a O(n).', 'Lambdas `Func<>`, `Action` y `Predicate<T>` con LINQ (`Where`, `Select`) y closures.', 'Patrones: Singleton con doble check, Factory, Observer y Strategy; DI por constructor con `AddTransient`, `AddScoped` y `AddSingleton`.'] },
      { t: 'h2', texto: 'Base de datos' },
      { t: 'p', texto: 'ADO.NET con `SqlConnection`, `SqlCommand` y `SqlDataReader`, parámetros contra inyección y EF Core como ORM sobre ADO.NET.' },
      { t: 'lista', items: ['DDL, DML, DQL, DCL y TCL con `JOIN`, `GROUP BY` y `COUNT`.', 'ABM completo con `IPaisRepositorio` y buenas prácticas: parámetros, WHERE por PK y `using`.'] },
      { t: 'p', texto: 'La práctica está en [[fac-demoado]] y la teoría larga en [[fac-guia-net]].' }
    ]
  },
  {
    id: 'fac-demoado', titulo: 'DemoAdo línea por línea', seccion: 'facultad', categoria: 'Proyecto', resumen: 'Consola .NET 9 ADO puro sin ORM: wrapper GetData/Execute + Singleton + repositorios País/Carrera.', puntos: ['Microsoft.Data.SqlClient · TupacDB · file-scoped namespace · new() · using C#8.', 'AddWithValue anti-inyección · ExecuteNonQuery==1 · cadena (local)/sspi/TrustServerCertificate.', 'static/lock double-check · Dispose + finalizador · CRUD con WHERE por clave.'], relaciones: ['fac-parcial', 'yo-habilidades'], origen: 'Facultad/DemoAdo — Explicación Línea por Línea.md',
    tipo: 'proyecto',
    intro: 'Consola C# con .NET 9 y ADO.NET puro, sin ORM: explica línea por línea el wrapper de acceso a datos, el Singleton y los repositorios de País y Carrera contra TupacDB.',
    tags: ['csharp', 'sql', 'dotnet'],
    bloques: [
      { t: 'h2', texto: 'Estructura' },
      { t: 'lista', items: ['`Program.cs` con la demo de alta y listado.', '`AccesoDB.cs`: `GetData` para SELECT y `Execute` para INSERT/UPDATE/DELETE.', '`AccesoDbSingleton.cs`: instancia única con doble check y `lock`.', 'Modelos `Pais`, `Paises`, `Carrera` y repositorios con CRUD y `WHERE` por clave.'] },
      { t: 'h2', texto: 'Claves técnicas' },
      { t: 'lista', items: ['Parámetros `@` anti-inyección con `AddWithValue` y `ExecuteNonQuery() == 1`.', 'Cadena `(local)`, `sspi` y `TrustServerCertificate`; conexión perezosa y `Dispose`.', 'Sintaxis moderna: namespace file-scoped de C# 10, `new()` de C# 9 y `using` de C# 8.'] },
      { t: 'p', texto: 'Base teórica en [[fac-parcial]].' }
    ]
  },
  {
    id: 'fac-guia-net', titulo: 'Guía completa .NET y C#', seccion: 'facultad', categoria: 'Guía', resumen: 'De CLR/GC a async, records, ASP.NET Core y DTOs. Historia 2002→.NET 9 + glosario.', puntos: ['Value vs Reference · Nullable · POO virtual/override vs new · SOLID · sealed.', 'Genéricos, LINQ deferred, excepciones, Task/async, Func/Action, eventos.', 'ASP.NET middleware + DI + ModelState · records/with · JSON: SemaphoreSlim, no atómico.'], relaciones: ['fac-parcial', 'fac-info-academica'], origen: 'Facultad/NET y CSharp — Guía Completa.md',
    tipo: 'articulo',
    intro: 'Guía larga de .NET y C#: de la historia 2002→.NET 9 y el CLR con GC hasta async, records, ASP.NET Core y DTOs, con glosario.',
    tags: ['csharp', 'dotnet', 'patrones'],
    bloques: [
      { t: 'h2', texto: 'Plataforma y lenguaje' },
      { t: 'lista', items: ['Historia 1.0 (2002) → Core (2016) → .NET 9, con CLR, IL/JIT y GC por generaciones.', 'Value vs Reference (stack vs heap), `Nullable` con `?`, `??` y `?.`, y los 4 pilares de POO con `virtual`/`override` y SOLID.'] },
      { t: 'h2', texto: 'Moderno y web' },
      { t: 'lista', items: ['Genéricos, LINQ con ejecución diferida, `Task` con `async`/`await` y delegates `Func`/`Action`.', 'ASP.NET Core: middleware, DI y `ModelState`; C# 8–12 con `record`, `with` y pattern matching.', 'JSON con riesgos reales: no atómico, carreras y `SemaphoreSlim(1,1)` como mutex.'] },
      { t: 'p', texto: 'Lo evaluable está resumido en [[fac-parcial]].' }
    ]
  },
  {
    id: 'fac-info-academica', titulo: 'Info académica + listado 3-way join', seccion: 'facultad', categoria: 'Proyecto', resumen: 'Tabla 1:1 con 4 BIT + listado consolidado. SPs + EF Core SpInvoker + BR con rollback manual.', puntos: ['UNIQUE/CASCADE · SET NOCOUNT · SCOPE_IDENTITY · sin FirstOrDefault sobre EXEC.', 'BR valida (título si Posee, excluyentes, ≥1 flag) · InscripcionService transaccional.', 'Vue: ListadoView 7 cols + InscripciónView 4 secciones + useApiFetch Bearer.'], relaciones: ['fac-guia-net', 'yo-proyectos'], origen: 'Facultad/info académica y listado.md',
    tipo: 'proyecto',
    intro: 'Dos features reales: tabla académica 1:1 con 4 flags BIT y listado consolidado con join triple, con SPs, EF Core y rollback manual.',
    tags: ['sql', 'dotnet', 'csharp'],
    bloques: [
      { t: 'h2', texto: 'Base de datos' },
      { t: 'lista', items: ['Tabla con `UNIQUE`, `CASCADE`, `SET NOCOUNT ON` y `SCOPE_IDENTITY`; nunca `FirstOrDefaultAsync` sobre `EXEC`.', 'Repositorios con `SqlParameter` y `DBNull.Value`; `SpInvoker` centraliza los SPs.'] },
      { t: 'h2', texto: 'Reglas y frontend' },
      { t: 'lista', items: ['BR valida (título obligatorio, excluyentes, ≥1 flag) e `InscripcionService` transaccional con rollback manual.', 'Vue con `ListadoView` de 7 columnas y `useApiFetch` con `Bearer` y redirect al login.'] },
      { t: 'p', texto: 'Comparte stack con [[fac-demoado]] y criterios con [[yo-proyectos]].' }
    ]
  },

  // ── IDEAS ──
  {
    id: 'idea-1', titulo: 'Mi primera idea', seccion: 'ideas', categoria: 'Personal', resumen: 'Ejemplo inicial para leer siempre que necesites inspiración.', puntos: ['Bórrame y escribe tu primera idea real en IDEAS.md.'], relaciones: [], origen: 'IDEAS.md',
    tipo: 'coleccion',
    intro: 'Punto de partida del archivo: la primera idea de ejemplo.'
  },
  {
    id: 'idea-2', titulo: 'Portfolio con demos en vivo', seccion: 'ideas', categoria: 'Carrera', resumen: 'Publicar 2-3 proyectos con demo y repo público.', puntos: ['Como módulo Productos en La Industrial: catálogo + tabla + badges.'], relaciones: ['yo-proyectos'], origen: 'IDEAS.md',
    tipo: 'coleccion',
    intro: 'Publicar una selección de proyectos con demo en vivo y repositorio público.'
  },
  {
    id: 'idea-3', titulo: 'Checkout MercadoPago en Brana', seccion: 'ideas', categoria: 'Brana', resumen: 'Pagos reales en el e-commerce esotérico.', puntos: ['Alerta ámbar estilo Dashboard: ruta y CTA.'], relaciones: [], origen: 'IDEAS.md',
    tipo: 'coleccion',
    intro: 'Sumar pagos reales al e-commerce con checkout.'
  },
  {
    id: 'idea-4', titulo: 'Tests xUnit + Vitest', seccion: 'ideas', categoria: 'Calidad', resumen: 'Base de 34 tests en verde como en Sistema Industrial.', puntos: ['Referencia PROYECTO.md v1.2.0.'], relaciones: ['fac-parcial'], origen: 'IDEAS.md',
    tipo: 'coleccion',
    intro: 'Base de tests en verde como la del Sistema Industrial.',
    tags: ['testing']
  }
]

export const notaPorId = (id: string) => notas.find(n => n.id === id)
export const notasPorSeccion = (seccion: string) => notas.filter(n => n.seccion === seccion)

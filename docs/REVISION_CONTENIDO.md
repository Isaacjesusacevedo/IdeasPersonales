# Revisión de contenido — checklist por nota

Fuente: `frontend/src/data/vault.ts` (el Vault .md original en disco no se releyó;
los resúmenes usados para reescribir provienen de la lectura exhaustiva previa del vault).
Reglas aplicadas: ids/títulos/resúmenes/puntos/relaciones/origen intactos; solo se suma
`tipo`, `intro`, `claves`, `bloques` y `tags`. Sin ejemplos didácticos añadidos hasta ahora
(toda ilustración viene de las propias notas).

Vocabulario controlado de tags (minúsculas, cada uno con 2+ usos al cerrar cada lote):
csharp, sql, patrones, dotnet, trayectoria, operaciones, programacion, testing,
decision, poder, principios, matriz, evaluacion, mapas, nucleo, estructura, metodo, plantillas,
sesgos, ventas, accion, resplandor, herederos, dava, diseno, horror, reglas, arg, personajes,
pozo, simbolos, entidad, indice, palermo, log, ventas, precio, canales, eventos, whatsapp,
consignacion, red, clientes, registro, ritual, tecnica, proceso, tiempos, cata, metricas,
packaging, sociedad, acuerdo, brownies.

## Lote piloto — Facultad + Ideas sueltas

- `fac-parcial` · tipo articulo · tags csharp, sql, patrones · Agregado: intro + 2 secciones (Programación / Base de datos) con listas y cierre con links a demoado y guía. Sin ejemplos añadidos. Sin banderas.
- `fac-demoado` · tipo proyecto · tags csharp, sql, dotnet · Agregado: intro + Estructura y Claves técnicas en listas + link a parcial. Sin banderas.
- `fac-guia-net` · tipo articulo · tags csharp, dotnet, patrones · Agregado: intro + Plataforma y lenguaje / Moderno y web + link a parcial. `patrones` mapea "pattern matching / SOLID / patrones GoF" presentes en la nota. Sin banderas.
- `fac-info-academica` · tipo proyecto · tags sql, dotnet, csharp · Agregado: intro + Base de datos / Reglas y frontend + links a demoado y yo-proyectos. Sin banderas.
- `idea-1` · tipo coleccion · sin tags (nota de 1 línea; forzar tags inventaría conceptos) · **revisar**: reemplazar por una idea real en IDEAS.md.
- `idea-2` · tipo coleccion · sin tags · **revisar**: ¿sigue vigente el objetivo de demos en vivo?
- `idea-3` · tipo coleccion · sin tags · **revisar**: estado del checkout (¿empezado?).
- `idea-4` · tipo coleccion · tags testing (pareja con yo-habilidades) · **revisar**: ¿los 34 tests siguen en verde?

## Lote Yo (6 notas)

- `yo-perfil` · tipo ficha · tags trayectoria, operaciones, csharp · Agregado: intro + 3 claves (Operaciones / Desarrollo / Fortalezas) con definiciones literales de la nota. Sin ejemplos añadidos. Sin banderas.
- `yo-contacto` · tipo articulo · tags trayectoria · Agregado: intro. Sin bloques (la nota son 2 datos; las claves duplicarían). **revisar**: nada pendiente, nota completa.
- `yo-experiencia` · tipo articulo · tags trayectoria, operaciones · Agregado: intro + 2 secciones (Toxic Shine / Tutoría) con un link a yo-perfil. Sin banderas.
- `yo-educacion` · tipo articulo · tags trayectoria, programacion · Agregado: intro + 3 niveles (Terciario / Curso / Secundaria) + links a fac-parcial y fac-guia-net. Sin banderas.
- `yo-habilidades` · tipo ficha · tags csharp, sql, programacion, testing · Agregado: intro + 3 claves (Lenguajes / Datos y APIs / Calidad). `testing` mapea "tests unitarios" literal. Sin ejemplos añadidos. Sin banderas.
- `yo-proyectos` · tipo proyecto · tags csharp, programacion · Agregado: intro + Proyectos / Método + link a oxi-web-arg. Sin banderas.

## Lote Sistema (7 notas)

- `sis-consilium` · tipo articulo · tags decision, poder, principios · Agregado: intro + 3 secciones (clasifica / tabla / P1-P6) + links a decisorium y plan. Sin ejemplos añadidos. Sin banderas.
- `sis-decisorium` · tipo articulo · tags decision, matriz, evaluacion · Agregado: intro + fórmula en tarjeta de definición (contenido literal de la nota) + reglas + ejemplos + links. Sin banderas.
- `sis-index` · tipo indice · tags mapas, nucleo, estructura · Agregado: intro + Qué contiene + link a integración. Sin banderas.
- `sis-integracion` · tipo indice · tags nucleo, mapas, estructura · Agregado: intro + Señales + links a consilium y consolidado. Sin banderas.
- `sis-plan` · tipo articulo · tags decision, poder, metodo · Agregado: intro + 3 pasadas como secciones + tarjeta "Uso inverso" (contenido literal) + links a paradigmas, sesgos y leyes. Sin banderas.
- `sis-plantilla-persona` · tipo articulo · tags plantillas, principios, poder, metodo · Agregado: intro + grilla + links a príncipe y consilium. Sin banderas.
- `sis-plantilla-fork` · tipo articulo · tags plantillas, matriz, decision, evaluacion · Agregado: intro + ficha + link a decisorium. Sin banderas.

## Lote Biblioteca Mental (8 notas)

Sin ejemplos didácticos añadidos en este lote: las notas ya traen sus propios ejemplos
y la regla 7 los reserva para conceptos generales — aquí no hizo falta inventar ninguno.

- `men-indice-sesgos` · tipo indice · tags sesgos, decision, ventas · Agregado: intro + catálogo en 2 listas + Doble uso + links. Sin banderas.
- `men-plan-venta` · tipo articulo · tags sesgos, ventas · Agregado: intro + Fases como timeline + Métricas + tarjeta de conclusión con la regla de oro literal + links. Sin banderas.
- `men-sesgo-autoridad` · tipo ficha · tags sesgos, ventas, poder · Agregado: intro + 3 claves (Autoridad / Halo / Encuadre) literales + sección Brownies. Sin banderas.
- `men-sesgo-lectura` · tipo ficha · tags sesgos, ventas, decision · Agregado: intro + 3 claves literales + Antídoto y uso. Sin banderas.
- `men-paradigmas` · tipo articulo · tags decision, metodo, accion · Agregado: intro + método en timeline de 4 pasos + link a bro-paradigma. Sin banderas.
- `men-rapidos` · tipo articulo · tags decision, accion · Agregado: intro + actuar / frenar / filtro + link a decisorium. Sin banderas.
- `men-leyes` · tipo articulo · tags poder, decision · Agregado: intro + muestra + uso + links. Nota densa resumida en muestra; el detalle vive en el .md. Sin banderas.
- `men-principe` · tipo articulo · tags poder, decision · Agregado: intro + ideas + links. Sin banderas.

## Lote Proyecto Oxida (18 notas)

Sin ejemplos añadidos: el universo se presenta con sus propios términos y cifras.
`oxi-indice` suma el tag `indice` (pareja futura con `bro-consolidado` en el lote Brownies).

- `oxi-indice` · tipo indice · tags resplandor, dava, herederos, indice · Agregado: intro + reparto + claves + links. Sin banderas.
- `oxi-notas-autor` · tipo articulo · tags diseno, horror, reglas · Agregado: intro + ejes + regla moral + prohibiciones. Sin banderas.
- `oxi-analisis` · tipo articulo · tags diseno, horror, reglas · Agregado: intro + falta + terror. Solo usa lo que la nota trae (sin fases inventadas). Sin banderas.
- `oxi-horror` · tipo articulo · tags diseno, horror · Agregado: intro + pilares + sonido. Sin banderas.
- `oxi-resplandor` · tipo articulo · tags resplandor, entidad · Agregado: intro + manifestaciones + voces y límites. Sin banderas.
- `oxi-tenue` · tipo articulo · tags resplandor, herederos, entidad · Agregado: intro + efecto + pozo azul. Sin banderas.
- `oxi-herederos` · tipo articulo · tags herederos, resplandor, dava, simbolos · Agregado: intro + capacidades + casos. Sin banderas.
- `oxi-lucian` · tipo articulo · tags herederos, personajes, pozo · Agregado: intro + contradicción + río. Sin banderas.
- `oxi-descendiente` · tipo articulo · tags herederos, personajes, dava · Agregado: intro + estado + links. **revisar**: ocupación pendiente de definir en el .md original.
- `oxi-dava` · tipo articulo · tags dava, herederos · Agregado: intro + origen + método. Sin banderas.
- `oxi-investigador` · tipo articulo · tags dava, personajes · Agregado: intro + descubrimiento + sabotaje. Sin banderas.
- `oxi-cerebro` · tipo articulo · tags dava, resplandor · Agregado: intro + hallazgo + preguntas (las del propio texto). Sin banderas.
- `oxi-ka` · tipo articulo · tags pozo, herederos · Agregado: intro + intentos + descenso. Sin banderas.
- `oxi-capitulo` · tipo articulo · tags arg, simbolos · Agregado: intro + habitación + mensajes + quiebre. Sin banderas.
- `oxi-informe` · tipo articulo · tags dava, resplandor · Agregado: intro + evidencias + estado. Sin banderas.
- `oxi-mapa-tension` · tipo articulo · tags diseno, arg · Agregado: intro + escalada + claves. Sin banderas.
- `oxi-web-arg` · tipo proyecto · tags arg, diseno · Agregado: intro + secciones + assets y pendiente. Sin banderas.
- `oxi-sesgos-uso` · tipo articulo · tags sesgos, resplandor, dava · Agregado: intro + vectores. Sin banderas.

## Lote Proyecto Brownies (24 notas)

Sin ejemplos añadidos. `men-plan-venta` suma el tag `brownies` ("Brownies como caso aplicado",
literal de su resumen). Mapeos documentados: `metodo` en bro-paradigma (revisión mensual como
método), `proceso` (título "Procesamiento" en errores + estándar en protocolo).

- `bro-adn` · tipo articulo · tags brownies · Agregado: intro + propuesta + diferenciación. 1 solo tag por nota breve. **revisar**: nada, nota completa.
- `bro-okr` · tipo proyecto · tags palermo, canales, metricas · Agregado: intro + escalera como timeline + KR. Sin banderas.
- `bro-acuerdo` · tipo articulo · tags sociedad, acuerdo · Agregado: intro + roles + reglas. Sin banderas.
- `bro-fase1` · tipo articulo · tags log, cata · Agregado: intro + método + qué se mide. Sin banderas.
- `bro-fase2` · tipo articulo · tags palermo, packaging · Agregado: intro + entrega + checklist. Sin banderas.
- `bro-fase3` · tipo articulo · tags palermo, ventas, canales, whatsapp, consignacion, precio · Agregado: intro + fórmula + canales y promos. Sin banderas.
- `bro-eventos` · tipo proyecto · tags eventos, whatsapp · Agregado: intro + 3 eventos como timeline. Sin banderas.
- `bro-calendario` · tipo articulo · tags tiempos · Agregado: intro + hitos + nota legal. 1 solo tag. **revisar**: nota completa pero mínima.
- `bro-protocolo-manteca` · tipo proyecto · tags tecnica, tiempos, proceso · Agregado: intro + 5 fases como timeline + reglas. Sin banderas.
- `bro-errores` · tipo articulo · tags tecnica, proceso · Agregado: intro + lista de 5. Sin banderas.
- `bro-clientes-semilla` · tipo articulo · tags clientes, log, eventos, whatsapp, consignacion · Agregado: intro + registro + reglas. Sin banderas.
- `bro-consolidado` · tipo indice · tags indice · Agregado: intro + contenido + estado. 1 solo tag. **revisar**: nada, es índice por naturaleza.
- `bro-accion` · tipo articulo · tags palermo, log, cata · Agregado: intro + plan + después. Sin banderas.
- `bro-mapa` · tipo articulo · tags palermo, log · Agregado: intro + zonas + tarea. Sin banderas.
- `bro-paradigma` · tipo articulo · tags decision, metodo · Agregado: intro + cambio + práctica. Sin banderas.
- `bro-log` · tipo articulo · tags ritual, ventas, registro · Agregado: intro + qué/cómo/disciplina. Sin banderas.
- `bro-checklist` · tipo articulo · tags ritual, palermo · Agregado: intro + vestimenta + antes de salir. Sin banderas.
- `bro-protocolo-venta` · tipo articulo · tags ventas, log, registro · Agregado: intro + guion + actitud + postventa. Sin banderas.
- `bro-competencia` · tipo articulo · tags precio, metricas, packaging · Agregado: intro + qué anotar + lectura. Sin banderas.
- `bro-sesgos-palermo` · tipo articulo · tags sesgos, ventas, palermo · Agregado: intro + motores + base. Sin banderas.
- `con-luciano` · tipo articulo · tags sociedad, acuerdo · Agregado: intro + roles + números + convivencia. Sin banderas.
- `con-clientes` · tipo articulo · tags red, clientes · Agregado: intro + ficha + ejemplo. Sin banderas.
- `con-locales` · tipo articulo · tags red, consignacion · Agregado: intro + acuerdo + reglas. Sin banderas.
- `con-proveedores` · tipo articulo · tags red, precio · Agregado: intro + quiénes + reglas. Sin banderas.

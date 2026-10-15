# Revisión de contenido — checklist por nota

Fuente: `frontend/src/data/vault.ts` (el Vault .md original en disco no se releyó;
los resúmenes usados para reescribir provienen de la lectura exhaustiva previa del vault).
Reglas aplicadas: ids/títulos/resúmenes/puntos/relaciones/origen intactos; solo se suma
`tipo`, `intro`, `claves`, `bloques` y `tags`. Sin ejemplos didácticos añadidos hasta ahora
(toda ilustración viene de las propias notas).

Vocabulario controlado de tags (minúsculas, cada uno con 2+ usos al cerrar cada lote):
csharp, sql, patrones, dotnet, trayectoria, operaciones, programacion, testing,
decision, poder, principios, matriz, evaluacion, mapas, nucleo, estructura, metodo, plantillas,
sesgos, ventas, accion.

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

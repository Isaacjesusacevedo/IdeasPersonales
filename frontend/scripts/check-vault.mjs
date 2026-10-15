// Validador del vault sin dependencias: parsea frontend/src/data/vault.ts como texto.
// Uso: npm run check:vault
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = readFileSync(join(root, 'src', 'data', 'vault.ts'), 'utf8')

let errores = 0
const fail = (msg) => { errores++; console.error('✗ ' + msg) }
const ok = (msg) => console.log('✓ ' + msg)

// Recorta la región del array `notas` (ignora `secciones`)
const ini = src.indexOf('export const notas')
if (ini < 0) { fail('no se encontró el array notas'); process.exit(1) }
const region = src.slice(ini)

// Scanner con estado de string: divide la región en objetos de nota por
// profundidad de llaves (ignora llaves dentro de '...' y `...`)
function splitNotas(texto) {
  const notas = []
  let i = texto.indexOf('[')
  let depth = 0
  let cur = ''
  let instr = null // "'" | '`'
  let started = false
  for (let k = i; k < texto.length; k++) {
    const ch = texto[k]
    if (instr) {
      cur += ch
      if (ch === instr && texto[k - 1] !== '\\') instr = null
      continue
    }
    if (ch === "'" || ch === '`') { instr = ch; cur += ch; continue }
    if (ch === '{') {
      depth++
      if (depth === 1) { cur = '{'; started = true; continue }
    }
    if (ch === '}') {
      depth--
      if (started) cur += ch
      if (depth === 0 && started) { notas.push(cur); cur = ''; started = false; continue }
      continue
    }
    if (started) cur += ch
    if (depth === 0 && ch === ']' && notas.length) break
  }
  return notas
}

const bloques = splitNotas(region)
const ids = bloques.map(b => (b.match(/id:\s*'([^']+)'/) || [])[1]).filter(Boolean)
const dup = ids.filter((id, i) => ids.indexOf(id) !== i)
if (!ids.length) fail('no se detectaron notas')
else if (dup.length) fail('ids duplicados: ' + [...new Set(dup)].join(', '))
else ok(ids.length + ' ids únicos')

// Campos originales presentes en cada nota
const requeridos = ['titulo', 'resumen', 'puntos', 'relaciones', 'origen']
bloques.forEach((b, i) => {
  const id = ids[i] ?? `#${i}`
  for (const c of requeridos) {
    if (!new RegExp(`\\b${c}\\s*:`).test(b)) fail(`${id}: falta campo original "${c}"`)
  }
})
ok('campos originales presentes')

// Relaciones válidas
const setIds = new Set(ids)
let rotas = 0
for (const b of bloques) {
  const id = (b.match(/id:\s*'([^']+)'/) || [])[1] ?? '?'
  const m = b.match(/relaciones:\s*\[([^\]]*)\]/s)
  const rels = m ? [...m[1].matchAll(/'([^']+)'/g)].map(x => x[1]) : []
  for (const r of rels) {
    if (!setIds.has(r)) { fail(`${id}: relación rota → ${r}`); rotas++ }
  }
}
if (!rotas) ok('0 relaciones rotas')

// Links [[id]] / [[id|texto]] válidos
let linksRotos = 0
for (const m of region.matchAll(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g)) {
  const id = m[1].trim()
  if (!setIds.has(id)) { fail(`[[link]] roto → ${id}`); linksRotos++ }
}
if (!linksRotos) ok('0 links [[...]] rotos')

// Tags: vocabulario en minúsculas con 2+ usos
const usos = {}
for (const m of region.matchAll(/tags:\s*\[([^\]]*)\]/gs)) {
  for (const t of m[1].matchAll(/'([^']+)'/g)) {
    const tag = t[1]
    usos[tag] = (usos[tag] || 0) + 1
    if (tag !== tag.toLowerCase()) fail(`tag no minúscula: ${tag}`)
  }
}
const tags = Object.keys(usos)
const huerfanas = tags.filter(t => usos[t] < 2)
if (huerfanas.length) fail('tags con <2 usos: ' + huerfanas.join(', '))
else ok(tags.length + ' tags con 2+ usos (o sin tags aún)')

if (errores) { console.error(`\n${errores} error(es)`); process.exit(1) }
console.log('\nvault OK')

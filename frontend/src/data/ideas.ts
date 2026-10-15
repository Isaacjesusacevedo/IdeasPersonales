export interface Idea {
  id: string
  titulo: string
  categoria: string
  estado: 'nueva' | 'en-curso' | 'hecha'
  fecha: string
  resumen: string
  detalle: string
}

export const ideas: Idea[] = [
  {
    id: '1',
    titulo: 'Mi primera idea',
    categoria: 'Personal',
    estado: 'nueva',
    fecha: '2026-10-15',
    resumen: 'Ejemplo inicial para leer siempre que necesites inspiración.',
    detalle: 'Bórrame y escribe tu primera idea real en IDEAS.md. Este detalle replica la vista Detalle-Semana de La Industrial: header + card + badges.'
  },
  {
    id: '2',
    titulo: 'Portfolio con demos en vivo',
    categoria: 'Carrera',
    estado: 'en-curso',
    fecha: '2026-10-14',
    resumen: 'Publicar 2-3 proyectos con demo y repo público.',
    detalle: 'Igual que el módulo Productos en La Industrial: catálogo global, tabla con badges de estado y acción Ver.'
  },
  {
    id: '3',
    titulo: 'Checkout MercadoPago en Brana',
    categoria: 'Brana',
    estado: 'nueva',
    fecha: '2026-10-13',
    resumen: 'Pagos reales en el e-commerce esotérico.',
    detalle: 'Pendiente crítico estilo Dashboard de La Industrial: alerta ámbar, ruta y CTA.'
  },
  {
    id: '4',
    titulo: 'Tests xUnit + Vitest',
    categoria: 'Calidad',
    estado: 'hecha',
    fecha: '2026-10-10',
    resumen: 'Base de 34 tests en verde como en Sistema Industrial.',
    detalle: 'Referencia directa a la deuda técnica resuelta en PROYECTO.md v1.2.0.'
  }
]

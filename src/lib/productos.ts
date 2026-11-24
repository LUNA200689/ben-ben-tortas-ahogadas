export type Producto = {
  id: string
  nombre: string
  categoria: 'tortas' | 'especialidad' | 'tacos' | 'paquetes'
  precio: number
  notas?: string
}

export const PRODUCTOS: Producto[] = [
  { id: 'torta-carnita', nombre: 'Torta Ahogada de Carnita', categoria: 'tortas', precio: 70 },
  { id: 'torta-buche', nombre: 'Torta Ahogada de Buche', categoria: 'tortas', precio: 80 },
  { id: 'torta-lengua', nombre: 'Torta Ahogada de Lengua', categoria: 'tortas', precio: 80 },
  { id: 'torta-combinada', nombre: 'Torta Ahogada Combinada', categoria: 'tortas', precio: 80 },
  {
    id: 'torta-camaron',
    nombre: 'Torta Ahogada de Camarón',
    categoria: 'especialidad',
    precio: 100,
    notas: 'Solo sábado y domingo',
  },
  { id: 'taco-sencillo', nombre: 'Taco Dorado Sencillo', categoria: 'tacos', precio: 14 },
  { id: 'taco-carne', nombre: 'Taco Dorado con Carne', categoria: 'tacos', precio: 32 },
  { id: 'paquete-1', nombre: 'Paquete 1: Torta Ahogada + 3 Tacos Sencillos', categoria: 'paquetes', precio: 94 },
  { id: 'paquete-2', nombre: 'Paquete 2: 5 Tacos Dorados Sencillos', categoria: 'paquetes', precio: 60 },
  { id: 'paquete-3', nombre: 'Paquete 3: 2 Tacos con Carne + 3 Sencillos', categoria: 'paquetes', precio: 90 },
]

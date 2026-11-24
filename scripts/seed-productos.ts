/**
 * Inicializa los productos del menú de BEN-BEN con los precios actuales.
 * Este script se ejecuta una sola vez para poblar la base de datos.
 */
import { db } from '../src/lib/db'

async function main() {
  // Limpiar productos existentes
  await db.producto.deleteMany({})
  await db.ventaItem.deleteMany({})
  await db.venta.deleteMany({})

  const productos = [
    // TORTAS AHOGADAS
    { nombre: 'Torta Ahogada de Carnita', categoria: 'tortas', precio: 70 },
    { nombre: 'Torta Ahogada de Buche', categoria: 'tortas', precio: 80 },
    { nombre: 'Torta Ahogada de Lengua', categoria: 'tortas', precio: 80 },
    { nombre: 'Torta Ahogada Combinada', categoria: 'tortas', precio: 80 },
    { nombre: 'Torta Ahogada de Camarón', categoria: 'especialidad', precio: 100, notas: 'Solo sábado y domingo' },

    // TACOS DORADOS
    { nombre: 'Taco Dorado Sencillo', categoria: 'tacos', precio: 14 },
    { nombre: 'Taco Dorado con Carne', categoria: 'tacos', precio: 32 },

    // PAQUETES
    { nombre: 'Paquete 1: Torta Ahogada + 3 Tacos Sencillos', categoria: 'paquetes', precio: 94 },
    { nombre: 'Paquete 2: 5 Tacos Dorados Sencillos', categoria: 'paquetes', precio: 60 },
    { nombre: 'Paquete 3: 2 Tacos con Carne + 3 Sencillos', categoria: 'paquetes', precio: 90 },
  ]

  for (const p of productos) {
    await db.producto.create({ data: p })
  }

  const count = await db.producto.count()
  console.log(`OK ${count} productos inicializados en la base de datos.`)
}

main()
  .catch((e) => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/productos - Lista todos los productos del menú
export async function GET() {
  try {
    const productos = await db.producto.findMany({
      where: { disponible: true },
      orderBy: [
        { categoria: 'asc' },
        { precio: 'asc' },
      ],
    })
    return NextResponse.json({ productos })
  } catch (error) {
    console.error('Error al obtener productos:', error)
    return NextResponse.json(
      { error: 'Error al obtener productos' },
      { status: 500 }
    )
  }
}

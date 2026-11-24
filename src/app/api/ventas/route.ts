import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST /api/ventas - Registrar una nueva venta
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { items, metodoPago, nota } = body as {
      items: { productoId?: string; productoNombre: string; precio: number; cantidad: number }[]
      metodoPago: 'efectivo' | 'tarjeta' | 'transferencia'
      nota?: string
    }

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'La venta debe tener al menos un producto' }, { status: 400 })
    }

    if (!['efectivo', 'tarjeta', 'transferencia'].includes(metodoPago)) {
      return NextResponse.json({ error: 'Método de pago inválido' }, { status: 400 })
    }

    // Calcular total
    const itemsConSubtotal = items.map((it) => ({
      ...it,
      subtotal: it.precio * it.cantidad,
    }))
    const total = itemsConSubtotal.reduce((sum, it) => sum + it.subtotal, 0)

    const venta = await db.venta.create({
      data: {
        total,
        metodoPago,
        nota: nota || null,
        items: {
          create: itemsConSubtotal.map((it) => ({
            productoId: it.productoId || null,
            productoNombre: it.productoNombre,
            precio: it.precio,
            cantidad: it.cantidad,
            subtotal: it.subtotal,
          })),
        },
      },
      include: { items: true },
    })

    return NextResponse.json({ venta }, { status: 201 })
  } catch (error) {
    console.error('Error al registrar venta:', error)
    return NextResponse.json({ error: 'Error al registrar venta' }, { status: 500 })
  }
}

// GET /api/ventas - Lista todas las ventas (para reportes)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const fecha = searchParams.get('fecha') // YYYY-MM-DD

    let where = {}
    if (fecha) {
      const inicio = new Date(`${fecha}T00:00:00`)
      const fin = new Date(`${fecha}T23:59:59`)
      where = { fecha: { gte: inicio, lte: fin } }
    }

    const ventas = await db.venta.findMany({
      where,
      include: { items: true },
      orderBy: { fecha: 'desc' },
    })

    const totalDelDia = ventas.reduce((sum, v) => sum + v.total, 0)
    const totalPorMetodo = {
      efectivo: ventas.filter((v) => v.metodoPago === 'efectivo').reduce((s, v) => s + v.total, 0),
      tarjeta: ventas.filter((v) => v.metodoPago === 'tarjeta').reduce((s, v) => s + v.total, 0),
      transferencia: ventas.filter((v) => v.metodoPago === 'transferencia').reduce((s, v) => s + v.total, 0),
    }
    const numVentas = ventas.length
    const ticketPromedio = numVentas > 0 ? totalDelDia / numVentas : 0

    return NextResponse.json({
      ventas,
      resumen: {
        totalDelDia,
        numVentas,
        ticketPromedio,
        totalPorMetodo,
      },
    })
  } catch (error) {
    console.error('Error al obtener ventas:', error)
    return NextResponse.json({ error: 'Error al obtener ventas' }, { status: 500 })
  }
}

// DELETE /api/ventas - Eliminar una venta por ID
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'ID requerido' }, { status: 400 })
    }
    await db.venta.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error al eliminar venta:', error)
    return NextResponse.json({ error: 'Error al eliminar venta' }, { status: 500 })
  }
}

'use client'

import { useEffect, useState, useMemo } from 'react'
import { Plus, Minus, Trash2, ShoppingCart, Check, X, Banknote, CreditCard, Send, Printer, TrendingUp, Calendar, Receipt } from 'lucide-react'
import { LogoBenBenMini } from './LogoBenBen'
import { PRODUCTOS, type Producto } from '@/lib/productos'

type CarritoItem = {
  producto: Producto
  cantidad: number
}

type VentaGuardada = {
  id: string
  fecha: string
  total: number
  metodoPago: string
  nota?: string | null
  items: { productoNombre: string; precio: number; cantidad: number; subtotal: number }[]
}

const STORAGE_KEY = 'benben-ventas'

const categoriaLabels: Record<string, string> = {
  tortas: 'Tortas Ahogadas',
  especialidad: 'Especialidad',
  tacos: 'Tacos Dorados',
  paquetes: 'Paquetes',
}

export function RegistrarVenta() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [carrito, setCarrito] = useState<CarritoItem[]>([])
  const [metodoPago, setMetodoPago] = useState<'efectivo' | 'tarjeta' | 'transferencia'>('efectivo')
  const [nota, setNota] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('todas')
  const [guardando, setGuardando] = useState(false)
  const [ventaExitosa, setVentaExitosa] = useState<VentaGuardada | null>(null)
  const [ventasDelDia, setVentasDelDia] = useState<VentaGuardada[]>([])
  const [tabActivo, setTabActivo] = useState<'vender' | 'hoy' | 'reporte'>('vender')

  useEffect(() => {
    cargarProductos()
    cargarVentasDelDia()
  }, [])

  function cargarProductos() {
    setProductos(PRODUCTOS)
  }

  function leerVentas(): VentaGuardada[] {
    try {
      const guardadas = window.localStorage.getItem(STORAGE_KEY)
      return guardadas ? JSON.parse(guardadas) : []
    } catch {
      return []
    }
  }

  function guardarVentas(ventas: VentaGuardada[]) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ventas))
  }

  function cargarVentasDelDia() {
    const hoy = new Date().toISOString().slice(0, 10)
    setVentasDelDia(leerVentas().filter((venta) => venta.fecha.slice(0, 10) === hoy))
  }

  function agregarAlCarrito(p: Producto) {
    setCarrito((prev) => {
      const existente = prev.find((i) => i.producto.id === p.id)
      if (existente) {
        return prev.map((i) =>
          i.producto.id === p.id ? { ...i, cantidad: i.cantidad + 1 } : i
        )
      }
      return [...prev, { producto: p, cantidad: 1 }]
    })
  }

  function cambiarCantidad(productoId: string, delta: number) {
    setCarrito((prev) =>
      prev
        .map((i) =>
          i.producto.id === productoId ? { ...i, cantidad: i.cantidad + delta } : i
        )
        .filter((i) => i.cantidad > 0)
    )
  }

  function quitarDelCarrito(productoId: string) {
    setCarrito((prev) => prev.filter((i) => i.producto.id !== productoId))
  }

  const total = useMemo(
    () => carrito.reduce((s, i) => s + i.producto.precio * i.cantidad, 0),
    [carrito]
  )

  const numItems = useMemo(
    () => carrito.reduce((s, i) => s + i.cantidad, 0),
    [carrito]
  )

  function registrarVenta() {
    if (carrito.length === 0) return
    setGuardando(true)
    try {
      const venta: VentaGuardada = {
        id: `venta-${Date.now()}`,
        fecha: new Date().toISOString(),
        total,
        metodoPago,
        nota: nota.trim() || null,
        items: carrito.map((i) => ({
          productoNombre: i.producto.nombre,
          precio: i.producto.precio,
          cantidad: i.cantidad,
          subtotal: i.producto.precio * i.cantidad,
        })),
      }
      guardarVentas([venta, ...leerVentas()])
      setVentaExitosa(venta)
      setCarrito([])
      setNota('')
      cargarVentasDelDia()
    } catch (e) {
      console.error('No se pudo guardar la venta localmente', e)
    } finally {
      setGuardando(false)
    }
  }

  function eliminarVenta(id: string) {
    if (!confirm('¿Eliminar esta venta? Esta acción no se puede deshacer.')) return
    guardarVentas(leerVentas().filter((venta) => venta.id !== id))
    cargarVentasDelDia()
  }

  const productosFiltrados = categoriaFiltro === 'todas'
    ? productos
    : productos.filter((p) => p.categoria === categoriaFiltro)

  // Resumen del día
  const totalHoy = ventasDelDia.reduce((s, v) => s + v.total, 0)
  const ventasPorMetodo = {
    efectivo: ventasDelDia.filter((v) => v.metodoPago === 'efectivo').reduce((s, v) => s + v.total, 0),
    tarjeta: ventasDelDia.filter((v) => v.metodoPago === 'tarjeta').reduce((s, v) => s + v.total, 0),
    transferencia: ventasDelDia.filter((v) => v.metodoPago === 'transferencia').reduce((s, v) => s + v.total, 0),
  }

  return (
    <div className="min-h-screen bg-pattern-negro">
      {/* Header */}
      <header className="bg-pattern-verde text-benben-cream sticky top-0 z-30 shadow-lg border-b-2 border-benben-orange/30">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <LogoBenBenMini />
          <span className="text-xs bg-benben-cream/10 px-3 py-1 rounded-full border border-benben-orange/30">Gestión de Ventas</span>
        </div>
      </header>

      {/* Tabs internos */}
      <div className="bg-black text-benben-cream sticky top-[57px] z-20 shadow border-b border-benben-green/30">
        <div className="max-w-5xl mx-auto flex">
          {[
            { id: 'vender', label: 'Registrar Venta', icon: ShoppingCart },
            { id: 'hoy', label: 'Ventas de Hoy', icon: Calendar },
            { id: 'reporte', label: 'Resumen del Día', icon: TrendingUp },
          ].map((t) => {
            const Icon = t.icon
            return (
              <button
                key={t.id}
                onClick={() => setTabActivo(t.id as typeof tabActivo)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs sm:text-sm font-semibold transition ${
                  tabActivo === t.id
                    ? 'bg-benben-green text-benben-cream'
                    : 'text-benben-cream/80 hover:bg-benben-green/30'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-6 pb-24">
        {/* ============ TAB: VENDER ============ */}
        {tabActivo === 'vender' && (
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Catálogo */}
            <div className="lg:col-span-3">
              {/* Filtros */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                <button
                  onClick={() => setCategoriaFiltro('todas')}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                    categoriaFiltro === 'todas'
                      ? 'bg-benben-green text-benben-cream'
                      : 'bg-benben-black-soft text-benben-cream border border-benben-green/30'
                  }`}
                >
                  Todo
                </button>
                {Object.entries(categoriaLabels).map(([cat, label]) => (
                  <button
                    key={cat}
                    onClick={() => setCategoriaFiltro(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                      categoriaFiltro === cat
                        ? 'bg-benben-green text-benben-cream'
                        : 'bg-benben-black-soft text-benben-cream border border-benben-green/30'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Productos */}
              <div className="grid sm:grid-cols-2 gap-3">
                {productosFiltrados.map((p) => {
                  const enCarrito = carrito.find((i) => i.producto.id === p.id)
                  return (
                    <button
                      key={p.id}
                      onClick={() => agregarAlCarrito(p)}
                      className={`text-left bg-benben-black-soft rounded-xl p-4 border-2 transition hover:shadow-lg hover:border-benben-orange/50 ${
                        enCarrito
                          ? 'border-benben-green shadow-md'
                          : 'border-benben-green/30'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h4 className="font-display font-bold text-benben-cream text-sm leading-snug">
                            {p.nombre}
                          </h4>
                          {p.notas && (
                            <p className="text-[10px] text-benben-orange mt-0.5 font-semibold">{p.notas}</p>
                          )}
                        </div>
                        <span className="font-display font-black text-lg text-benben-orange leading-none">
                          ${p.precio}
                        </span>
                      </div>
                      {enCarrito && (
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs text-benben-orange font-bold">
                            En carrito: {enCarrito.cantidad}
                          </span>
                          <Plus className="w-4 h-4 text-benben-orange" />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Carrito */}
            <div className="lg:col-span-2">
              <div className="bg-benben-black-soft rounded-2xl shadow-lg border border-benben-green/40 sticky top-[120px]">
                <div className="bg-benben-green text-benben-cream px-5 py-3 rounded-t-2xl flex items-center gap-2 border-b-2 border-benben-orange/40">
                  <ShoppingCart className="w-5 h-5" />
                  <h3 className="font-display font-bold">Venta actual</h3>
                  {numItems > 0 && (
                    <span className="ml-auto bg-benben-orange text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {numItems} {numItems === 1 ? 'artículo' : 'artículos'}
                    </span>
                  )}
                </div>

                <div className="p-4 max-h-[40vh] overflow-y-auto">
                  {carrito.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <ShoppingCart className="w-10 h-10 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">Toca productos del catálogo para agregarlos</p>
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      {carrito.map((i) => (
                        <li key={i.producto.id} className="bg-benben-black rounded-xl p-3 border border-benben-green/30">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-sm text-benben-cream truncate">
                                {i.producto.nombre}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                ${i.producto.precio} c/u
                              </p>
                            </div>
                            <button
                              onClick={() => quitarDelCarrito(i.producto.id)}
                              className="text-benben-red hover:bg-benben-red/20 p-1 rounded"
                              aria-label="Quitar"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => cambiarCantidad(i.producto.id, -1)}
                                className="bg-benben-black-soft border border-benben-green/40 w-7 h-7 rounded-md flex items-center justify-center hover:bg-benben-green/30 text-benben-cream"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="font-bold w-8 text-center text-benben-cream">{i.cantidad}</span>
                              <button
                                onClick={() => cambiarCantidad(i.producto.id, 1)}
                                className="bg-benben-black-soft border border-benben-green/40 w-7 h-7 rounded-md flex items-center justify-center hover:bg-benben-green/30 text-benben-cream"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <span className="font-display font-black text-benben-orange">
                              ${i.producto.precio * i.cantidad}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Total y pago */}
                {carrito.length > 0 && (
                  <div className="border-t border-benben-green/30 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-muted-foreground uppercase tracking-wider">Total</span>
                      <span className="font-display font-black text-3xl text-benben-orange">
                        ${total.toFixed(0)}
                      </span>
                    </div>

                    {/* Método de pago */}
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Método de pago</p>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {[
                        { id: 'efectivo', label: 'Efectivo', Icon: Banknote },
                        { id: 'tarjeta', label: 'Tarjeta', Icon: CreditCard },
                        { id: 'transferencia', label: 'Transf.', Icon: Send },
                      ].map(({ id, label, Icon }) => (
                        <button
                          key={id}
                          onClick={() => setMetodoPago(id as typeof metodoPago)}
                          className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg border-2 text-[10px] font-bold transition ${
                            metodoPago === id
                              ? 'bg-benben-green text-benben-cream border-benben-orange'
                              : 'bg-benben-black-soft text-benben-cream border-benben-green/30'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {label}
                        </button>
                      ))}
                    </div>

                    {/* Nota opcional */}
                    <input
                      type="text"
                      value={nota}
                      onChange={(e) => setNota(e.target.value)}
                      placeholder="Nota (ej: para llevar, domicilio...)"
                      className="w-full bg-benben-black rounded-lg px-3 py-2 text-sm border border-benben-green/40 focus:outline-none focus:border-benben-orange mb-3 text-benben-cream placeholder:text-muted-foreground/60"
                    />

                    <button
                      onClick={registrarVenta}
                      disabled={guardando}
                      className="w-full bg-benben-red text-white py-3 rounded-xl font-display font-bold text-sm hover:bg-benben-red/90 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {guardando ? (
                        <>Guardando...</>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          Registrar venta · ${total.toFixed(0)}
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ============ TAB: VENTAS DE HOY ============ */}
        {tabActivo === 'hoy' && (
          <div>
            <div className="text-center mb-6">
              <p className="font-display text-benben-red text-xs font-bold tracking-[0.3em] uppercase mb-1">
                {new Date().toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
              <h2 className="font-display font-black text-3xl text-benben-green-dark">
                Ventas de hoy
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {ventasDelDia.length} {ventasDelDia.length === 1 ? 'venta registrada' : 'ventas registradas'}
              </p>
            </div>

            {ventasDelDia.length === 0 ? (
              <div className="bg-benben-black-soft rounded-2xl p-12 text-center border border-benben-green/30">
                <Receipt className="w-12 h-12 mx-auto mb-3 text-muted-foreground/40" />
                <p className="font-display font-bold text-lg text-benben-cream mb-1">
                  Aún no hay ventas hoy
                </p>
                <p className="text-sm text-muted-foreground">
                  Toca &ldquo;Registrar Venta&rdquo; para empezar a registrar
                </p>
                <button
                  onClick={() => setTabActivo('vender')}
                  className="mt-4 bg-benben-green text-benben-cream px-5 py-2 rounded-lg text-sm font-bold"
                >
                  Registrar mi primera venta
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {ventasDelDia.map((v, idx) => (
                  <div key={v.id} className="bg-benben-black-soft rounded-xl p-4 border border-benben-green/30 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-display font-bold text-benben-cream text-sm">
                            Venta #{ventasDelDia.length - idx}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(v.fecha).toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            v.metodoPago === 'efectivo' ? 'bg-green-900 text-green-300 border border-green-700' :
                            v.metodoPago === 'tarjeta' ? 'bg-blue-900 text-blue-300 border border-blue-700' :
                            'bg-orange-900 text-orange-300 border border-orange-700'
                          }`}>
                            {v.metodoPago}
                          </span>
                        </div>
                        <ul className="text-xs text-muted-foreground space-y-0.5 mb-1">
                          {v.items.map((it, i) => (
                            <li key={i}>
                              {it.cantidad}× {it.productoNombre} — ${it.subtotal}
                            </li>
                          ))}
                        </ul>
                        {v.nota && (
                          <p className="text-xs italic text-benben-orange mt-1">📝 {v.nota}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-display font-black text-xl text-benben-orange">
                          ${v.total.toFixed(0)}
                        </p>
                        <button
                          onClick={() => eliminarVenta(v.id)}
                          className="text-[10px] text-muted-foreground hover:text-benben-red mt-1"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ============ TAB: REPORTE ============ */}
        {tabActivo === 'reporte' && (
          <div>
            <div className="text-center mb-6">
              <p className="font-display text-benben-red text-xs font-bold tracking-[0.3em] uppercase mb-1">Resumen</p>
              <h2 className="font-display font-black text-3xl text-benben-green-dark">
                Total del día
              </h2>
            </div>

            {/* Total grande */}
            <div className="bg-gradient-to-br from-benben-green to-benben-green-dark text-benben-cream rounded-3xl p-8 shadow-xl mb-6 text-center">
              <p className="text-xs uppercase tracking-widest opacity-80 mb-1">Ingresos totales de hoy</p>
              <p className="font-display font-black text-5xl sm:text-6xl text-benben-orange">
                ${totalHoy.toFixed(0)}
              </p>
              <p className="text-xs opacity-80 mt-2">
                {ventasDelDia.length} {ventasDelDia.length === 1 ? 'venta' : 'ventas'} · Ticket promedio ${(ventasDelDia.length ? (totalHoy / ventasDelDia.length).toFixed(0) : 0)}
              </p>
            </div>

            {/* Por método de pago */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: 'Efectivo', valor: ventasPorMetodo.efectivo, Icon: Banknote, color: 'bg-green-700' },
                { label: 'Tarjeta', valor: ventasPorMetodo.tarjeta, Icon: CreditCard, color: 'bg-blue-700' },
                { label: 'Transfer.', valor: ventasPorMetodo.transferencia, Icon: Send, color: 'bg-orange-700' },
              ].map(({ label, valor, Icon, color }) => (
                <div key={label} className="bg-benben-black-soft rounded-2xl p-4 border border-benben-green/30 text-center">
                  <div className={`inline-flex ${color} text-white p-2 rounded-lg mb-2`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="font-display font-black text-xl text-benben-orange">
                    ${valor.toFixed(0)}
                  </p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
                </div>
              ))}
            </div>

            {/* Productos más vendidos */}
            {ventasDelDia.length > 0 && (
              <div className="bg-benben-black-soft rounded-2xl p-5 border border-benben-green/30">
                <h3 className="font-display font-bold text-benben-cream mb-3">
                  📊 Productos vendidos hoy
                </h3>
                <div className="space-y-2">
                  {Object.entries(
                    ventasDelDia
                      .flatMap((v) => v.items)
                      .reduce((acc: Record<string, { cantidad: number; subtotal: number }>, it) => {
                        if (!acc[it.productoNombre]) acc[it.productoNombre] = { cantidad: 0, subtotal: 0 }
                        acc[it.productoNombre].cantidad += it.cantidad
                        acc[it.productoNombre].subtotal += it.subtotal
                        return acc
                      }, {})
                  )
                    .sort((a, b) => b[1].cantidad - a[1].cantidad)
                    .map(([nombre, datos]) => (
                      <div key={nombre} className="flex items-center justify-between text-sm py-2 border-b border-benben-green/20 last:border-0">
                        <span className="text-benben-cream font-medium">{nombre}</span>
                        <span className="text-muted-foreground">
                          <span className="font-bold text-benben-orange">{datos.cantidad}×</span> · ${datos.subtotal}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            <p className="text-center text-xs text-muted-foreground mt-6">
              Estos datos se guardan en este dispositivo y navegador; no se sincronizan entre teléfonos.
            </p>
          </div>
        )}
      </main>

      {/* Modal de venta exitosa */}
      {ventaExitosa && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-benben-black-soft rounded-2xl p-6 max-w-sm w-full text-center border-2 border-benben-green">
            <div className="w-16 h-16 bg-benben-green rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-9 h-9 text-white" strokeWidth={3} />
            </div>
            <h3 className="font-display font-black text-2xl text-benben-cream mb-1">
              ¡Venta registrada!
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {ventaExitosa.items.length} {ventaExitosa.items.length === 1 ? 'artículo' : 'artículos'} · {ventaExitosa.metodoPago}
            </p>
            <p className="font-display font-black text-4xl text-benben-orange mb-4">
              ${ventaExitosa.total.toFixed(0)}
            </p>
            <button
              onClick={() => setVentaExitosa(null)}
              className="w-full bg-benben-green text-benben-cream py-3 rounded-xl font-bold hover:bg-benben-green-dark"
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

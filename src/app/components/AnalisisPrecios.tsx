'use client'

import { LogoBenBenMini } from './LogoBenBen'
import { TrendingUp, TrendingDown, AlertTriangle, Check, Lightbulb, ArrowUp, ArrowRight, Info } from 'lucide-react'

// Datos reales de la competencia investigados (nov 2026)
type Competidor = {
  nombre: string
  tipo: string
  producto: string
  precio: number
  fuente: string
}

const competencia: Competidor[] = [
  // Tortas Toño (cadena grande, restaurantes establecidos)
  { nombre: 'Tortas Toño', tipo: 'Cadena restaurante', producto: 'Torta Ahogada + Agua', precio: 156, fuente: 'Sitio oficial / Uber Eats 2026' },
  { nombre: 'Tortas Toño', tipo: 'Cadena restaurante', producto: '2 Tortas Ahogadas + Agua', precio: 270, fuente: 'Sitio oficial 2026' },
  { nombre: 'Tortas Toño', tipo: 'Cadena restaurante', producto: 'Mini Torta Camarón + 2 Tacos + Agua', precio: 218, fuente: 'Combo Cuaresma 2026' },

  // Puestos de comida callejera
  { nombre: 'Puestos callejeros GDL', tipo: 'Puesto callejero', producto: 'Torta Ahogada sencilla', precio: 60, fuente: 'El Informador, sep 2025' },
  { nombre: 'Restaurantes medianos GDL', tipo: 'Restaurante', producto: 'Torta Ahogada', precio: 100, fuente: 'El Informador, sep 2025' },

  // Tacos dorados
  { nombre: 'Tacos Dorados Cancino', tipo: 'Puesto local GDL', producto: 'Taco sencillo', precio: 7, fuente: 'Google Maps 2026' },
  { nombre: 'Tacos Dorados Pepes', tipo: 'Puesto local GDL', producto: 'Taco sencillo (6 por $37)', precio: 7, fuente: 'Promo 6×$37' },
  { nombre: 'Taquería Los Comadres', tipo: 'Puesto local', producto: 'Taco dorado', precio: 9, fuente: 'Menú 2025' },
]

// Productos actuales de BEN-BEN
type ProductoBenBen = {
  nombre: string
  precioActual: number
  precioSugerido: number
  costoEstimado: number
  categoria: 'tortas' | 'especialidad' | 'tacos' | 'paquetes'
  nota?: string
}

// Costo estimado de producción por torta según El Informador (sep 2025):
// birote $9, porción de carnitas (~$50/kg = ~$10 por porción), salsa, cebolla, limón, etc.
// Margen sano para puesto callejero: 40-60% sobre costo
const productosBenBen: ProductoBenBen[] = [
  {
    nombre: 'Torta Ahogada de Carnita',
    precioActual: 70,
    precioSugerido: 80,
    costoEstimado: 45,
    categoria: 'tortas',
    nota: 'Tu precio está $10 por debajo del mercado. Sube a $80 para mejorar margen sin espantar clientes.'
  },
  {
    nombre: 'Torta Ahogada de Buche',
    precioActual: 80,
    precioSugerido: 90,
    costoEstimado: 50,
    categoria: 'tortas',
    nota: 'En rango aceptable. A $90 mantienes competitividad vs restaurantes medianos.'
  },
  {
    nombre: 'Torta Ahogada de Lengua',
    precioActual: 80,
    precioSugerido: 95,
    costoEstimado: 55,
    categoria: 'tortas',
    nota: 'La lengua es corta más cara. $95 está al nivel de restaurantes medianos.'
  },
  {
    nombre: 'Torta Ahogada Combinada',
    precioActual: 80,
    precioSugerido: 95,
    costoEstimado: 55,
    categoria: 'tortas',
    nota: 'Por llevar 2 carnes, justifica $95 como precio especial.'
  },
  {
    nombre: 'Torta Ahogada de Camarón',
    precioActual: 100,
    precioSugerido: 120,
    costoEstimado: 65,
    categoria: 'especialidad',
    nota: 'Tu estrella. Tortas Toño cobra $218 por combo similar. $120 sigue siendo accesible.'
  },
  {
    nombre: 'Taco Dorado Sencillo',
    precioActual: 14,
    precioSugerido: 12,
    costoEstimado: 6,
    categoria: 'tacos',
    nota: 'Estás cobrando el DOBLE que la competencia (Cancino $7, Pepes $7). Considera bajar a $12 o ser muy claro en el tamaño.'
  },
  {
    nombre: 'Taco Dorado con Carne',
    precioActual: 32,
    precioSugerido: 28,
    costoEstimado: 15,
    categoria: 'tacos',
    nota: 'Ligeramente caro. $28 lo hace más competitivo. Verifica el tamaño vs competencia.'
  },
  {
    nombre: 'Paquete 1: Torta + 3 Tacos',
    precioActual: 94,
    precioSugerido: 105,
    costoEstimado: 55,
    categoria: 'paquetes',
    nota: 'Buen paquete, pero individualmente suma $112 (torta $70 + 3 tacos $42). El descuento es muy alto. A $105 sigues dando valor.'
  },
  {
    nombre: 'Paquete 2: 5 Tacos Sencillos',
    precioActual: 60,
    precioSugerido: 55,
    costoEstimado: 30,
    categoria: 'paquetes',
    nota: 'Individualmente serían $70 (5×$14). El descuento es del 14%, razonable. Mantén $55-60.'
  },
  {
    nombre: 'Paquete 3: 2 Tacos Carne + 3 Sencillos',
    precioActual: 90,
    precioSugerido: 95,
    costoEstimado: 50,
    categoria: 'paquetes',
    nota: 'Individualmente suma $106 ($64+$42). Descuento del 15%, sano. Sube a $95.'
  },
]

export function AnalisisPrecios() {
  return (
    <div className="min-h-screen bg-pattern-negro">
      <header className="bg-pattern-verde text-benben-cream sticky top-0 z-30 shadow-lg border-b-2 border-benben-orange/30">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <LogoBenBenMini />
          <span className="text-xs bg-benben-cream/10 px-3 py-1 rounded-full border border-benben-orange/30">Análisis de Precios</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Intro */}
        <div className="text-center">
          <p className="font-display text-benben-orange text-xs font-bold tracking-[0.3em] uppercase mb-2">
            Análisis de Mercado · Noviembre 2026
          </p>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-benben-cream mb-3">
            ¿Cómo están tus precios vs la competencia?
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Comparamos tus precios actuales con cadenas grandes (Tortas Toño), restaurantes medianos y puestos
            callejeros de Guadalajara. También consideramos el costo estimado de producción.
          </p>
        </div>

        {/* Resumen ejecutivo */}
        <div className="bg-gradient-to-br from-benben-green to-benben-green-dark text-benben-cream rounded-3xl p-6 sm:p-8 shadow-xl">
          <h2 className="font-display font-black text-2xl mb-4 flex items-center gap-2">
            <Lightbulb className="w-7 h-7 text-benben-orange" />
            Resumen ejecutivo
          </h2>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 bg-benben-orange rounded-full flex items-center justify-center font-bold text-sm">1</div>
              <p className="text-sm leading-relaxed">
                <strong>Tus tortas están BARATAS vs el mercado.</strong> Tortas Toño cobra $135-156 por una torta
                ahogada con agua. Tú cobras $70-100 sin bebida. Hay espacio para subir precios sin perder clientes.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 bg-benben-orange rounded-full flex items-center justify-center font-bold text-sm">2</div>
              <p className="text-sm leading-relaxed">
                <strong>Tus tacos están CAROS vs competencia.</strong> Cobras $14 por taco sencillo vs $7 de la
                competencia local. Verifica el tamaño de tus tacos; si son más grandes, justifica el precio. Si no,
                considera bajar.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 bg-benben-orange rounded-full flex items-center justify-center font-bold text-sm">3</div>
              <p className="text-sm leading-relaxed">
                <strong>Tu especialidad de camarón ($100) está muy por debajo.</strong> Es tu producto estrella,
                disponible solo fines de semana. Sube a $120: sigues siendo accesible vs combos de $218 de cadenas.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="shrink-0 w-8 h-8 bg-benben-orange rounded-full flex items-center justify-center font-bold text-sm">4</div>
              <p className="text-sm leading-relaxed">
                <strong>Revisa tus paquetes.</strong> El Paquete 1 da descuento muy alto ($112 → $94 = 16% off).
                Sube a $105: sigues dando valor y mejoras tu margen.
              </p>
            </div>
          </div>
        </div>

        {/* Tabla de productos con análisis */}
        <div>
          <h2 className="font-display font-black text-2xl text-benben-cream mb-4 text-center">
            📊 Análisis producto por producto
          </h2>

          <div className="space-y-4">
            {productosBenBen.map((p) => {
              const diferencia = p.precioSugerido - p.precioActual
              const margenActual = ((p.precioActual - p.costoEstimado) / p.precioActual) * 100
              const margenSugerido = ((p.precioSugerido - p.costoEstimado) / p.precioSugerido) * 100
              const esSubida = diferencia > 0
              const esBajada = diferencia < 0

              return (
                <div key={p.nombre} className="bg-benben-black-soft rounded-2xl p-5 border border-benben-green/30 shadow-sm">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-benben-cream text-lg leading-snug">
                        {p.nombre}
                      </h3>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
                        {p.categoria}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-muted-foreground">Sugerido</p>
                      <p className="font-display font-black text-2xl text-benben-orange leading-none">
                        ${p.precioSugerido}
                      </p>
                    </div>
                  </div>

                  {/* Comparación visual */}
                  <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                    <div className="bg-benben-black rounded-lg p-2 border border-benben-green/30">
                      <p className="text-[10px] text-muted-foreground uppercase">Actual</p>
                      <p className="font-display font-bold text-lg text-benben-cream">${p.precioActual}</p>
                    </div>
                    <div className="bg-benben-black rounded-lg p-2 border border-benben-green/30">
                      <p className="text-[10px] text-muted-foreground uppercase">Costo est.</p>
                      <p className="font-display font-bold text-lg text-muted-foreground">${p.costoEstimado}</p>
                    </div>
                    <div className={`rounded-lg p-2 ${esSubida ? 'bg-green-900/40 border border-green-700' : esBajada ? 'bg-red-900/40 border border-red-700' : 'bg-benben-black border border-benben-green/30'}`}>
                      <p className="text-[10px] text-muted-foreground uppercase">Cambio</p>
                      <p className={`font-display font-bold text-lg flex items-center justify-center ${
                        esSubida ? 'text-green-400' : esBajada ? 'text-red-400' : 'text-benben-cream'
                      }`}>
                        {esSubida && <ArrowUp className="w-4 h-4" />}
                        {esBajada && <TrendingDown className="w-4 h-4" />}
                        {diferencia > 0 ? '+' : ''}{diferencia}
                      </p>
                    </div>
                  </div>

                  {/* Margen */}
                  <div className="bg-benben-black/50 rounded-lg p-3 mb-3 border border-benben-green/20">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Margen actual:</span>
                      <span className="font-bold text-benben-cream">{margenActual.toFixed(0)}%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs mt-1">
                      <span className="text-muted-foreground">Margen con precio sugerido:</span>
                      <span className="font-bold text-benben-orange">{margenSugerido.toFixed(0)}%</span>
                    </div>
                  </div>

                  {/* Nota */}
                  <div className="flex gap-2 items-start text-xs text-benben-cream bg-benben-orange/10 border border-benben-orange/30 rounded-lg p-3">
                    <Info className="w-4 h-4 text-benben-orange shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{p.nota}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Competencia detallada */}
        <div>
          <h2 className="font-display font-black text-2xl text-benben-cream mb-4 text-center">
            🔍 Precios de la competencia en Guadalajara
          </h2>

          <div className="bg-benben-black-soft rounded-2xl border border-benben-green/30 overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-benben-green text-benben-cream">
                <tr>
                  <th className="text-left p-3 font-display font-bold">Competidor</th>
                  <th className="text-left p-3 font-display font-bold hidden sm:table-cell">Tipo</th>
                  <th className="text-left p-3 font-display font-bold">Producto</th>
                  <th className="text-right p-3 font-display font-bold">Precio</th>
                </tr>
              </thead>
              <tbody>
                {competencia.map((c, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-benben-black/30' : 'bg-benben-black-soft'}>
                    <td className="p-3 font-bold text-benben-cream">{c.nombre}</td>
                    <td className="p-3 text-xs text-muted-foreground hidden sm:table-cell">{c.tipo}</td>
                    <td className="p-3 text-xs text-benben-cream/80">{c.producto}</td>
                    <td className="p-3 text-right font-display font-black text-benben-orange">${c.precio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 text-center">
            Fuentes: sitio oficial Tortas Toño, Uber Eats MX, El Informador (sept 2025), Google Maps 2026.
          </p>
        </div>

        {/* Recomendación final */}
        <div className="bg-benben-red text-white rounded-3xl p-6 sm:p-8 shadow-xl">
          <h2 className="font-display font-black text-2xl mb-3 flex items-center gap-2">
            <Check className="w-7 h-7" /> Plan de acción recomendado para diciembre 2026
          </h2>
          <ol className="space-y-2 text-sm leading-relaxed">
            <li className="flex gap-2">
              <span className="font-bold">1.</span>
              <span><strong>Sube precios de tortas</strong> a los sugeridos ($80, $90, $95, $95). Justifica con: &ldquo;ajuste anual por inflación&rdquo;.</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">2.</span>
              <span><strong>Camarón a $120.</strong> Es tu producto estrella. Sigue siendo 45% más barato que Tortas Toño.</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">3.</span>
              <span><strong>Revisa tamaño de tacos</strong> vs competencia. Si son similares, baja a $12. Si son más grandes, agrega foto en el menú con texto &ldquo;tamaño grande&rdquo;.</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">4.</span>
              <span><strong>Ajusta Paquete 1 a $105.</strong> Sigue siendo buen descuento ($112 individual → $105 = 6% off) pero mejora tu margen.</span>
            </li>
            <li className="flex gap-2">
              <span className="font-bold">5.</span>
              <span><strong>Anuncia el cambio</strong> en WhatsApp y Google Maps: &ldquo;Nuevos precios desde diciembre, ¡mismo sabor de siempre!&rdquo;</span>
            </li>
          </ol>

          <div className="mt-5 bg-white/10 rounded-xl p-4">
            <p className="text-xs opacity-90 leading-relaxed">
              <strong>💡 Impacto estimado:</strong> Si vendes 20 tortas/día con el ajuste promedio de +$15 por torta,
              ganarías <strong>+$300 pesos diarios</strong> (≈ $9,000 al mes) sin necesidad de más clientes.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

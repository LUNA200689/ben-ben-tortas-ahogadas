'use client'

import { useState, useEffect } from 'react'
import { MenuDigital } from './components/MenuDigital'
import { RegistrarVenta } from './components/RegistrarVenta'
import { AnalisisPrecios } from './components/AnalisisPrecios'
import { CodigoQR } from './components/CodigoQR'
import { InfoNegocio } from './components/InfoNegocio'
import { LogoBenBenMini } from './components/LogoBenBen'
import { UtensilsCrossed, ShoppingCart, TrendingUp, QrCode, Info, Home } from 'lucide-react'

type Seccion = 'menu' | 'vender' | 'analisis' | 'qr' | 'info'

const secciones: { id: Seccion; label: string; labelCorto: string; Icon: typeof Home }[] = [
  { id: 'menu', label: 'Menú Digital', labelCorto: 'Menú', Icon: UtensilsCrossed },
  { id: 'vender', label: 'Registrar Venta', labelCorto: 'Vender', Icon: ShoppingCart },
  { id: 'analisis', label: 'Análisis de Precios', labelCorto: 'Precios', Icon: TrendingUp },
  { id: 'qr', label: 'Código QR', labelCorto: 'QR', Icon: QrCode },
  { id: 'info', label: 'Información del Negocio', labelCorto: 'Info', Icon: Info },
]

export default function Home() {
  const [seccion, setSeccion] = useState<Seccion>('menu')

  // Sincronizar con hash de la URL (#menu, #vender, etc.)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as Seccion
    if (secciones.some((s) => s.id === hash)) {
      setSeccion(hash)
    }
  }, [])

  useEffect(() => {
    window.location.hash = seccion
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [seccion])

  return (
    <div className="min-h-screen flex flex-col bg-pattern-negro">
      {/* Navbar superior - siempre visible */}
      <nav className="bg-black text-benben-cream shadow-lg z-40 sticky top-0 no-print border-b-2 border-benben-orange/40">
        <div className="max-w-5xl mx-auto px-3">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => setSeccion('menu')}
              className="flex items-center gap-2 py-3 shrink-0"
              aria-label="Inicio BEN-BEN"
            >
              <LogoBenBenMini />
            </button>

            {/* Botones de navegación - desktop */}
            <div className="hidden md:flex items-center gap-1">
              {secciones.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => setSeccion(id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    seccion === id
                      ? 'bg-benben-green text-benben-cream border border-benben-orange/40'
                      : 'text-benben-cream/80 hover:bg-benben-green/30 hover:text-benben-cream'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              ))}
            </div>

            {/* Botón menú actual (mobile) */}
            <div className="md:hidden text-xs text-benben-orange font-bold uppercase tracking-wider">
              {secciones.find((s) => s.id === seccion)?.label}
            </div>
          </div>
        </div>

        {/* Navegación móvil - fila de íconos */}
        <div className="md:hidden border-t border-benben-green/30 overflow-x-auto bg-black/50">
          <div className="flex">
            {secciones.map(({ id, labelCorto, Icon }) => (
              <button
                key={id}
                onClick={() => setSeccion(id)}
                className={`flex-1 min-w-[80px] flex flex-col items-center gap-1 py-2 transition ${
                  seccion === id
                    ? 'bg-benben-green text-benben-cream'
                    : 'text-benben-cream/70'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-[10px] font-bold">{labelCorto}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Contenido dinámico */}
      <div className="flex-1">
        {seccion === 'menu' && <MenuDigital />}
        {seccion === 'vender' && <RegistrarVenta />}
        {seccion === 'analisis' && <AnalisisPrecios />}
        {seccion === 'qr' && <CodigoQR />}
        {seccion === 'info' && <InfoNegocio />}
      </div>
    </div>
  )
}

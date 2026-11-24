/**
 * Logo oficial de BEN-BEN.
 * Usa la imagen original del logo que Luis nos compartió.
 * El SVG de respaldo solo se usa si la imagen no carga.
 */
import { useState } from 'react'

export function LogoBenBen({ className = '', size = 200 }: { className?: string; size?: number }) {
  const [usarSvg, setUsarSvg] = useState(false)

  if (usarSvg) {
    // SVG de respaldo (solo si la imagen no carga)
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Logo BEN-BEN Tortas Ahogadas Premier"
      >
        <circle cx="100" cy="100" r="98" fill="#3D2817" />
        <circle cx="100" cy="100" r="92" fill="#4A2F1C" />
        <circle cx="100" cy="100" r="88" fill="none" stroke="#105131" strokeWidth="3" />
        <circle cx="100" cy="100" r="82" fill="none" stroke="#1B5E20" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="78" fill="#FFF8E1" />
        <text x="100" y="120" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="26" fontWeight="900" fill="#105131" letterSpacing="1">BEN-BEN</text>
        <text x="100" y="140" textAnchor="middle" fontFamily="Poppins, sans-serif" fontSize="10" fontWeight="700" fill="#C8102E" letterSpacing="2">TORTAS AHOGADAS</text>
      </svg>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
  <img
      src="/logo-benben-original.jpg"
      alt="Logo BEN-BEN Tortas Ahogadas Premier"
      width={size}
      height={size}
      className={`object-contain rounded-full ${className}`}
      style={{ width: size, height: size }}
      onError={() => setUsarSvg(true)}
    />
  )
}

/**
 * Logo compacto para headers / footers - usa la imagen original a pequeño tamaño
 */
export function LogoBenBenMini({ className = '' }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-benben-green-dark shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-benben-original.jpg"
          alt="BEN-BEN"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-display font-black text-benben-green text-lg tracking-wide">BEN-BEN</span>
        <span className="font-display font-bold text-benben-red text-[9px] tracking-[0.2em]">TORTAS AHOGADAS</span>
      </div>
    </div>
  )
}

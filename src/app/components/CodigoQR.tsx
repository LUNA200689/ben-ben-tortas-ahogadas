'use client'

import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { LogoBenBen, LogoBenBenMini } from './LogoBenBen'
import { Printer, Download, Wifi, QrCode } from 'lucide-react'

export function CodigoQR() {
  const [urlMenu, setUrlMenu] = useState(typeof window !== 'undefined' ? window.location.href.split('#')[0] : 'https://preview-benben-tortas.space-z.ai/')

  function imprimir() {
    window.print()
  }

  function descargarSVG() {
    const svg = document.getElementById('qr-codigo-svg')
    if (!svg) return
    const svgData = new XMLSerializer().serializeToString(svg)
    const blob = new Blob([svgData], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'qr-benben-tortas.svg'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-pattern-negro">
      <header className="bg-pattern-verde text-benben-cream sticky top-0 z-30 shadow-lg no-print border-b-2 border-benben-orange/30">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <LogoBenBenMini />
          <span className="text-xs bg-benben-cream/10 px-3 py-1 rounded-full border border-benben-orange/30">Código QR Imprimible</span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-6 no-print">
          <p className="font-display text-benben-orange text-xs font-bold tracking-[0.3em] uppercase mb-2">
            Imprime y pega en tu puesto
          </p>
          <h1 className="font-display font-black text-3xl text-benben-cream mb-2">
            Código QR de tu Menú Digital
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Tus clientes escanean este código con la cámara de su celular y ven el menú completo al instante.
            Imprímelo, plastifícalo y pégalo en una pared visible de tu puesto.
          </p>
        </div>

        {/* Vista de impresión */}
        <div className="max-w-md mx-auto">
          <div className="printable-qr bg-white rounded-3xl shadow-2xl border-4 border-benben-green p-8 text-center">
            {/* Logo arriba */}
            <div className="flex justify-center mb-4">
              <LogoBenBen size={140} />
            </div>

            <h2 className="font-display font-black text-3xl text-benben-green-dark mb-1">
              ¡Escanea nuestro menú!
            </h2>
            <p className="text-sm text-benben-red font-bold tracking-widest uppercase mb-4">
              Tortas Ahogadas BEN-BEN
            </p>

            {/* QR */}
            <div className="bg-benben-cream-warm/40 p-6 rounded-2xl mb-4 inline-block">
              <QRCodeSVG
                id="qr-codigo-svg"
                value={urlMenu}
                size={240}
                level="M"
                bgColor="#FFF8E1"
                fgColor="#0F5132"
                marginSize={2}
              />
            </div>

            <p className="text-xs text-muted-foreground mb-4">
              Apunta la cámara de tu celular al código<br />
              para ver el menú completo y hacer tu pedido
            </p>

            {/* Info de contacto debajo */}
            <div className="border-t-2 border-benben-green/30 pt-4 space-y-1 text-xs">
              <p className="font-bold text-benben-green-dark">
                📞 33 3650 5236 · WhatsApp 33 1406 1523
              </p>
              <p className="text-muted-foreground">
                C. Río La Barca 1465, Atlas, Guadalajara
              </p>
              <p className="text-muted-foreground">
                Mié-Dom · 8:00 AM - 4:00 PM
              </p>
            </div>

            <div className="mt-4 text-[10px] text-benben-orange font-bold tracking-widest uppercase">
              ★ Premier · Guadalajara, Jalisco ★
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3 mt-6 no-print">
            <button
              onClick={imprimir}
              className="flex-1 bg-benben-green text-benben-cream py-3 rounded-xl font-display font-bold hover:bg-benben-green-dark transition flex items-center justify-center gap-2 shadow-md"
            >
              <Printer className="w-5 h-5" />
              Imprimir
            </button>
            <button
              onClick={descargarSVG}
              className="flex-1 bg-white text-benben-green-dark border-2 border-benben-green py-3 rounded-xl font-display font-bold hover:bg-benben-cream transition flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Descargar QR
            </button>
          </div>

          {/* URL actual */}
          <div className="mt-4 bg-benben-black-soft rounded-xl p-4 border border-benben-green/30 no-print">
            <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
              <Wifi className="w-3.5 h-3.5" /> URL del menú que escanearán tus clientes:
            </p>
            <p className="font-mono text-xs text-benben-cream break-all bg-benben-black p-2 rounded border border-benben-green/30">
              {urlMenu}
            </p>
            <p className="text-[10px] text-muted-foreground mt-2">
              Esta URL se actualiza automáticamente cuando publiques tu menú en internet.
              Imprime el QR una vez que el menú esté en su dirección final.
            </p>
          </div>

          {/* Tips de uso */}
          <div className="mt-6 bg-benben-orange/10 border-l-4 border-benben-orange p-4 rounded-r-xl no-print">
            <h3 className="font-display font-bold text-benben-orange text-sm mb-2 flex items-center gap-2">
              <QrCode className="w-4 h-4" /> Cómo usar el código QR
            </h3>
            <ol className="text-xs space-y-1 text-foreground">
              <li><strong>1.</strong> Imprime esta página (toca el botón &ldquo;Imprimir&rdquo; de arriba)</li>
              <li><strong>2.</strong> Plastifica el papel para que aguante el clima y salpicaduras</li>
              <li><strong>3.</strong> Pégalo en una pared visible del puesto, a la altura de los clientes</li>
              <li><strong>4.</strong> Haz una prueba tú mismo: escanea con tu celular Android</li>
              <li><strong>5.</strong> Dile a tus clientes &ldquo;¡escanea el código y ve nuestro menú!&rdquo;</li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  )
}

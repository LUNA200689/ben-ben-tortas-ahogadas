'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Printer, Download } from 'lucide-react';
import { LogoBenBen } from './LogoBenBen';

export function CodigoQR() {
  const [urlMenu] = useState(() =>
    typeof window !== 'undefined'
      ? `${window.location.origin}/`
      : 'https://ben-ben-tortas-ahogadas-ktk6.vercel.app/'
  );

  function handleImprimir() {
    window.print();
  }

  function handleDescargarSVG() {
    const svg = document.getElementById('qr-codigo-svg');
    if (!svg) return;
    const serializer = new XMLSerializer();
    const svgData = serializer.serializeToString(svg);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'qr-menu-tortas-ahogadas-ben-ben.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <section className="max-w-xl mx-auto p-6 my-4 rounded-2xl border border-benben-green/30 bg-benben-black-soft text-benben-cream text-center shadow-sm">
      <h2 className="font-display text-2xl font-bold mb-2">
        Código QR de nuestro Menú Digital
      </h2>
      <p className="text-sm opacity-90 mb-6">
        Escanea este código con la cámara de tu celular para ver el menú completo al instante.
      </p>

      <div className="bg-white text-benben-black p-6 rounded-2xl max-w-sm mx-auto mb-6 shadow-md">
        <div className="flex justify-center mb-3">
          <LogoBenBen />
        </div>
        <p className="font-display text-lg font-bold mb-4">
          ¡Escanea nuestro menú!
        </p>
        <div id="qr-codigo-svg" className="flex justify-center">
          <QRCodeSVG value={urlMenu} size={180} level="M" />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-4 print:hidden">
        <button
          type="button"
          onClick={handleImprimir}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-benben-green text-white font-semibold hover:opacity-90 transition cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          Imprimir
        </button>
        <button
          type="button"
          onClick={handleDescargarSVG}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-benben-cream/30 bg-transparent text-benben-cream font-semibold hover:bg-white/10 transition cursor-pointer"
        >
          <Download className="w-4 h-4" />
          Descargar QR
        </button>
      </div>

      <p className="text-xs opacity-75 break-all">
        Enlace del menú: {urlMenu}
      </p>
    </section>
  );
}

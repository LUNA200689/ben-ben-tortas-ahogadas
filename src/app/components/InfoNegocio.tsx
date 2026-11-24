'use client'

import { LogoBenBenMini } from './LogoBenBen'
import { MapPin, Phone, Clock, MessageCircle, FileText, AlertTriangle, CheckCircle2, ChevronRight, ExternalLink } from 'lucide-react'

export function InfoNegocio() {
  return (
    <div className="min-h-screen bg-pattern-negro">
      <header className="bg-pattern-verde text-benben-cream sticky top-0 z-30 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <LogoBenBenMini />
          <span className="text-xs bg-benben-cream/10 px-3 py-1 rounded-full">Información del Negocio</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Hero */}
        <div className="text-center">
          <p className="font-display text-benben-red text-xs font-bold tracking-[0.3em] uppercase mb-2">
            Centro de Información
          </p>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-benben-cream mb-2">
            Tortas Ahogadas BEN-BEN
          </h1>
          <p className="text-sm text-muted-foreground">
            Datos oficiales, permisos y próximos pasos para regularizar tu negocio
          </p>
        </div>

        {/* DATOS BÁSICOS */}
        <section className="bg-benben-black-soft rounded-2xl p-6 border border-benben-green/30 shadow-sm">
          <h2 className="font-display font-black text-xl text-benben-cream mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-benben-red" />
            Datos del negocio
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Nombre comercial</p>
              <p className="font-bold text-benben-cream">Tortas Ahogadas BEN-BEN Premier</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Propietario</p>
              <p className="font-bold text-benben-cream">Luis Luna</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Dirección
              </p>
              <p className="font-bold text-benben-cream">C. Río La Barca 1465, Atlas, 44870 Guadalajara, Jal.</p>
              <a
                href="https://maps.app.goo.gl/1X1vDs5a6dJMcLbo9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-benben-red hover:underline inline-flex items-center gap-1 mt-1"
              >
                Ver en Google Maps <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <Phone className="w-3 h-3" /> Teléfono local
              </p>
              <p className="font-bold text-benben-cream">+52 33 3650 5236</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <MessageCircle className="w-3 h-3" /> WhatsApp
              </p>
              <p className="font-bold text-benben-cream">33 1406 1523</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3 h-3" /> Horario
              </p>
              <p className="font-bold text-benben-cream">Miércoles a Domingo · 8:00 AM - 4:00 PM</p>
              <p className="text-xs text-muted-foreground mt-0.5">Lunes y martes cerrado</p>
            </div>
          </div>
        </section>

        

        

        {/* BRANDING */}
        <section className="bg-benben-black-soft rounded-2xl p-6 border border-benben-green/30 shadow-sm">
          <h2 className="font-display font-black text-xl text-benben-cream mb-4">
            🎨 Tu identidad de marca
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Colores oficiales</p>
              <div className="flex gap-2">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-lg" style={{ background: '#0F5132' }} />
                  <p className="text-[10px] mt-1">Verde BEN-BEN</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-lg" style={{ background: '#C8102E' }} />
                  <p className="text-[10px] mt-1">Rojo chile</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-lg" style={{ background: '#F77F00' }} />
                  <p className="text-[10px] mt-1">Naranja</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-lg border border-benben-cream-warm" style={{ background: '#FFF8E1' }} />
                  <p className="text-[10px] mt-1">Crema</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Uniforme del personal</p>
              <ul className="text-xs space-y-1 text-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-black" />
                  Playera negra
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ background: '#0F5132' }} />
                  Mandil verde
                </li>
                <li className="flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 text-muted-foreground" />
                  Logotipo BEN-BEN bordado en la espalda
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Estadísticas Google */}
        <section className="bg-gradient-to-br from-benben-green to-benben-green-dark text-benben-cream rounded-2xl p-6 text-center shadow-xl">
          <p className="text-xs uppercase tracking-widest opacity-80 mb-2">Tu reputación en Google</p>
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="font-display font-black text-5xl text-benben-orange">4.7</span>
            <span className="text-2xl opacity-80">/5</span>
          </div>
          <p className="text-2xl mb-1">★★★★★</p>
          <p className="text-sm opacity-90">Basado en 290+ reseñas de clientes reales</p>
          <p className="text-xs opacity-70 mt-3 italic">
            &ldquo;Las mejores tortas, sin duda. Y el servicio fue excelente.&rdquo; — Fernando D.
          </p>
        </section>
      </main>
    </div>
  )
}

'use client'

import { LogoBenBen, LogoBenBenMini } from './LogoBenBen'
import { Star, MapPin, Clock, Phone, MessageCircle, CreditCard, Banknote, Send, Truck, ChevronDown } from 'lucide-react'
import { PRODUCTOS, type Producto } from '@/lib/productos'

const categoriaLabels: Record<string, { titulo: string; subtitulo: string; emoji: string }> = {
  tortas: { titulo: 'Tortas Ahogadas', subtitulo: 'En birote salado, ahogadas en salsa de jitomate al estilo Jalisco', emoji: '🥖' },
  especialidad: { titulo: 'Especialidad de la Casa', subtitulo: 'Nuestra estrella: Torta Ahogada de Camarón', emoji: '🦐' },
  tacos: { titulo: 'Tacos Dorados', subtitulo: 'Crujientes, dorados al estilo Guadalajara', emoji: '🌮' },
  paquetes: { titulo: 'Paquetes y Promociones', subtitulo: 'Las mejores combinaciones para disfrutar en familia', emoji: '🎉' },
}

export function MenuDigital() {
  const productos: Producto[] = PRODUCTOS

  const categorias = ['tortas', 'especialidad', 'tacos', 'paquetes']
  const hoy = new Date().getDay() // 0=Dom, 6=Sáb

  return (
    <div className="min-h-screen bg-pattern-negro">
      {/* ============ HEADER ============ */}
      <header className="bg-pattern-verde text-benben-cream sticky top-0 z-30 shadow-lg no-print border-b-2 border-benben-orange/30">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <LogoBenBenMini />
          <div className="hidden sm:flex items-center gap-1 text-xs">
            <Star className="w-4 h-4 fill-benben-orange text-benben-orange" />
            <span className="font-bold">4.7</span>
            <span className="text-benben-cream/70">· 290+ reseñas</span>
          </div>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section className="relative bg-pattern-verde text-benben-cream overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 pt-8 pb-12 sm:pt-12 sm:pb-16 flex flex-col items-center text-center">
          <div className="mb-6 rounded-full overflow-hidden shadow-2xl ring-4 ring-benben-cream/20">
            <LogoBenBen size={180} />
          </div>

          <div className="inline-flex items-center gap-2 bg-benben-orange/90 text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest mb-4">
            <Star className="w-3 h-3 fill-white" />
            PREMIER · DESDE GUADALAJARA
          </div>

          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-benben-cream leading-tight tracking-tight mb-3">
            Tortas Ahogadas
            <span className="block text-benben-orange text-3xl sm:text-4xl md:text-5xl mt-1">BEN-BEN</span>
          </h1>

          <p className="text-benben-cream/85 max-w-2xl text-sm sm:text-base leading-relaxed mb-6">
            Tradición jalisciense en cada bocado. Las mejores tortas ahogadas de Guadalajara según nuestros clientes.
            <span className="block mt-1 text-benben-cream/70 text-xs sm:text-sm">
              &ldquo;Las tortas más ricas y deliciosas que he probado en todo Guadalajara&rdquo;
            </span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 bg-benben-cream/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <Clock className="w-3.5 h-3.5" /> Mié a Dom · 8am - 4pm
            </span>
            <span className="inline-flex items-center gap-1.5 bg-benben-cream/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <Truck className="w-3.5 h-3.5" /> Servicio a domicilio
            </span>
            <span className="inline-flex items-center gap-1.5 bg-benben-cream/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
              <CreditCard className="w-3.5 h-3.5" /> Tarjeta y transferencia
            </span>
          </div>
        </div>

        {/* Onda decorativa inferior */}
        <svg className="block w-full h-8 sm:h-12" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden>
          <path d="M0,30 Q360,60 720,30 T1440,30 L1440,60 L0,60 Z" fill="#0A0A0A" />
        </svg>
      </section>

      {/* ============ MENÚ ============ */}
      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-12">
        <div className="text-center">
          <p className="font-display text-benben-red text-xs font-bold tracking-[0.3em] uppercase mb-2">Nuestro Menú</p>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-benben-green-dark">¡Buen provecho!</h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="h-px w-12 bg-benben-red/40" />
            <span className="text-benben-orange text-lg">◆</span>
            <span className="h-px w-12 bg-benben-red/40" />
          </div>
        </div>

        {categorias.map((cat) => {
            const items = productos.filter((p) => p.categoria === cat)
            if (items.length === 0) return null
            const meta = categoriaLabels[cat]
            const esEspecialidad = cat === 'especialidad'

            return (
              <section key={cat} id={cat} className={esEspecialidad ? '' : ''}>
                {/* Encabezado de sección */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-3 bg-benben-green text-benben-cream px-5 py-2 rounded-full shadow-md">
                    <span className="text-2xl">{meta.emoji}</span>
                    <h3 className="font-display font-bold text-lg sm:text-xl tracking-wide">{meta.titulo}</h3>
                  </div>
                  <p className="mt-2 text-sm text-benben-muted-foreground italic">{meta.subtitulo}</p>
                </div>

                {/* Grid de productos */}
                <div className={`grid gap-4 ${esEspecialidad ? 'grid-cols-1 max-w-2xl mx-auto' : 'sm:grid-cols-2'}`}>
                  {items.map((p) => {
                    const esCamaron = p.categoria === 'especialidad'
                    const disponibleHoy = !p.notas || (hoy === 0 || hoy === 6)
                    return (
                      <article
                        key={p.id}
                        className={`relative bg-benben-black-soft rounded-2xl overflow-hidden shadow-md border border-benben-green/30 hover:border-benben-orange/50 hover:shadow-xl transition-all ${
                          esCamaron ? 'ring-2 ring-benben-orange' : ''
                        }`}
                      >
                        {esCamaron && (
                          <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-benben-orange to-benben-red text-white text-center py-1.5 text-xs font-bold tracking-widest uppercase">
                            ★ Especialidad ★
                          </div>
                        )}
                        <div className={`p-5 ${esCamaron ? 'pt-10' : ''}`}>
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <h4 className="font-display font-bold text-benben-cream text-lg leading-snug">
                                {p.nombre}
                              </h4>
                              {p.notas && (
                                <p className={`mt-1 text-xs font-semibold ${
                                  disponibleHoy ? 'text-benben-orange' : 'text-muted-foreground'
                                }`}>
                                  {p.notas} {disponibleHoy ? '✓ Disponible hoy' : ''}
                                </p>
                              )}
                            </div>
                            <div className="flex flex-col items-end shrink-0">
                              <span className="font-display font-black text-2xl text-benben-orange leading-none">
                                ${p.precio}
                              </span>
                              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">MXN</span>
                            </div>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </section>
            )
          })}

        {/* ============ CÓMO PEDIR ============ */}
        <section id="pedir" className="bg-benben-green text-benben-cream rounded-3xl p-6 sm:p-8 shadow-xl border border-benben-orange/30">
          <div className="text-center mb-6">
            <p className="font-display text-benben-orange text-xs font-bold tracking-[0.3em] uppercase mb-2">Haz tu pedido</p>
            <h3 className="font-display font-black text-2xl sm:text-3xl">Cómo pedir tus tortas ahogadas</h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* WhatsApp */}
            <a
              href="https://wa.me/523314061523?text=Hola%20BEN-BEN,%20quisiera%20pedir%20una%20torta%20ahogada"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-benben-cream text-benben-green-dark rounded-2xl p-5 flex items-start gap-4 hover:bg-white transition shadow-lg"
            >
              <div className="bg-green-600 text-white p-3 rounded-xl group-hover:scale-110 transition shrink-0">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="font-display font-bold text-lg">WhatsApp</p>
                <p className="text-2xl font-display font-black text-benben-green">33 1406 1523</p>
                <p className="text-xs text-muted-foreground mt-1">Toca para chatear ahora</p>
              </div>
            </a>

            {/* Teléfono */}
            <a
              href="tel:+523336505236"
              className="group bg-benben-cream text-benben-green-dark rounded-2xl p-5 flex items-start gap-4 hover:bg-white transition shadow-lg"
            >
              <div className="bg-benben-red text-white p-3 rounded-xl group-hover:scale-110 transition shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <p className="font-display font-bold text-lg">Llamada local</p>
                <p className="text-2xl font-display font-black text-benben-green">33 3650 5236</p>
                <p className="text-xs text-muted-foreground mt-1">Toca para llamar</p>
              </div>
            </a>
          </div>

          {/* Métodos de pago */}
          <div className="mt-6 bg-benben-green-dark/40 rounded-2xl p-4">
            <p className="text-benben-cream/80 text-xs uppercase tracking-widest font-bold mb-3 text-center">Métodos de pago aceptados</p>
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <span className="inline-flex items-center gap-2 text-benben-cream text-sm">
                <CreditCard className="w-5 h-5 text-benben-orange" /> Tarjeta
              </span>
              <span className="inline-flex items-center gap-2 text-benben-cream text-sm">
                <Send className="w-5 h-5 text-benben-orange" /> Transferencia
              </span>
              <span className="inline-flex items-center gap-2 text-benben-cream text-sm">
                <Banknote className="w-5 h-5 text-benben-orange" /> Efectivo
              </span>
            </div>
          </div>
        </section>

        {/* ============ UBICACIÓN Y HORARIO ============ */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-benben-black-soft rounded-2xl p-6 shadow-md border border-benben-green/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-benben-red text-white p-2 rounded-lg">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-lg text-benben-cream">Dónde estamos</h4>
            </div>
            <p className="text-sm text-benben-cream/90 leading-relaxed">
              C. Río La Barca 1465<br />
              Colonia Atlas, 44870<br />
              Guadalajara, Jalisco, México
            </p>
            <a
              href="https://maps.app.goo.gl/1X1vDs5a6dJMcLbo9"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-bold text-benben-orange hover:text-benben-cream transition"
            >
              Ver en Google Maps →
            </a>
          </div>

          <div className="bg-benben-black-soft rounded-2xl p-6 shadow-md border border-benben-green/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-benben-green text-white p-2 rounded-lg">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-lg text-benben-cream">Horario</h4>
            </div>
            <ul className="text-sm space-y-1.5">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Lunes</span>
                <span className="font-semibold text-benben-red">Cerrado</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Martes</span>
                <span className="font-semibold text-benben-red">Cerrado</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Miércoles a Viernes</span>
                <span className="font-bold text-benben-cream">8:00 - 16:00</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Sábado y Domingo</span>
                <span className="font-bold text-benben-cream">8:00 - 16:00</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ============ RESEÑAS ============ */}
        <section className="text-center py-8">
          <p className="font-display text-benben-red text-xs font-bold tracking-[0.3em] uppercase mb-2">Lo que dicen nuestros clientes</p>
          <h3 className="font-display font-black text-2xl sm:text-3xl text-benben-cream mb-6">Calificación 4.7 / 5 en Google</h3>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { nombre: 'Jasmine H.', texto: 'GREAT SERVICE! THE FOOD IS AMAZING 10/10', estrellas: 5 },
              { nombre: 'Yazmin A.', texto: 'Las tortas más ricas y deliciosas que he probada en todo Guadalajara. Todo súper limpio y la gente muy amable.', estrellas: 5 },
              { nombre: 'Fernando D.', texto: 'Las mejores tortas, sin duda. Y el servicio fue excelente. 10/10', estrellas: 5 },
            ].map((r, i) => (
              <div key={i} className="bg-benben-black-soft rounded-2xl p-5 shadow-md border border-benben-green/30 text-left">
                <div className="flex gap-0.5 mb-2">
                  {Array.from({ length: r.estrellas }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-benben-orange text-benben-orange" />
                  ))}
                </div>
                <p className="text-sm text-benben-cream/90 italic mb-3 leading-relaxed">&ldquo;{r.texto}&rdquo;</p>
                <p className="text-xs font-bold text-benben-orange">— {r.nombre}</p>
              </div>
            ))}
          </div>

          <a
            href="https://maps.app.goo.gl/1X1vDs5a6dJMcLbo9"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-benben-orange hover:text-benben-cream transition"
          >
            Ver las 290+ reseñas en Google
            <ChevronDown className="w-4 h-4 -rotate-90" />
          </a>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="bg-pattern-verde text-benben-cream mt-12">
        <div className="max-w-5xl mx-auto px-4 py-8 text-center">
          <div className="flex justify-center mb-4">
            <LogoBenBenMini />
          </div>
          <p className="text-benben-cream/80 text-xs leading-relaxed max-w-md mx-auto">
            Tortas Ahogadas BEN-BEN Premier · Tradición jalisciense desde Guadalajara<br />
            Hecho con amor en Atlas, Guadalajara, Jalisco.
          </p>
          <p className="text-benben-cream/50 text-[10px] mt-4">
            © {new Date().getFullYear()} BEN-BEN Tortas Ahogadas. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}

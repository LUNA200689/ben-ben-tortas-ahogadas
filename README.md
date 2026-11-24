# Tortas Ahogadas BEN-BEN — Menú Digital + App de Gestión

Sistema web completo para el negocio de tortas ahogadas de Luis Luna en Guadalajara, Jalisco.

## Qué incluye

1. **Menú Digital** — Lo que ven los clientes (con QR, WhatsApp, teléfono, Google Maps)
2. **Registrar Venta** — App para registrar ventas diarias y ver reportes
3. **Análisis de Precios** — Comparativa con competencia de Guadalajara
4. **Código QR** — Cartel imprimible con QR del menú
5. **Información del Negocio** — Datos y pasos para regularizar permisos

## Tecnología

- **Framework:** Next.js 16 con App Router
- **Lenguaje:** TypeScript 5
- **Estilos:** Tailwind CSS 4 + shadcn/ui
- **Base de datos:** Prisma ORM con SQLite
- **QR:** qrcode.react

## Cómo ejecutar localmente

### Requisitos

- Node.js 18+ instalado
- Bun (recomendado) o npm

### Pasos

```bash
# 1. Descomprime el ZIP
unzip codigo-benben.zip
cd benben

# 2. Instala dependencias
bun install
# o: npm install

# 3. Inicializa la base de datos
bun run db:push
# o: npx prisma db push

# 4. Carga los productos iniciales
bun scripts/seed-productos.ts
# o: npx tsx scripts/seed-productos.ts

# 5. Arranca el servidor
bun run dev
# o: npm run dev

# 6. Abre en tu navegador
# http://localhost:3000
```

## Cómo publicar en internet (gratis)

Lee el archivo `como-publicar-mi-menu.md` para instrucciones detalladas de Vercel o Netlify.

## Estructura del proyecto

```
benben/
├── prisma/
│   └── schema.prisma          # Esquema de base de datos (Producto, Venta, VentaItem)
├── scripts/
│   └── seed-productos.ts      # Script para inicializar productos
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── productos/     # API REST de productos
│   │   │   └── ventas/         # API REST de ventas
│   │   ├── components/
│   │   │   ├── LogoBenBen.tsx        # Logo en SVG
│   │   │   ├── MenuDigital.tsx       # Menú para clientes
│   │   │   ├── RegistrarVenta.tsx   # App de gestión
│   │   │   ├── AnalisisPrecios.tsx   # Análisis de mercado
│   │   │   ├── CodigoQR.tsx          # QR imprimible
│   │   │   └── InfoNegocio.tsx       # Información del negocio
│   │   ├── globals.css              # Estilos con colores BEN-BEN
│   │   ├── layout.tsx                # Layout raíz
│   │   └── page.tsx                  # Página principal con navegación
│   └── lib/
│       └── db.ts                     # Cliente de Prisma
├── package.json
└── README.md  (este archivo)
```

## Personalización

- **Cambiar precios:** Edita `scripts/seed-productos.ts` y vuelve a correr el script
- **Cambiar colores:** Edita las variables CSS en `src/app/globals.css` (sección `:root`)
- **Cambiar logo:** Edita el SVG en `src/app/components/LogoBenBen.tsx`
- **Cambiar teléfono/dirección:** Edita los componentes `MenuDigital.tsx` y `InfoNegocio.tsx`

## Soporte

Si necesitas ayuda para publicar o modificar tu menú, contacta a un desarrollador local
o escribe a soporte.

---

© 2026 Tortas Ahogadas BEN-BEN Premier · Hecho con amor en Guadalajara, Jalisco

# Plan de implementación — BEN-BEN Tortas Ahogadas

## Objetivo

Convertir el código entregado por Z.ai en un menú digital publicable y usable desde el celular, conservando la identidad visual BEN-BEN y haciendo que las funciones de registro de ventas sean operables sin una base de datos persistente obligatoria.

## Enfoque técnico

- Mantener Next.js 16 con App Router, TypeScript, Tailwind y los componentes existentes.
- Usar un catálogo compartido en `src/lib/productos.ts` para que el menú público y el registro de ventas tengan los mismos nombres y precios.
- Guardar las ventas en `localStorage` del dispositivo del propietario. Esto evita depender de SQLite en Vercel; los datos quedan en ese navegador/dispositivo y no se sincronizan entre equipos.
- Conservar las rutas API y el esquema Prisma como respaldo para una futura versión con base de datos real, pero el flujo principal del menú no dependerá de ellas.
- Declarar `/manus-routes.json` para la ruta pública `/`.
- Preparar el repositorio para una compilación estándar de Next.js y posterior conexión a GitHub/Vercel.

## Estructura principal

- `src/app/page.tsx`: navegación entre menú, ventas, análisis, QR e información.
- `src/app/components/MenuDigital.tsx`: experiencia pública para clientes.
- `src/app/components/RegistrarVenta.tsx`: carrito, registro y reportes locales.
- `src/app/components/AnalisisPrecios.tsx`: comparativa de precios.
- `src/app/components/CodigoQR.tsx`: QR dinámico con la URL final.
- `src/app/components/InfoNegocio.tsx`: información y enlaces del negocio.
- `src/lib/productos.ts`: catálogo único de productos y precios.
- `public/`: logos, imágenes y manifiesto de rutas.
- `prisma/` y `src/app/api/`: base para una futura persistencia compartida.

## Diseño

Se reutiliza la estética ya presente en el código: **Taquería Nocturna**, con superficies negras, verde de cantina, crema cálido, naranja y rojo chile. La interfaz prioriza lectura rápida, botones grandes para celular y llamadas a WhatsApp, teléfono, Maps y QR.

- Movimiento visual: rótulo popular mexicano reinterpretado con alto contraste nocturno.
- Principios: sabor local, lectura inmediata, confianza y acción directa.
- Paleta: el negro hace destacar la comida; el crema mejora legibilidad; verde y naranja conectan con puesto, salsa y tradición.
- Layout: secciones verticales con navegación fija y tarjetas de productos, evitando pantallas saturadas.
- Elementos distintivos: logo BEN-BEN, etiquetas de especialidad y ondas decorativas.
- Interacción: acciones cortas y claras; el usuario toca producto, WhatsApp, teléfono, Maps o imprimir.
- Tipografía: familias display condensadas para títulos y una sans legible para la información.
- Voz de marca: directa, cercana y orgullosamente tapatía. Ejemplos: “¡Buen provecho!” y “Toca para chatear ahora”.

## Alcance y límites

El modo local de ventas es adecuado para comenzar sin costo, pero sus registros viven solo en el navegador donde se capturan. Para compartir ventas entre varios teléfonos o proteger el panel con cuentas, habrá que añadir autenticación y una base de datos persistente en una segunda etapa.

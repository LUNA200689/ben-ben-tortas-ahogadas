# TODO — BEN-BEN Tortas Ahogadas

## Catálogo unificado y menú público

- [ ] El menú público debe mostrar las categorías tortas, especialidad, tacos y paquetes.
- [ ] Cada producto debe mostrar nombre, precio en MXN y notas de disponibilidad cuando existan.
- [ ] El menú debe incluir WhatsApp, teléfono, Google Maps, horarios y métodos de pago.
- [ ] El menú debe funcionar en celular y computadora sin requerir una base de datos SQLite.

## Registro local de ventas

- [ ] El propietario debe poder seleccionar productos, aumentar o disminuir cantidades, ver el total y elegir efectivo, tarjeta o transferencia.
- [ ] El propietario debe poder agregar una nota opcional y confirmar una venta.
- [ ] Las ventas del día deben poder consultarse, resumirse por método de pago y eliminarse desde el mismo dispositivo.
- [ ] La pantalla debe indicar que los datos locales no se sincronizan entre dispositivos.

## Código QR e información del negocio

- [ ] El QR debe apuntar automáticamente a la URL final del menú, sin conservar la URL de vista previa.
- [ ] El QR debe poder imprimirse y descargarse como SVG.
- [ ] La información del negocio debe conservar los datos de contacto, ubicación, horario y enlaces incluidos por el creador.

## Entrega técnica

- [ ] La compilación de producción debe terminar sin errores.
- [ ] La ruta `/manus-routes.json` debe declarar `/` como la página pública.
- [ ] El repositorio de GitHub debe recibir el código completo sin secretos.
- [ ] La configuración de Vercel debe usar Next.js y el comando de compilación del proyecto.

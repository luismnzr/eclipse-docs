# Tienda

Eclipse incluye un módulo de **tienda** para vender productos físicos desde tu estudio: ropa, accesorios, mats, botellas, etc.

## Activar la tienda

La tienda está desactivada por defecto. Para activarla:

1. Ve a **Configuración**
2. Busca la opción **Tienda activada**
3. Activa el switch
4. Guarda

## Alcance actual

En la versión actual, la tienda está pensada para **ventas desde el panel de administración** (ventas en el mostrador del estudio). **No** tiene un carrito público donde los alumnos compren en línea. Esto significa:

- Los alumnos vienen al estudio y te piden un producto
- Tú registras la venta desde el panel
- Recibes el pago (efectivo, terminal, transferencia)
- El sistema actualiza el inventario y registra la orden

## Crear un producto

1. Ve a **Productos** en el menú
2. Haz clic en **Nuevo Producto**
3. Llena los datos:

| Campo | Descripción |
|-------|-------------|
| **Nombre** | Ej. "Botella de acero 750ml" |
| **Descripción** | Detalles del producto |
| **Precio** | En la moneda de tu estudio |
| **Cantidad en stock** | Inventario disponible |
| **Imagen** | Foto del producto |
| **Activo** | Si el producto está disponible para la venta |

4. Guarda

## Registrar una venta

Cuando un alumno te pide comprar algo:

1. Ve a **Órdenes** → **Nueva Orden**
2. **Selecciona los productos** que compró y la cantidad de cada uno
3. **Asigna al alumno** (opcional — útil si quieres llevar registro de qué compran tus alumnos)
4. **Registra el pago** — Marca cómo se pagó (efectivo, tarjeta, transferencia)
5. Guarda

El sistema:
- Registra la orden
- **Descuenta automáticamente del inventario**
- Genera un registro que aparece en reportes

## Ver órdenes pasadas

Ve a **Órdenes** para ver todas las ventas que has registrado. Puedes filtrar por fecha, producto o alumno.

## Gestión de inventario

Eclipse lleva el conteo de stock automáticamente:

- Cada venta **resta** del inventario
- Si el stock llega a 0, el producto ya no se puede vender hasta que lo repongas
- Para agregar más stock, edita el producto y aumenta el número

## Consejos

- **Actualiza el inventario cuando llegue mercancía** — No lo dejes para después
- **Usa fotos reales** — Facilita identificar el producto al registrar la venta
- **Revisa las órdenes en reportes** — Los ingresos de la tienda aparecen desglosados en el reporte de ingresos
- **Considera inventario mínimo** — Define un umbral y reabastece antes de llegar a 0

## Limitaciones actuales

- **No hay carrito en línea** — Los alumnos no pueden comprar desde la web
- **No hay envíos** — Solo ventas en el estudio
- **No hay variantes** (tallas, colores) — Crea un producto por cada variante

Si necesitas alguna de estas funcionalidades, contáctanos para discutirlas en futuras versiones.

**Siguiente:** [Wellhub →](./wellhub.md)

# Paquetes y Créditos

Los paquetes son productos que tus alumnos compran para obtener créditos de clase. Cada reservación consume un crédito.

## ¿Cómo funcionan los créditos?

Un paquete tiene un **número de créditos** y una **fecha de expiración**. Por ejemplo:

> **Pack 10 Clases** — $2,000 MXN — 10 créditos — expira en 60 días

Cuando un alumno compra este paquete:
- Recibe 10 créditos en su cuenta
- Los créditos expiran 60 días después de la compra
- Cada vez que reserva una clase, se descuenta 1 crédito
- Si cancela a tiempo, el crédito se le regresa
- Si cancela tarde, el crédito se pierde (si así lo configuraste)

## Crear un paquete

1. Ve a **Paquetes** en el menú
2. Haz clic en **Nuevo Paquete**
3. Llena los campos:

| Campo | Descripción |
|-------|-------------|
| **Nombre** | Ej. "Pack 10 Clases" |
| **Precio** | Precio en la moneda de tu estudio |
| **Número de créditos** | Cuántas clases incluye el paquete |
| **Días hasta expiración** | Desde la compra (ej. 30, 60, 90) |
| **Descripción** | Texto que verán los alumnos |
| **Activo** | Si está visible para compra |

4. Guarda

El paquete aparecerá inmediatamente en la página de paquetes de tu sitio.

## Ordenar los paquetes

Puedes reordenar cómo se muestran los paquetes a los alumnos. Desde la lista de paquetes, arrastra y suelta para cambiar el orden, o usa los controles de orden.

## Desactivar un paquete

Si quieres dejar de vender un paquete pero tienes alumnos que ya lo compraron:

- **No lo elimines** — Los alumnos perderían sus créditos
- **Desactívalo** — Deja de aparecer en la tienda, pero los créditos comprados siguen siendo válidos

## Expiración automática

Eclipse maneja la expiración de paquetes automáticamente:

1. **Aviso previo** — 3 días antes de expirar, el alumno recibe un correo con sus créditos restantes
2. **Expiración** — El día que expira, los créditos dejan de estar disponibles
3. **Correo de expiración** — Se avisa al alumno con un enlace para comprar un nuevo paquete

Los paquetes expirados quedan en el historial del alumno, pero ya no se pueden usar.

## Vender un paquete manualmente

Puedes asignar un paquete a un alumno sin cobro (por ejemplo, para regalos o compensaciones):

1. Ve a **Usuarios** y abre el perfil del alumno
2. Haz clic en **Vender paquete**
3. Selecciona el paquete
4. Confirma

El alumno recibirá los créditos como si hubiera comprado el paquete.

## Ajustar créditos manualmente

Si necesitas corregir el balance de créditos de un alumno:

1. En el perfil del alumno, busca la sección de paquete activo
2. Usa **Agregar créditos** o **Quitar créditos**
3. Confirma

Esto es útil para compensar errores o resolver disputas.

## Tarjetas de regalo

Si un cliente quiere comprar un paquete para regalarlo:

1. Hay un flujo de compra de tarjetas de regalo en el sitio
2. El comprador paga por el paquete y recibe un código
3. El destinatario canjea el código en `/gift-cards/redeem`
4. Los créditos se cargan en la cuenta del destinatario

## Consejos para estructurar tus paquetes

- **Ofrece opciones variadas** — Un pack chico (5 clases), uno mediano (10), uno grande (20) cubre distintos perfiles de alumno
- **Precio por clase decreciente** — Haz que el pack grande tenga un precio por clase más bajo para incentivar la compra
- **Expiración razonable** — Muy corta crea presión innecesaria, muy larga reduce la recurrencia. 30-90 días suele funcionar bien
- **Prueba con un pack introductorio** — 1-3 clases para nuevos alumnos a buen precio

**Siguiente:** [Suscripciones →](./suscripciones.md)

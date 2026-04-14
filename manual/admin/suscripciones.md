# Suscripciones

Las suscripciones dan a tus alumnos **acceso ilimitado** a las clases por una tarifa recurrente (mensual o anual). Son ideales para alumnos frecuentes que prefieren pagar una cuota fija.

## Diferencia con paquetes

| Paquete | Suscripción |
|---------|-------------|
| Pago único | Pago recurrente |
| Créditos limitados | Clases ilimitadas |
| Expira en X días | Se renueva automáticamente |
| Ideal para alumnos ocasionales | Ideal para alumnos frecuentes |

## Requisito: Stripe

Las suscripciones se procesan a través de **Stripe**. Necesitas tener tu cuenta de Stripe conectada y tus planes creados en el panel de Stripe antes de crearlos en Eclipse.

## Crear un plan de suscripción

### Paso 1: Crear el plan en Stripe

1. Entra a tu dashboard de Stripe
2. Ve a **Products** → **Add product**
3. Llena los datos del plan:
   - Nombre (ej. "Mensual Ilimitado")
   - Precio
   - Frecuencia: mensual o anual
4. Después de crearlo, Stripe te dará un **Price ID** (empieza con `price_...`)
5. Copia ese Price ID

### Paso 2: Crear el plan en Eclipse

1. Ve a **Suscripciones** en el menú
2. Haz clic en **Nuevo Plan**
3. Llena los campos:

| Campo | Descripción |
|-------|-------------|
| **Nombre** | Ej. "Mensual Ilimitado" |
| **Precio** | Debe coincidir con el de Stripe |
| **Intervalo** | Mensual o anual |
| **Stripe Price ID** | El ID que copiaste de Stripe |
| **Descripción** | Texto visible para los alumnos |
| **Activo** | Si está visible para compra |

4. Guarda

El plan aparecerá en la página de paquetes/suscripciones de tu sitio.

## Cómo funciona para el alumno

1. El alumno hace clic en **Suscribirse** en tu sitio
2. Es llevado a la página de Stripe Checkout
3. Ingresa sus datos de pago
4. Stripe cobra automáticamente cada ciclo (mensual o anual)
5. Mientras la suscripción esté activa, el alumno puede reservar **todas las clases que quiera** sin consumir créditos

## Gestión del alumno

Los alumnos gestionan su suscripción a través del **Portal de Clientes de Stripe**:

- Actualizar método de pago
- Cancelar la suscripción
- Ver facturas y recibos

Eclipse detecta automáticamente los cambios a través de webhooks. No necesitas hacer nada desde el panel de administración.

## Estados de una suscripción

| Estado | Significado |
|--------|-------------|
| **Activa** | La suscripción está vigente y el alumno puede reservar sin límite |
| **Pago fallido** | Stripe no pudo cobrar la renovación. El alumno recibe un correo con instrucciones |
| **Cancelada** | La suscripción terminó. El alumno ya no puede reservar con ella |

## Otorgar una suscripción manualmente

Si quieres darle una suscripción a un alumno sin cobro (por ejemplo, como cortesía):

1. Ve al perfil del alumno en **Usuarios**
2. Haz clic en **Otorgar suscripción**
3. Selecciona el plan
4. Confirma

**Nota:** Las suscripciones otorgadas manualmente no pasan por Stripe, por lo que no se renuevan automáticamente. Tendrás que gestionarlas tú.

## Prioridad con paquetes

Si un alumno tiene **ambos** (paquete con créditos y suscripción activa):

- La suscripción tiene prioridad — las reservaciones no consumen créditos
- Los créditos del paquete se quedan guardados para cuando la suscripción termine

## Cambios de precio

Para cambiar el precio de un plan existente:

1. Crea un **nuevo Price** en Stripe con el precio actualizado
2. Crea un nuevo plan en Eclipse con el nuevo Price ID
3. **Desactiva** el plan antiguo (los alumnos ya suscritos mantienen su precio original)
4. Los nuevos suscriptores usarán el plan nuevo

## Consejos

- **Ofrece al menos dos frecuencias** — Mensual y anual (con descuento en la anual)
- **Comunica claramente qué incluye** — "Clases ilimitadas en todos los horarios"
- **Considera suscripciones limitadas** — Por ejemplo, una suscripción "Mañanas" que solo permita clases antes de las 12pm

**Siguiente:** [Usuarios →](./usuarios.md)

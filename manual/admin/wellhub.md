# Wellhub (antes Gympass)

Eclipse se integra con **Wellhub** (antes llamado Gympass), la plataforma de bienestar corporativo. Si tu estudio forma parte de la red de Wellhub, sus usuarios pueden reservar tus clases a través de su app.

> ¿Tu estudio todavía no está conectado? Empieza por [Agrega tu estudio a Wellhub](#agrega-tu-estudio-a-wellhub).

## ¿Cómo funciona?

1. **Tú programas tus clases normalmente** en Eclipse
2. **Eclipse sincroniza tu horario con Wellhub** — las clases aparecen en la app de Wellhub
3. **Los usuarios de Wellhub reservan** desde su app
4. **Eclipse recibe la reservación** y el alumno queda registrado en la clase
5. **El check-in se valida automáticamente** — Eclipse confirma el check-in con Wellhub sin que tengas que hacer nada
6. **Wellhub te paga** por los check-ins validados (el proceso de pago lo manejas directamente con Wellhub)

> **Los check-ins son automáticos.** En cuanto la reservación entra a Eclipse, el check-in queda registrado y enviado a Wellhub. Solo necesitarás intervenir manualmente en casos excepcionales (por ejemplo, si hubo un problema técnico con la integración).

## Agrega tu estudio a Wellhub

Este es el proceso completo para conectar tu estudio, de principio a fin. Los primeros dos pasos ocurren fuera de Eclipse (con soporte y con el portal de Wellhub); los cuatro siguientes los haces tú desde el panel de administración.

### Antes de empezar

Necesitas tener esto listo:

| Requisito | Cómo lo consigues |
|-----------|-------------------|
| Contrato activo con Wellhub como estudio partner | Con el equipo comercial de Wellhub |
| Acceso al portal de socios de Wellhub | Wellhub te lo da al firmar el contrato |
| Tu **Gym ID** (identificador de tu gimnasio) | Wellhub lo asigna a tu estudio |
| Tu instancia de Eclipse funcionando en tu dominio | Ya la tienes si estás entrando a tu panel |

> **No necesitas API keys ni datos técnicos.** Las credenciales las configura soporte de Eclipse por ti (Paso 1) y el resto de los datos se llenan solos cuando conectas desde el portal de Wellhub (Paso 2).

### Paso 1 — Avisa a soporte de Eclipse

Antes de tocar nada en el portal de Wellhub, escribe a soporte de Eclipse con:

- El nombre de tu estudio
- El dominio de tu Eclipse (por ejemplo `https://app.tuestudio.com`)
- Tu **Gym ID** de Wellhub

Soporte configura las credenciales de tu instancia y registra tu estudio en el enlace central que Wellhub usa para conectar sistemas.

> **Este paso va primero.** Wellhub envía la solicitud de conexión a una sola dirección compartida por todos los estudios de Eclipse, y ahí se decide a qué estudio pertenece. Si presionas **Connect** antes de que soporte te registre, la conexión no llegará a tu instancia — no se rompe nada, pero hay que pedirle a soporte que la reenvíe.

### Paso 2 — Conecta Eclipse desde el portal de Wellhub

En el portal de socios de Wellhub:

1. Ve a la sección de sistema de reservaciones (CMS / booking system)
2. Selecciona **Eclipse** como tu sistema
3. Presiona **Connect**

Eso dispara la conexión automática. Sin que hagas nada más, Eclipse:

- guarda tu **Gym ID**,
- registra los avisos de reservación y check-in con Wellhub (para que las reservas lleguen solas),
- y busca tu **Product ID** en el catálogo de Wellhub.

Para confirmar que llegó, ve a **Configuración** → **Integración con Wellhub**: los campos **Wellhub Gym ID** y **Wellhub Product ID** deben aparecer llenos. Si el Product ID quedó vacío, puedes escribirlo a mano (está en tu portal de socios) o pedírselo a soporte; sin él, tus clases no se etiquetan con el plan correcto en Wellhub.

> **La integración no se enciende sola.** La conexión deja todo listo pero la deja apagada a propósito, para que revises el mapeo de categorías antes de que tus clases empiecen a aparecer en la app de Wellhub.

### Paso 3 — Activa la integración

1. Ve a **Configuración**
2. En **Integración con Wellhub**, marca **Habilitar integración con Wellhub**
3. Haz clic en **Guardar Configuración**

Al guardar aparecen los controles de Wellhub en el resto del panel: el **Mapeo de Categorías** y el botón de sincronización en Configuración, la casilla **Disponible en Wellhub** en cada plantilla de clase, y el campo **Categoría en Wellhub** al editar categorías.

### Paso 4 — Mapea tus categorías

Cada categoría de Eclipse (Yoga, Pilates, Cycling…) tiene que corresponder a una categoría del catálogo de Wellhub. **Las clases de una categoría sin mapear nunca aparecen en Wellhub**, así que este paso no es opcional.

1. Ve a **Configuración** → **Mapeo de Categorías**
2. Junto a cada categoría tuya, elige la categoría de Wellhub que le corresponde
3. Haz clic en **Guardar Configuración**

También puedes hacerlo categoría por categoría: ve a **Categorías**, edita una y usa el campo **Categoría en Wellhub**. La opción **— Sin mapear —** significa que esa categoría no se sincroniza.

> Si en lugar de un menú desplegable ves un campo que pide un "ID de categoría Wellhub", Eclipse no pudo leer el catálogo de Wellhub — normalmente es un problema de credenciales. Contacta a soporte en vez de adivinar el número.

### Paso 5 — Elige qué clases se venden en Wellhub

Wellhub no recibe todo tu horario automáticamente: tú decides qué plantillas se publican.

1. Ve a **Plantillas de clase** y edita una plantilla
2. Marca **Disponible en Wellhub**
3. Opcional: escribe un **Límite de lugares Wellhub por clase**
4. Guarda

Repítelo con cada plantilla que quieras vender en Wellhub. Las plantillas sin marcar no llegan a la app.

> **Consejo: reserva lugares para tus alumnos directos.** Si una clase tiene 12 lugares y pones el límite en 4, Wellhub nunca ocupará más de 4. Si dejas el campo vacío, el único límite es la capacidad total de la clase.

Dos detalles que ayudan:

- **Límite por clase individual.** Al editar una clase programada puedes ajustar el campo **Límite Wellhub** solo para ese día. Si lo dejas vacío se usa el valor de la plantilla. En el listado de clases, la etiqueta morada **WH** te muestra el límite que aplica.
- **Escribe descripciones.** Una plantilla sin descripción se sincroniza igual (Wellhub muestra el nombre), pero la descripción es lo que lee el usuario de Wellhub antes de reservar.

### Paso 6 — Sincroniza y verifica

1. Ve a **Configuración** → **Sincronizar Horario con Wellhub**
2. Haz clic en **Sincronizar Ahora** y confirma
3. Espera un momento y recarga la página

Arriba aparece la tarjeta **Estado de Sincronización con Wellhub**, que te dice cuántas plantillas y cuántas clases de tu ventana de reservación ya están en Wellhub, y qué falta. Si algo no se sincronizó, ahí mismo te dice por qué:

| Mensaje | Qué hacer |
|---------|-----------|
| "Sin categoría asignada" | Asigna una categoría a esa plantilla |
| "La categoría X no está mapeada a Wellhub" | Vuelve al Paso 4 y mapea esa categoría |
| "Sin descripción (se usa el nombre como respaldo)" | Es solo una advertencia; agrega la descripción cuando puedas |
| "La plantilla tiene Wellhub desactivado" | Marca **Disponible en Wellhub** en esa plantilla (Paso 5) |
| "La plantilla X aún no se sincronizó a Wellhub" | Resuelve el problema de la plantilla y vuelve a sincronizar |
| "Pendiente de la próxima sincronización" | Nada: la clase entra en la siguiente pasada automática |

Cuando veas **"Todo en orden"**, tus clases ya están publicadas. Confírmalo abriendo la app de Wellhub y buscando tu estudio.

> La tarjeta solo revisa tu **ventana de reservación** (por defecto 14 días, se cambia en Configuración). Las clases más lejanas se sincronizan solas conforme entran a la ventana.

### Lista de verificación

Antes de dar por terminada la conexión, confirma que:

| # | Paso |
|---|------|
| 1 | Tienes contrato con Wellhub y tu Gym ID a la mano |
| 2 | Soporte de Eclipse registró tu estudio |
| 3 | Presionaste **Connect** en el portal de Wellhub |
| 4 | **Wellhub Gym ID** y **Wellhub Product ID** aparecen llenos en Configuración |
| 5 | **Habilitar integración con Wellhub** está activado |
| 6 | Todas tus categorías están mapeadas |
| 7 | Las plantillas que quieres vender tienen **Disponible en Wellhub** |
| 8 | La tarjeta de estado dice **"Todo en orden"** |
| 9 | Buscaste tu estudio en la app de Wellhub y ves tus clases |

## Sincronizar tu horario

Una vez conectada la integración, **la sincronización es automática**. Eclipse envía tus plantillas y las clases próximas a Wellhub cada 30 minutos, y además reacciona de inmediato a lo que cambias:

- Si cambias la fecha, la hora o la duración de una clase, el cambio viaja a Wellhub al momento
- Si cancelas una clase, Eclipse cancela las reservas de Wellhub y retira la clase de la app
- Si cambias tu ventana de cancelación, se actualiza en todas las clases futuras ya sincronizadas

Si quieres empujar los cambios sin esperar a la siguiente pasada:

1. Ve a **Configuración**
2. Busca **Sincronizar Horario con Wellhub**
3. Haz clic en **Sincronizar Ahora**

Úsalo después de agregar plantillas nuevas o de programar muchas clases de golpe.

## Ver reservaciones de Wellhub

Las reservaciones que llegan desde Wellhub se ven en dos lugares:

### En la lista de clase

Ve a **Clases** y abre una clase específica. Verás:

- **Alumnos regulares** — Los que reservaron desde tu sitio
- **Usuarios de Wellhub** — Marcados como check-ins externos

### En la sección de Wellhub

Ve a **Wellhub Bookings** en el menú para ver todas las reservaciones que llegaron a través de Wellhub, ordenadas por fecha.

## Check-ins automáticos

**No necesitas validar los check-ins manualmente.** Cuando un usuario de Wellhub reserva una clase, Eclipse registra automáticamente el check-in y lo reporta a Wellhub. El alumno aparecerá en la lista de la clase marcado como check-in externo, ya validado.

### Validación manual (solo si es necesario)

En casos excepcionales (por ejemplo, si la integración tuvo un problema y un check-in quedó sin enviar), puedes validarlo manualmente:

#### Desde el panel de administración

1. Ve a la clase del día en **Clases**
2. Encuentra al alumno de Wellhub en la lista
3. Haz clic en **Validar check-in**

#### Desde el panel del profesor

Los profesores también pueden validar check-ins manualmente desde su lista de clase si detectan alguna inconsistencia. Ver [Asistencia del profesor](../profesor/asistencia.md).

## Check-ins externos manuales

Si necesitas registrar un alumno de Wellhub que no llegó automáticamente por el sistema (por ejemplo, un problema técnico), puedes hacerlo manualmente:

1. Ve a **External Check-ins** → **Nuevo**
2. Selecciona la plataforma (Wellhub o Fitpass)
3. Ingresa el identificador del usuario (código de Wellhub)
4. Selecciona la clase
5. Guarda

## Exportar datos

Puedes exportar los check-ins externos para reconciliar con Wellhub:

1. Ve a **External Check-ins**
2. Filtra por fecha
3. Usa la opción de exportar

Úsalo para verificar que los pagos de Wellhub coincidan con los check-ins validados.

## Consejos

- **Revisa la tarjeta de estado al inicio de cada semana** — Confirma que no haya plantillas o clases sin sincronizar
- **Sincroniza a mano después de cambios grandes** — Si programaste muchas clases de golpe, usa **Sincronizar Ahora** en lugar de esperar
- **Confía en los check-ins automáticos** — No necesitas validarlos uno por uno; solo interviene si detectas una inconsistencia
- **Revisa las reservaciones de Wellhub** como parte de tu rutina diaria
- **Guarda los reportes** de check-ins para tu contabilidad

## Problemas comunes

| Problema | Solución |
|----------|----------|
| "Presioné Connect y no pasó nada" | Revisa que soporte ya te haya registrado (Paso 1) y pídele que reenvíe la conexión |
| "El Gym ID o el Product ID están vacíos" | Escríbelos a mano en Configuración o pídeselos a soporte |
| "Mi clase no aparece en Wellhub" | Revisa la tarjeta de estado en Configuración: casi siempre es una categoría sin mapear o una plantilla sin **Disponible en Wellhub** |
| "Un alumno de Wellhub no aparece en la lista" | Revisa Wellhub Bookings y valida manualmente si es necesario |
| "Un check-in no se registró automáticamente" | Valídalo manualmente desde la lista de la clase o desde External Check-ins |
| "Discrepancia en los pagos" | Exporta los datos y contacta al soporte de Wellhub |

---

Con esto terminamos el Manual del Administrador. Continúa con el [Manual del Profesor](../profesor/bienvenida.md) si necesitas entrenar a tu equipo de profesores.

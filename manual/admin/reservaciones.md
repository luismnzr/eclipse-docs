# Reservaciones y Asistencia

Desde el panel de administración puedes ver todas las reservaciones de tu estudio, marcar asistencia, gestionar cancelaciones y resolver problemas.

## Ver reservaciones

Ve a **Reservaciones** en el menú. Verás una tabla con todas las reservaciones del estudio.

### Filtros disponibles

- **Rango de fechas** — Para ver reservaciones de una semana, mes, etc.
- **Clase** — Ver reservaciones de una clase específica
- **Profesor** — Filtrar por profesor
- **Estado** — Confirmadas, canceladas, completadas, no-show

## Estados de una reservación

| Estado | Significado |
|--------|-------------|
| **Confirmada** | El alumno reservó y está esperado en la clase |
| **Cancelada** | El alumno (o admin) canceló antes o después de la ventana |
| **Completada** | El alumno asistió a la clase |
| **No-show** | El alumno no se presentó y no canceló |

## Marcar asistencia

Después de cada clase, alguien debe marcar la asistencia. Normalmente lo hace el profesor desde su panel (ver [Asistencia del profesor](../profesor/asistencia.md)), pero como admin también puedes hacerlo.

### Desde la lista de una clase

1. Ve a **Clases** y abre la clase en cuestión
2. Verás la lista de alumnos confirmados
3. Junto a cada alumno tendrás dos opciones:
   - **Marcar asistencia** → la reservación pasa a **Completada**
   - **Marcar no-show** → la reservación pasa a **No-show**

### Desde el panel de reservaciones

1. Ve a **Reservaciones**
2. Busca la reservación específica
3. Usa los botones de acción:
   - **Mark Completed** — Confirmar asistencia
   - **Mark No-Show** — Registrar como no-show
   - **Revert No-Show** — Deshacer un no-show marcado por error

## No-show: qué implica

Cuando marcas a un alumno como no-show:

- La reservación queda registrada como `no_show`
- El **crédito no se restaura** — el alumno pierde la clase
- Si el alumno usó una suscripción, no hay impacto (la suscripción es ilimitada)
- El alumno recibe un correo notificando el no-show

**Usa no-show con criterio.** Si un alumno avisó con anticipación pero no canceló en el sistema, es mejor cancelar la reservación a su favor en vez de marcarlo como no-show.

## Cancelar una reservación manualmente

Si un alumno te pide cancelar una reservación:

1. Ve a la clase o al perfil del alumno
2. Encuentra la reservación
3. Usa **Cancelar**

El sistema te preguntará si quieres **restaurar el crédito** o no. Puedes decidir caso por caso (por ejemplo, si el alumno tenía una emergencia médica, restauras el crédito aunque esté fuera de la ventana de cancelación).

## Gestionar la lista de espera

Cuando una clase está llena, los alumnos pueden unirse a la **lista de espera**. Si alguien cancela, el siguiente en la lista es promovido automáticamente.

Para ver la lista de espera de una clase:

1. Ve a **Clases** y abre la clase
2. Verás una sección de **Lista de espera** con los alumnos en orden

El sistema maneja la promoción automáticamente. Solo necesitas intervenir manualmente si hay un problema (ej. el alumno ya no quiere asistir).

## Mover un alumno entre clases

Si un alumno reservó la clase equivocada:

1. Cancela su reservación en la clase original (restaurando el crédito)
2. Ve a la clase correcta y haz una reservación manual
3. Esto consume un crédito nuevo, pero como ya lo restauraste, el balance no cambia

## Agregar un alumno manualmente a una clase

Si necesitas meter a un alumno en una clase que ya está llena:

1. Ve a la clase desde **Clases**
2. Usa la opción de **agregar alumno**
3. Busca al alumno y confírmalo

**Nota:** Esto puede exceder la capacidad de la clase. Úsalo solo cuando sea necesario.

## Reglas de cancelación

Estas reglas aplican automáticamente cuando un alumno cancela desde su perfil:

| Cuándo cancela | Qué pasa con el crédito |
|----------------|-------------------------|
| **Antes de la ventana** (ej. 12 horas antes) | Crédito se restaura |
| **Dentro de la ventana** (menos de 12 horas antes) | Crédito se pierde (si está configurado así) |

Tú, como admin, puedes sobrescribir estas reglas al cancelar manualmente.

## Check-ins externos

Si usas integraciones con plataformas como Wellhub, los alumnos de esas plataformas aparecerán como **check-ins externos**. Ver [Wellhub](./wellhub.md) para más detalles.

**Siguiente:** [Reportes →](./reportes.md)

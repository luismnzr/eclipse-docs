# Wellhub (antes Gympass)

Eclipse se integra con **Wellhub** (antes llamado Gympass), la plataforma de bienestar corporativo. Si tu estudio forma parte de la red de Wellhub, sus usuarios pueden reservar tus clases a través de su app.

## ¿Cómo funciona?

1. **Tú programas tus clases normalmente** en Eclipse
2. **Eclipse sincroniza tu horario con Wellhub** — las clases aparecen en la app de Wellhub
3. **Los usuarios de Wellhub reservan** desde su app
4. **Eclipse recibe la reservación** y el alumno queda registrado en la clase
5. **El check-in se valida automáticamente** — Eclipse confirma el check-in con Wellhub sin que tengas que hacer nada
6. **Wellhub te paga** por los check-ins validados (el proceso de pago lo manejas directamente con Wellhub)

> **Los check-ins son automáticos.** En cuanto la reservación entra a Eclipse, el check-in queda registrado y enviado a Wellhub. Solo necesitarás intervenir manualmente en casos excepcionales (por ejemplo, si hubo un problema técnico con la integración).

## Requisitos previos

Para usar esta integración necesitas:

- Tener un contrato activo con Wellhub como estudio partner
- Tu ID de gimnasio de Wellhub
- Tu API key de Wellhub

Estos datos se configuran en el archivo de configuración de tu instancia. Si no los tienes, contacta al soporte de Eclipse para que lo activemos por ti.

## Sincronizar tu horario

Una vez configurada la integración, necesitas sincronizar tu horario para que aparezca en Wellhub.

1. Ve a **Configuración**
2. Busca la sección de **Wellhub**
3. Haz clic en **Sincronizar con Wellhub**

Esto envía tu horario actual a Wellhub. Repítelo cada vez que hagas cambios importantes al horario (nuevas clases, cambios de hora, etc.).

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

- **Sincroniza el horario al inicio de cada semana** — Asegúrate de que Wellhub siempre tenga tu horario actualizado
- **Confía en los check-ins automáticos** — No necesitas validarlos uno por uno; solo interviene si detectas una inconsistencia
- **Revisa las reservaciones de Wellhub** como parte de tu rutina diaria
- **Guarda los reportes** de check-ins para tu contabilidad

## Problemas comunes

| Problema | Solución |
|----------|----------|
| "Mi clase no aparece en Wellhub" | Sincroniza el horario desde Configuración |
| "Un alumno de Wellhub no aparece en la lista" | Revisa Wellhub Bookings y valida manualmente si es necesario |
| "Un check-in no se registró automáticamente" | Valídalo manualmente desde la lista de la clase o desde External Check-ins |
| "Discrepancia en los pagos" | Exporta los datos y contacta al soporte de Wellhub |

---

Con esto terminamos el Manual del Administrador. Continúa con el [Manual del Profesor](../profesor/bienvenida.md) si necesitas entrenar a tu equipo de profesores.

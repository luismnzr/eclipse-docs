# Wellhub (antes Gympass)

Eclipse se integra con **Wellhub** (antes llamado Gympass), la plataforma de bienestar corporativo. Si tu estudio forma parte de la red de Wellhub, sus usuarios pueden reservar tus clases a través de su app.

## ¿Cómo funciona?

1. **Tú programas tus clases normalmente** en Eclipse
2. **Eclipse sincroniza tu horario con Wellhub** — las clases aparecen en la app de Wellhub
3. **Los usuarios de Wellhub reservan** desde su app
4. **Eclipse recibe la reservación** y el alumno queda registrado en la clase
5. **Validas el check-in** cuando el alumno llega al estudio
6. **Wellhub te paga** por los check-ins validados (el proceso de pago lo manejas directamente con Wellhub)

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

## Validar check-ins

Cuando un alumno de Wellhub llega a clase, debes **validar su check-in**. Esto confirma su asistencia y le indica a Wellhub que el alumno efectivamente asistió.

### Desde el panel de administración

1. Ve a la clase del día en **Clases**
2. Encuentra al alumno de Wellhub en la lista
3. Haz clic en **Validar check-in**

### Desde el panel del profesor

Los profesores también pueden validar check-ins directamente desde su lista de clase. Ver [Asistencia del profesor](../profesor/asistencia.md).

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
- **Valida check-ins el mismo día** — No dejes pendientes para no olvidar
- **Revisa las reservaciones de Wellhub** como parte de tu rutina diaria
- **Guarda los reportes** de check-ins para tu contabilidad

## Problemas comunes

| Problema | Solución |
|----------|----------|
| "Mi clase no aparece en Wellhub" | Sincroniza el horario desde Configuración |
| "Un alumno de Wellhub no aparece en la lista" | Revisa Wellhub Bookings y valida manualmente si es necesario |
| "No puedo validar un check-in" | Verifica que el alumno esté en la lista correcta de la clase |
| "Discrepancia en los pagos" | Exporta los datos y contacta al soporte de Wellhub |

---

Con esto terminamos el Manual del Administrador. Continúa con el [Manual del Profesor](../profesor/bienvenida.md) si necesitas entrenar a tu equipo de profesores.

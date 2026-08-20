# Activar Wellhub paso a paso

Esta guía es para estudios que van a conectar **Wellhub** (antes Gympass) con su instancia de Eclipse por primera vez.

¿Tu integración ya está funcionando y solo quieres saber cómo operarla día a día? Ve a [Wellhub](./wellhub.md).

## Antes de empezar

Necesitas tener a la mano:

- **Contrato activo con Wellhub** como estudio partner
- **Tu Gym ID de Wellhub** — te lo da tu contacto comercial de Wellhub
- **Acceso al portal de socios de Wellhub**, con permisos para conectar un sistema de gestión
- **Tu instancia de Eclipse en línea**, con tu dominio propio ya configurado
- **Un usuario administrador** en Eclipse

> **No hagas clic en "Conectar" en el portal de Wellhub todavía.** Primero Eclipse tiene que registrar tu estudio (Paso 2). Si te adelantas, Wellhub recibirá un error y tendrás que repetir la conexión.

## Quién hace qué

La activación se reparte entre tres partes. Estos son los pasos y de quién depende cada uno:

| Paso | ¿Quién lo hace? |
|------|-----------------|
| 1. Compartir tus datos con Eclipse | Tú |
| 2. Preparar y registrar tu instancia | Eclipse |
| 3. Conectar Eclipse desde el portal de Wellhub | Tú (con Wellhub) |
| 4. Habilitar la integración en Eclipse | Tú |
| 5. Mapear tus categorías al catálogo de Wellhub | Tú |
| 6. Elegir qué clases se publican en Wellhub | Tú |
| 7. Sincronizar y revisar el estado | Tú |
| 8. Hacer una reserva de prueba | Tú (con Wellhub) |

Los pasos 4 al 8 se hacen todos desde tu panel de administración y te toman menos de una hora. Lo que suele marcar el ritmo es la respuesta de tu contacto en Wellhub.

---

## Paso 1: Comparte tus datos con Eclipse

Escribe al soporte de Eclipse avisando que vas a activar Wellhub, e incluye:

- **Tu Gym ID de Wellhub** (el identificador que te dio Wellhub)
- **El nombre de tu estudio** tal como aparece registrado en Wellhub
- **El dominio de tu instancia** de Eclipse (por ejemplo, `app.tuestudio.com`)
- **La fecha en la que quieres salir en vivo**

Con eso Eclipse puede dejar todo listo del lado técnico.

## Paso 2: Eclipse prepara tu instancia

Este paso no requiere nada de tu parte. Eclipse se encarga de:

- Cargar las credenciales de la API de Wellhub en tu instancia
- Generar la llave de seguridad con la que se firman y validan las notificaciones que envía Wellhub
- Registrar tu estudio (Gym ID + dominio) en el enlace central que Wellhub usa para conectar estudios

Eclipse te confirma cuando esté listo. **Espera esa confirmación antes de seguir al Paso 3.**

## Paso 3: Conecta Eclipse desde el portal de Wellhub

Ya con la confirmación de Eclipse:

1. Entra al **portal de socios de Wellhub**
2. Busca la sección de integración con tu sistema de gestión (según el portal aparece como *Integrations*, *Sistema de gestión* o *CMS*)
3. Selecciona **Eclipse** como tu sistema
4. Haz clic en **Conectar**

Detrás de escena, Wellhub avisa a tu instancia, que guarda tu Gym ID y registra automáticamente las notificaciones de reservas, cancelaciones y check-ins. **No necesitas darle ninguna URL a Wellhub** — la conexión se establece sola.

### Verifica que la conexión llegó

1. Entra a Eclipse y ve a **Configuración**
2. Baja hasta la sección **Integración con Wellhub**
3. El campo **Wellhub Gym ID** debe aparecer lleno

Si sigue vacío después de unos minutos, avisa a Eclipse (ver [Problemas comunes](#problemas-comunes-durante-la-activación)).

> **La integración todavía no está activa.** Conectar desde Wellhub solo establece el enlace: nada se publica hasta que tú lo habilites en el Paso 4. Esto es intencional, para que puedas revisar todo antes de salir en vivo.

## Paso 4: Habilita la integración en Eclipse

1. Ve a **Configuración**
2. En la sección **Integración con Wellhub**, marca la casilla **Habilitar integración con Wellhub**
3. Haz clic en **Guardar Configuración**

Al guardar aparecen los controles que estaban ocultos: el mapeo de categorías, el estado de sincronización y el botón para sincronizar. También aparece el campo **Disponible en Wellhub** al editar tus plantillas de clase.

Aún no se envía nada a Wellhub: eso ocurre hasta que mapees categorías (Paso 5) y marques tus plantillas (Paso 6).

> Si al guardar te aparece un aviso pidiendo mapear ciertas categorías antes de activar, es porque ya tienes plantillas marcadas para Wellhub cuya categoría no está mapeada. Ve al Paso 5, mapéalas, y vuelve a intentarlo.

## Paso 5: Mapea tus categorías al catálogo de Wellhub

Wellhub organiza las clases con su propio catálogo (Yoga, Pilates, Funcional, etc.). Cada categoría tuya tiene que apuntar a una categoría de Wellhub.

**Las clases cuya categoría no esté mapeada no aparecen en Wellhub.**

Desde **Configuración**:

1. Ve a **Configuración** → sección **Mapeo de Categorías**
2. Para cada categoría de tu estudio, elige la categoría de Wellhub que le corresponde
3. Haz clic en **Guardar Configuración**

También puedes hacerlo por categoría: ve a **Categorías** en el menú, edita una, y usa el campo **Categoría en Wellhub**.

> Si tienes muchas categorías ya creadas, pide a Eclipse que corra el mapeo masivo: empata automáticamente las que coinciden por nombre y te reporta las que quedaron pendientes.

## Paso 6: Elige qué clases se publican en Wellhub

No todas tus clases tienen que ofrecerse en Wellhub. Lo decides plantilla por plantilla:

1. Ve a **Plantillas** en el menú
2. Edita la plantilla que quieres ofrecer
3. Marca **Disponible en Wellhub**
4. Opcional: llena **Límite de lugares Wellhub por clase** para reservar cupo a tus propios alumnos. Por ejemplo, en una clase de 20 lugares, un límite de 5 significa que Wellhub nunca ocupa más de 5
5. Guarda y repite con las demás plantillas

Si dejas el límite vacío, Wellhub puede tomar todos los lugares disponibles de la clase.

## Paso 7: Sincroniza y revisa el estado

1. Ve a **Configuración** → **Sincronizar Horario con Wellhub**
2. Haz clic en **Sincronizar Ahora** y confirma
3. Espera un momento y recarga la página
4. Revisa el panel **Estado de Sincronización con Wellhub**

El panel te dice cuántas plantillas y cuántas clases próximas ya están en Wellhub. Si todo salió bien verás **"Todo en orden"**. Si algo falta, Eclipse lista cada plantilla o clase con el motivo, para que sepas exactamente qué corregir.

Solo se envían las clases dentro de tu **ventana de reservación** (el mismo plazo con el que tus alumnos pueden reservar, configurado en **Configuración**). Las clases más lejanas se van sincronizando conforme entran a esa ventana.

De aquí en adelante la sincronización es automática: corre cada 30 minutos, y además los cambios de horario y las cancelaciones de clase se envían a Wellhub en el momento.

## Paso 8: Haz una reserva de prueba

Antes de dar por terminada la activación, confirma que el circuito completo funciona:

1. Pide a alguien con la app de Wellhub que reserve una de tus clases, o coordínalo con tu contacto de Wellhub
2. En Eclipse, ve a **Wellhub** (en el menú, sección **Integraciones**) — la reservación debe aparecer ahí
3. Abre esa clase en **Clases** — la persona debe aparecer en la lista, marcada como check-in externo y ya validada
4. Si la reserva era solo de prueba, cancélala desde la app de Wellhub

Si los cuatro puntos se cumplen, la integración está lista.

---

## Checklist de activación

- [ ] Datos enviados a Eclipse (Gym ID, nombre en Wellhub, dominio, fecha de salida)
- [ ] Eclipse confirmó que tu estudio quedó registrado
- [ ] Conectaste Eclipse desde el portal de Wellhub
- [ ] El campo **Wellhub Gym ID** aparece lleno en Configuración
- [ ] La casilla **Habilitar integración con Wellhub** está marcada
- [ ] Todas tus categorías están mapeadas al catálogo de Wellhub
- [ ] Las plantillas que quieres ofrecer están marcadas como **Disponible en Wellhub**
- [ ] El panel de estado muestra **"Todo en orden"**
- [ ] Una reserva de prueba llegó a Eclipse y quedó validada

## Problemas comunes durante la activación

| Problema | Qué significa | Qué hacer |
|----------|---------------|-----------|
| El **Gym ID** sigue vacío después de conectar | La conexión desde Wellhub no llegó a tu instancia | Avisa a Eclipse con la fecha y hora en que hiciste clic en Conectar; Eclipse puede ver si el intento llegó y reenviarlo |
| Wellhub muestra un error al conectar, o dice que el gimnasio no está registrado | Tu estudio aún no estaba dado de alta del lado de Eclipse (Paso 2) | Avisa a Eclipse, espera su confirmación y vuelve a hacer clic en **Conectar** |
| No puedo marcar la casilla: Eclipse pide mapear categorías | Hay plantillas marcadas para Wellhub cuya categoría no está mapeada | Mapea las categorías que menciona el aviso (Paso 5) y vuelve a intentarlo |
| El campo **Wellhub Product ID** quedó vacío | Eclipse no pudo leerlo automáticamente desde Wellhub | Pídelo a tu contacto de Wellhub y captúralo en Configuración, o pide a Eclipse que lo complete |
| Sincronicé pero una clase no aparece en Wellhub | Casi siempre es la categoría sin mapear, la plantilla sin marcar, o una clase fuera de la ventana de reservación | Revisa el panel de estado: ahí se lista cada clase pendiente con su motivo |
| Todo sincronizó pero no llegan reservas | Puede ser que tus clases aún no estén visibles del lado de Wellhub | Confirma con tu contacto de Wellhub que tu estudio ya está publicado en la app |

---

## Después de la activación

Ya no tienes que repetir nada de esto. Para el uso diario — ver reservaciones, entender los check-ins automáticos, exportar datos para conciliar pagos — continúa en [Wellhub](./wellhub.md).

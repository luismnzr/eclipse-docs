# Clases

La gestión de clases en Eclipse tiene tres niveles:

1. **Categorías** — Tipos generales (yoga, pilates, barre, etc.)
2. **Plantillas de clase** — Definiciones reutilizables (nombre, descripción, duración, etc.)
3. **Clases programadas** — Instancias específicas en el calendario (fecha, hora, profesor)

## 1. Categorías

Las categorías agrupan tus clases por tipo. Aparecen como filtros cuando los alumnos ven el horario.

### Crear una categoría

1. Ve a **Categorías** en el menú
2. Haz clic en **Nueva Categoría**
3. Llena los campos:
   - **Nombre** — Ej. "Yoga", "Pilates", "Barre"
   - **Descripción** — Opcional, texto corto
   - **Orden** — Número que determina cómo se ordenan en la lista
4. Guarda

### Editar o eliminar

Desde la lista de categorías puedes editar o eliminar cualquiera. Si una categoría tiene plantillas asociadas, no podrás eliminarla hasta reasignar esas plantillas.

## 2. Plantillas de Clase

Una plantilla define un tipo de clase que ofreces de forma recurrente. En vez de escribir los mismos datos cada vez que programas una clase, creas una plantilla y la reutilizas.

### Crear una plantilla

1. Ve a **Plantillas de clase**
2. Haz clic en **Nueva Plantilla**
3. Llena los campos:

| Campo | Descripción |
|-------|-------------|
| **Nombre** | Nombre visible de la clase (ej. "Vinyasa Flow") |
| **Categoría** | A qué categoría pertenece |
| **Estilo** | Estilo específico (ej. "Ashtanga") |
| **Nivel** | Principiante, intermedio, avanzado |
| **Descripción** | Qué esperar de la clase |
| **Duración por defecto** | En minutos (ej. 60) |
| **Capacidad por defecto** | Cuántos alumnos máximo |
| **Imagen** | Foto representativa |

4. Guarda

La plantilla aparecerá como opción al programar clases.

## 3. Clases Programadas

Las clases programadas son las instancias reales en tu calendario: una clase específica en una fecha y hora, con un profesor asignado.

### Ver el calendario

Ve a **Clases** para ver todas las clases programadas. Puedes verlas en formato calendario o lista.

### Programar una clase individual

1. Haz clic en **Nueva Clase**
2. Selecciona la **plantilla** base
3. Asigna un **profesor** (debe ser un usuario con rol de profesor)
4. Define la **fecha** y **hora de inicio**
5. Opcionalmente ajusta la **duración** o **capacidad** (si quieres cambiarlas respecto a la plantilla)
6. Guarda

La clase aparecerá en el calendario y los alumnos podrán reservar (dependiendo de la ventana de reservación configurada).

### Programar clases recurrentes

Para crear varias clases a la vez (por ejemplo, todos los lunes a las 7am durante 8 semanas):

1. Desde **Nueva Clase**, busca la opción de **clases recurrentes**
2. Define:
   - Plantilla
   - Profesor
   - Hora de inicio
   - Duración
   - **Días de la semana** (ej. lunes, miércoles, viernes)
   - **Fecha de inicio** y **fecha de fin**
3. Guarda

El sistema creará todas las clases correspondientes en tu calendario.

### Editar o cancelar una clase

Desde el calendario, haz clic en una clase para:

- **Editar** — Cambiar fecha, hora, profesor, capacidad
- **Cancelar** — La clase se marca como cancelada. Todos los alumnos reservados son notificados por correo y sus **créditos son restaurados automáticamente**.

### Ver la lista de una clase

Al entrar al detalle de una clase verás:

- **Alumnos confirmados** — Quiénes reservaron
- **Lista de espera** — Alumnos esperando un lugar
- **Check-ins externos** — Alumnos de Wellhub u otras plataformas
- **Acciones de asistencia** — Marcar asistencia, no-show, etc.

## Qué pasa cuando cancelas una clase

Si cancelas una clase desde el panel (ej. el profesor se enfermó):

1. La clase se marca como cancelada
2. Todos los alumnos con reservación reciben un correo de aviso
3. Los créditos se **restauran** a los paquetes correspondientes
4. Los alumnos en lista de espera también son notificados

## Consejos

- **Crea plantillas genéricas reutilizables.** No hagas una plantilla por cada clase del calendario.
- **Revisa la ocupación en reportes.** Úsalo para decidir qué clases programar más o menos.
- **Asigna profesores antes de programar.** Necesitas que los profesores existan como usuarios primero.

**Siguiente:** [Paquetes y Créditos →](./paquetes.md)

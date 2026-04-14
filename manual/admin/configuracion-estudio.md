# Configuración del Estudio

Antes de empezar a recibir reservaciones, necesitas configurar la información básica de tu estudio y las reglas que regirán el sistema de reservaciones.

Todo se edita desde **Configuración** en el menú de administración.

## Información del Estudio

Estos son los datos generales de tu estudio. Aparecerán en correos, en el sitio web y en algunos reportes.

| Campo | Descripción |
|-------|-------------|
| **Nombre del estudio** | El nombre que verán tus alumnos en todo el sitio |
| **Correo de contacto** | Donde tus alumnos pueden contactarte |
| **Teléfono** | Número de contacto del estudio |
| **Dirección** | Dirección física del estudio |
| **Zona horaria** | **Importante:** determina los horarios que ven tus alumnos |

> **Zona horaria:** Eclipse guarda todas las fechas en UTC y las muestra en la zona horaria que elijas. Si tu estudio está en Ciudad de México, usa `America/Mexico_City`. Si está en otro país, busca tu zona en la lista.

## Reglas de Reservación

Aquí configuras cómo funcionan las reservaciones y cancelaciones.

### Ventana de cancelación

**¿Qué es?** El tiempo (en horas) antes del inicio de una clase en que un alumno puede cancelar sin perder su crédito.

- **Valor por defecto:** 12 horas
- **Ejemplo:** Si está en 12, un alumno que tiene clase a las 7pm puede cancelar sin penalización hasta las 7am del mismo día.

### Penalización por cancelación tardía

**¿Qué es?** Define si las cancelaciones dentro de la ventana pierden el crédito.

- **Activado (recomendado):** Los alumnos pierden el crédito si cancelan tarde
- **Desactivado:** Siempre recuperan el crédito sin importar cuándo cancelen

### Lista de espera activada

Permite a los alumnos unirse a una lista de espera cuando una clase está llena. Si alguien cancela, el siguiente en la lista es promovido automáticamente.

- **Recomendado:** Activado

### Tamaño máximo de lista de espera

Cuántos alumnos pueden estar en lista de espera por clase.

- **Valor por defecto:** 5

### Ventana de reservación

Cuántos días en el futuro pueden reservar los alumnos.

- **Valor por defecto:** 14 días
- **Ejemplo:** Con 14, si hoy es lunes, los alumnos pueden reservar clases hasta el lunes de dos semanas después.

## Moneda

Define la moneda en la que se procesan todos los pagos. Se usa en Stripe al procesar cobros.

- **Por defecto:** `mxn` (pesos mexicanos)
- **Otras opciones comunes:** `usd`, `eur`, `cop`, `ars`

> **Importante:** Cambiar la moneda después de tener ventas activas puede causar confusión. Configúrala correctamente desde el inicio.

## Funciones

### Tienda activada

Activa o desactiva el módulo de tienda (productos físicos). Si tu estudio no vende productos, déjalo desactivado.

## Guardar cambios

Después de editar cualquier configuración, haz clic en **Guardar** al final del formulario. Los cambios se aplican inmediatamente.

## ¿Qué sigue?

Una vez configurado tu estudio, el siguiente paso es crear tus **categorías** y **plantillas de clase**.

**Siguiente:** [Clases →](./clases.md)

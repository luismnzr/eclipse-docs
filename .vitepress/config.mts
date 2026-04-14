import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Eclipse',
  description: 'Documentación de Eclipse — plataforma de gestión para estudios de fitness',
  lang: 'es-MX',
  cleanUrls: true,
  lastUpdated: true,

  // Exclude README.md files — they exist for GitHub browsing only.
  // The VitePress site uses index.md files instead.
  srcExclude: ['**/README.md'],

  head: [
    ['meta', { name: 'theme-color', content: '#000000' }],
    ['meta', { property: 'og:title', content: 'Eclipse — Documentación' }],
    ['meta', { property: 'og:description', content: 'Plataforma de gestión para estudios de fitness' }],
    ['meta', { property: 'og:type', content: 'website' }],
  ],

  themeConfig: {
    siteTitle: 'Eclipse Docs',

    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Manual', link: '/manual/' },
      {
        text: 'Developer Docs',
        items: [
          { text: 'Introduction', link: '/guide/introduction' },
          { text: 'Architecture', link: '/guide/architecture' },
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Configuration', link: '/guide/configuration' },
        ],
      },
    ],

    sidebar: {
      '/manual/': [
        {
          text: 'Manual del Administrador',
          collapsed: false,
          items: [
            { text: 'Bienvenida', link: '/manual/admin/bienvenida' },
            { text: 'Configuración del Estudio', link: '/manual/admin/configuracion-estudio' },
            { text: 'Clases', link: '/manual/admin/clases' },
            { text: 'Paquetes y Créditos', link: '/manual/admin/paquetes' },
            { text: 'Suscripciones', link: '/manual/admin/suscripciones' },
            { text: 'Usuarios', link: '/manual/admin/usuarios' },
            { text: 'Reservaciones y Asistencia', link: '/manual/admin/reservaciones' },
            { text: 'Reportes', link: '/manual/admin/reportes' },
            { text: 'Eventos', link: '/manual/admin/eventos' },
            { text: 'Tienda', link: '/manual/admin/tienda' },
            { text: 'Wellhub', link: '/manual/admin/wellhub' },
          ],
        },
        {
          text: 'Manual del Profesor',
          collapsed: false,
          items: [
            { text: 'Bienvenida', link: '/manual/profesor/bienvenida' },
            { text: 'Tu Horario', link: '/manual/profesor/horario' },
            { text: 'Lista y Asistencia', link: '/manual/profesor/asistencia' },
          ],
        },
      ],

      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'Architecture', link: '/guide/architecture' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Configuration', link: '/guide/configuration' },
          ],
        },
        {
          text: 'Features',
          items: [
            { text: 'Reservations', link: '/features/reservations' },
            { text: 'Packages & Credits', link: '/features/packages-and-credits' },
            { text: 'Subscriptions', link: '/features/subscriptions' },
            { text: 'Waitlist', link: '/features/waitlist' },
            { text: 'Integrations', link: '/features/integrations' },
            { text: 'Theming', link: '/features/theming' },
            { text: 'Admin Dashboard', link: '/features/admin-dashboard' },
            { text: 'Teacher Views', link: '/features/teacher-views' },
          ],
        },
        {
          text: 'Operations',
          items: [
            { text: 'Client Setup Guide', link: 'https://github.com/luismnzr/eclipse-v1/blob/main/docs/CLIENT_SETUP_GUIDE.md' },
            { text: 'Deployment Guide', link: 'https://github.com/luismnzr/eclipse-v1/blob/main/docs/DEPLOYMENT_GUIDE.md' },
          ],
        },
      ],

      '/features/': [
        {
          text: 'Guide',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'Architecture', link: '/guide/architecture' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Configuration', link: '/guide/configuration' },
          ],
        },
        {
          text: 'Features',
          items: [
            { text: 'Reservations', link: '/features/reservations' },
            { text: 'Packages & Credits', link: '/features/packages-and-credits' },
            { text: 'Subscriptions', link: '/features/subscriptions' },
            { text: 'Waitlist', link: '/features/waitlist' },
            { text: 'Integrations', link: '/features/integrations' },
            { text: 'Theming', link: '/features/theming' },
            { text: 'Admin Dashboard', link: '/features/admin-dashboard' },
            { text: 'Teacher Views', link: '/features/teacher-views' },
          ],
        },
      ],
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Buscar',
                buttonAriaLabel: 'Buscar en la documentación',
              },
              modal: {
                displayDetails: 'Mostrar detalles',
                resetButtonTitle: 'Limpiar búsqueda',
                backButtonTitle: 'Cerrar búsqueda',
                noResultsText: 'Sin resultados para',
                footer: {
                  selectText: 'para seleccionar',
                  navigateText: 'para navegar',
                  closeText: 'para cerrar',
                },
              },
            },
          },
        },
      },
    },

    footer: {
      message: 'Documentación de Eclipse',
      copyright: 'Eclipse CMS',
    },

    docFooter: {
      prev: 'Anterior',
      next: 'Siguiente',
    },

    outline: {
      label: 'En esta página',
      level: [2, 3],
    },

    lastUpdated: {
      text: 'Última actualización',
    },

    returnToTopLabel: 'Volver arriba',
    sidebarMenuLabel: 'Menú',
    darkModeSwitchLabel: 'Tema',
    lightModeSwitchTitle: 'Cambiar a modo claro',
    darkModeSwitchTitle: 'Cambiar a modo oscuro',
  },
})

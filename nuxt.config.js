const path = require('path');

export default {
    head: {
        title: 'duotek_test',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [
            // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ],
    },

    styleResources: {
        scss: '~/assets/scss/shared/*.scss',
    },

    css: [
        '~/assets/scss/main.scss'
    ],

    pageTransition: {
        name: 'page',
        mode: 'out-in',
    },

    router: {
        linkActiveClass: 'active-link',
    },

    plugins: [
        '~plugins/api',
        '~plugins/axios',
    ],

    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/style-resources',
    ],
}

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


    router: {
        linkExactActiveClass: 'active-link',
    },

    plugins: [
        '~plugins/axios',
        '~plugins/api',
    ],

    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/style-resources',
    ],

    axios: {},

    build: {},
}

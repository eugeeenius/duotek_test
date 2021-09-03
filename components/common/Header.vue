<template>
    <header :class="$style.Header">
        <nuxt-link to="/">
            <Logo :inverse="inverse" />
        </nuxt-link>

        <nav :class="$style.nav">
            <nuxt-link
                v-for="item in items"
                :key="item.name"
                :class="$style.link"
                :to="item.link"
            >
                {{ item.name }}
            </nuxt-link>
        </nav>
    </header>
</template>

<script>
// Components
import Logo from './Logo'

export default {
    name: 'Header',

    components: { Logo },

    props: {
        inverse: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            items: [
                {
                    name: 'Тендеры',
                    link: '/',
                },
                {
                    name: 'Компании',
                    link: '/company',
                },
                {
                    name: 'Продукты',
                    link: '/',
                },
                {
                    name: 'Кейсы',
                    link: '/',
                },
                {
                    name: 'Блог',
                    link: '/',
                },
            ],
        }
    },
}
</script>

<style lang="scss" module>
.Header {
    display: flex;
    justify-content: space-between;
}

.nav {
    display: flex;
    justify-self: center;
}

.link {
    display: inline;
    padding: 5px 20px;
}
</style>

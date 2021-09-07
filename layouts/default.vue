<template>
    <div :class="$style.layout">
        <Header
            :inverse="isDark"
            :items="menuItems"
        />

        <main class="container"
              :class="$style.main">
            <nuxt/>
        </main>

        <Footer />

        <BurgerMenu :items="menuItems" />
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    // Components
    import Header from '../components/common/Header'
    import Footer from '../components/common/Footer';
    import BurgerMenu from '../components/common/BurgerMenu';

    export default {
        components: {BurgerMenu, Footer, Header},

        data() {
            return {
                menuItems: [
                    {
                        name: 'Тендеры',
                        link: '/empty/1',
                    },
                    {
                        name: 'Компании',
                        link: '/company',
                    },
                    {
                        name: 'Продукты',
                        link: '/empty/2',
                    },
                    {
                        name: 'Кейсы',
                        link: '/empty/3',
                    },
                    {
                        name: 'Блог',
                        link: '/empty/4',
                    },
                ],
            };
        },

        computed: {
            ...mapState({
                isDark: state => state.darkTheme,
            }),
        },
    }
</script>

<style lang="scss" module>
    .layout {
        position: relative;
    }

    .main {
        background-color: #fff;
    }
</style>

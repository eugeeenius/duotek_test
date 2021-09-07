<template>
    <div :class="$style.layout">
        <Header :inverse="isDark"/>

        <main class="container"
              :class="$style.main">
            <nuxt/>
        </main>

        <Footer />
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    // Components
    import Header from '../components/common/Header'
    import Footer from '../components/common/Footer';

    export default {
        components: {Footer, Header},

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

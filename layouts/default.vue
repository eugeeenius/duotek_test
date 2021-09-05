<template>
    <div>
        <Header/>

        <main class="container"
              :class="$style.main">
            <nuxt/>
        </main>

        <Footer />
    </div>
</template>

<script>
    // Components
    import Header from '../components/common/Header'
    import Footer from '../components/common/Footer';

    export default {
        components: {Footer, Header}
    }
</script>

<style lang="scss" module>
    .main {
        background-color: #fff;
    }
</style>

<template>
    <div>
        <Header/>

        <main class="container"
              :class="$style.main">
            <nuxt/>
        </main>
    </div>
</template>

<script>
    // Components
    import Header from '../components/common/Header'

    export default {
        components: {Header}
    }
</script>

<style lang="scss" module>
    .main {
        background-color: #fff;
    }
</style>

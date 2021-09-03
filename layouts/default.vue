<template>
    <div :class="$style.wrapper">
        <Header />

        <main :class="$style.main">
            <nuxt />
        </main>
    </div>

</template>

<script>
// Components
import Header from '../components/common/Header'

export default {
    components: { Header }
}
</script>

<style lang='scss' module>
.wrapper {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 36px;
    background-color: #fff;
}
</style>

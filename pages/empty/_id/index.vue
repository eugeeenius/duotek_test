<template>
    <h1 :class="$style.EmptyPage">Empty Page {{ $route.params.id }}</h1>
</template>

<script>
    export default {
        name: 'CompaniesPage',
    }
</script>

<style lang="scss" module>
    .EmptyPage {
        min-height: 80vh;
    }
</style>

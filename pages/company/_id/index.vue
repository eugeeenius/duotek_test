<template>
    <div :class="$style.CompanyDetailPage">
        CompanyDetailPage {{ $route.params.id }}
    </div>
</template>

<script>
    // Components

    export default {
        name: 'CompanyDetailPage',

    };
</script>

<style lang="scss" module>
    .CompanyDetailPage {
        //
    }
</style>

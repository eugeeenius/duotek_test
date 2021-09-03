<template>
    <div :class="$style.CompaniesFilter">
        <div :class="$style.name">Отрасль</div>
    </div>
</template>

<script>
    // Components
    import Multiselect from 'vue-multiselect';

    export default {
        name: 'CompaniesFilter',
    };
</script>

<style lang="scss" module>
    .CompaniesFilter {
        width: 264px;
        padding: 18px 20px;
    }
</style>

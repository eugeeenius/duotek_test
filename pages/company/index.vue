<template>
    <section :class="$style.CompaniesPage">
        <h1 class="title">Каталог компаний</h1>

        <SearchBar @on-search="handleSearch" />
    </section>
</template>

<script>
    // Components
    import SearchBar from '../../components/pages/company/SearchBar';

    export default {
        name: 'CompaniesPage',

        components: {SearchBar},

        methods: {
            handleSearch(val) {
                console.log(val);
            },
        },
    }
</script>

<style lang="scss" module>
    .CompaniesPage {
        position: relative;
        padding: 75px 0 44px;
    }
</style>

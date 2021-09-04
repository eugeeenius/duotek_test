<template>
    <section :class="$style.CompaniesPage">
        <h1 class="title">Каталог компаний</h1>

        <SearchBar @on-search="handleSearch" />

        <CompaniesFilter
            :class="$style.filter"
            :values="values"
            :specs="specs"
            @change="onFilterChange"
        />
    </section>
</template>

<script>
    // Components
    import SearchBar from '../../components/pages/company/SearchBar';
    import CompaniesFilter from '../../components/pages/company/CompaniesFilter';

    export default {
        name: 'CompaniesPage',

        components: {
            CompaniesFilter,
            SearchBar,
        },

        async asyncData({$axios, $api}) {
            try {
                // const [
                //     definitionsRes,
                //     companiesRes,
                //     infoRes,
                // ] = await Promise.all([
                //     $axios.$get($api.definitions),
                //     $axios.$get($api.companies),
                //     $axios.$get($api.info),
                // ]);

                const definitionsRes = await $axios.$get($api.definitions);

                const specs = {
                    industry: definitionsRes.Industry,
                    specialization: definitionsRes.CompanySpecialization,
                };

                const defaultValues = {
                    industry: specs.industry[0],
                    specialization: specs.specialization[0],
                };

                return {
                    definitions: definitionsRes,
                    values: defaultValues,
                    specs: specs,
                };
            } catch(e) {
                console.warn('[CompaniesPage] asyncData: ', e);
            }
        },

        data() {
            return {
                definitions: {},
                values: {},
                specs: {},
            };
        },

        methods: {
            handleSearch(val) {
                console.log(val);
            },
            onFilterChange(val) {
                this.values = {...this.values, ...val};
            },
        },
    }
</script>

<style lang="scss" module>
    .CompaniesPage {
        position: relative;
        padding: 75px 0 44px;
    }

    .filter {
        position: absolute;
        top: 65px;
        right: 0;
    }
</style>

<template>
    <div :class="$style.CompaniesHead">
        <SearchBar
            :value="values.search"
            @on-search="onChange({search: $event})"
        />

        <div :class="$style.filter">
            <CompaniesFilter
                v-if="specs.industry"
                :values="values"
                :specs="specs"
                @change="onChange"
            />
        </div>
    </div>
</template>

<script>
    // Components
    import SearchBar from './SearchBar';
    import CompaniesFilter from './CompaniesFilter';

    export default {
        name: 'CompaniesHead',

        components: {CompaniesFilter, SearchBar},

        props: {
            specs: {
                type: Object,
                default: () => ({}),
            },
            values: {
                type: Object,
                default: () => ({}),
            },
        },

        methods: {
            onChange(val) {
                const updatedValues = {...this.values, ...val, page: 1}
                this.$emit('change', updatedValues);
            },
        },
    };
</script>

<style lang="scss" module>
    .CompaniesHead {
        position: relative;
    }

    .filter {
        position: absolute;
        top: 0;
        right: 36px;
        width: 264px;

        @include mobile {
            position: initial;
            width: 100%;
            margin-top: 20px;
        }
    }
</style>

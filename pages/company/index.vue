<template>
    <section :class="$style.CompaniesPage">
        <h1 class="title">Каталог компаний</h1>

        <SearchBar @on-search="handleSearch"/>

        <CompaniesFilter
            v-if="specs.industries"
            :class="$style.filter"
            :values="values"
            :specs="specs"
            @change="onFilterChange"
        />

        <section :class="[$style.list, {[$style._reloading]: isReloading}]">
            <CompanyCard
                v-for="company in companies"
                :key="company.title + company.created_at"
                :data="company"
                @click.native="$router.push('/company/' + company.id)"
            />
        </section>

        <ul v-if="pageInfo.meta"
            :class="$style.pagination">
            <li
                v-for="index in pageInfo.meta.last_page"
                :key="index"
                :class="[$style.paginationItem, {[$style._active]: pageInfo.meta.current_page === index}]"
                @click="onPaginationClick(index)"
            >
                {{ index }}
            </li>
        </ul>
    </section>
</template>

<script>
    // Components
    import SearchBar from '../../components/pages/company/SearchBar';
    import CompaniesFilter from '../../components/pages/company/CompaniesFilter';
    import CompanyCard from '../../components/pages/company/CompanyCard';

    export default {
        name: 'CompaniesPage',

        components: {
            CompanyCard,
            CompaniesFilter,
            SearchBar,
        },

        async asyncData({$axios, $api, route}) {
            try {
                const [
                    definitionsRes,
                    companiesRes,
                ] = await Promise.all([
                    $axios.$get($api.definitions),
                    $axios.$get($api.companies.list, {
                        params: {
                            per_page: 10,
                            page: 1,
                        },
                    }),
                ]);

                const defaultValues = {
                    industries: {
                        id: null,
                        title: 'Все отрасли'
                    },
                    specializations: {
                        id: null,
                        title: 'Все специализации'
                    },
                };

                const specs = {
                    industries: [defaultValues.industries, ...definitionsRes.Industry],
                    specializations: [defaultValues.specializations, ...definitionsRes.CompanySpecialization],
                };

                const {links, meta} = companiesRes;

                const query = Object.keys(route.query).length ? route.query : null;

                return {
                    definitions: definitionsRes,
                    values: defaultValues,
                    specs: specs,
                    companies: companiesRes.data,
                    pageInfo: {
                        links,
                        meta,
                    },
                    initialQuery: query,
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
                companies: [],
                pageInfo: {},
                isReloading: false,
                search: '',
                initialQuery: null,
            };
        },

        computed: {
            queryObj() {
                const params = {
                    specializations: this.values.specializations?.id,
                    industries: this.values.industries?.id,
                    search: this.search
                }

                Object.keys(params).forEach(key => {
                    if (!params[key]) {
                        delete params[key];
                    }
                });

                return params;
            },

            isQueryEmpty() {
                return !Object.keys(this.queryObj).length;
            },
        },

        created() {
            if (!this.initialQuery) return;

            Object.keys(this.initialQuery).forEach(key => {
                if (key === 'search') {
                    this.search = this.initialQuery[key];
                }
                if ((key === 'industries' || key === 'specializations') && Number(this.initialQuery[key])) {
                    const id = Number(this.initialQuery[key]);
                    this.values[key] = this.specs[key].find(el => el.id === id);
                }
            });

            this.filterCompanies();
        },

        methods: {
            handleSearch(val) {
                this.search= val
                this.changeQuery();
            },

            onFilterChange(val) {
                this.values = {...this.values, ...val};
                this.changeQuery();
            },

            async onPaginationClick(pageNumber) {
                this.isReloading = true;

                const header = document.getElementById('header');
                if (!header) return;
                header.scrollIntoView({
                    behavior: 'smooth',
                })

                try {
                    const res = await this.$axios.$get(this.$api.companies.list, {
                        params: {
                            per_page: 10,
                            page: pageNumber,
                        }
                    });

                    const {data, links, meta} = res;

                    this.companies = data;
                    this.pageInfo = {
                        links,
                        meta,
                    };
                } catch(e) {
                    console.warn('[CompaniesPage] onPaginationClick: ', e);
                }

                setTimeout(() => {
                    this.isReloading = false;
                }, 400);
            },

            changeQuery() {
                this.$router.push({
                    path: '/company',
                    query: this.queryObj,
                });

                this.filterCompanies();
            },

            filterCompanies() {
                if (this.isQueryEmpty) return;
                console.log('filterCompanies');
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

    .list {
        width: 792px;
        padding: 78px 0;
        opacity: 1;
        transition: opacity .6s ease;

        &._reloading {
            opacity: 0;
        }
    }

    .pagination {
        display: flex;
        justify-content: center;
        width: 100%;
    }

    .paginationItem {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        border-radius: 4px;
        background-color: transparent;
        font-size: 16px;
        color: $main-blue;
        transition: color, background-color $color-transition;
        cursor: pointer;

        &:not(:first-child) {
            margin-left: 4px;
        }

        &._active {
            background-color: $gray-bg;
            color: $gray;
        }
    }
</style>

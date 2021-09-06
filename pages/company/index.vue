<template>
    <section :class="$style.CompaniesPage">
        <h1 class="title">Каталог компаний</h1>

        <SearchBar
            :value="values.search"
            @on-search="handleSearch"
        />

        <CompaniesFilter
            v-if="specs.industry"
            :class="$style.filter"
            :values="values"
            :specs="specs"
            @change="onFilterChange"
        />

        <section :class="[$style.results, {[$style._reloading]: isReloading}]">
            <Loader
                v-if="isReloading"
                :class="$style.loader"
            />

            <div v-if="companies.length"
                 :class="$style.list">
                <CompanyCard
                    v-for="company in companies"
                    :key="company.title + company.created_at"
                    :data="company"
                    @click.native="$router.push('/company/' + company.id)"
                />
            </div>

            <div v-else-if="!isReloading"
                :class="$style.empty">По выбранным параметрам результатов не найдено</div>
        </section>

        <ul v-if="pageInfo.meta && pageInfo.meta.last_page > 1"
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
    import Loader from '../../components/common/Loader';

    export default {
        name: 'CompaniesPage',

        components: {
            Loader,
            CompanyCard,
            CompaniesFilter,
            SearchBar,
        },

        async asyncData({$axios, $api, query}) {
            const params = {
                per_page: 10,
                ...query,
            };

            try {
                const [
                    definitionsRes,
                    companiesRes,
                ] = await Promise.all([
                    $axios.$get($api.definitions),
                    $axios.$get($api.companies.list, {
                        params: params,
                    }),
                ]);

                const emptySpecs = {
                    industry: {
                        id: null,
                        title: 'Все отрасли'
                    },
                    specialization: {
                        id: null,
                        title: 'Все специализации'
                    },
                };

                const specs = {
                    industry: [emptySpecs.industry, ...definitionsRes.Industry],
                    specialization: [emptySpecs.specialization, ...definitionsRes.CompanySpecialization],
                };

                const defaultValues = {
                    industry: specs.industry.find(el => el.id === Number(params.industry)) ?? emptySpecs.industry,
                    specialization: specs.specialization.find(el => el.id === Number(params.specialization)) ?? emptySpecs.specialization,
                    search: params.search || '',
                    page: params.page || 1,
                };

                const {links, meta} = companiesRes;

                return {
                    definitions: definitionsRes,
                    values: defaultValues,
                    specs: specs,
                    companies: companiesRes.data,
                    pageInfo: {
                        links,
                        meta,
                    },
                };
            } catch(e) {
                console.warn('[CompaniesPage] asyncData: ', e);
            }
        },

        data() {
            return {
                definitions: {},
                values: {
                    industry: null,
                    category: null,
                    search: '',
                    page: 1
                },
                specs: {
                    industry: [],
                    category: [],
                },
                companies: [],
                pageInfo: {},
                isReloading: false,
            };
        },

        computed: {
            queryObj() {
                const params = {
                    specialization: this.values.specialization?.id,
                    industry: this.values.industry?.id,
                    search: this.values.search,
                    page: this.values.page,
                }

                Object.keys(params).forEach(key => {
                    if (!params[key]) {
                        delete params[key];
                    }
                });

                return params;
            },
        },

        created() {
            this.changeQuery();
        },

        methods: {
            handleSearch(val) {
                this.values.search = val;
                this.changeQuery();
            },

            onFilterChange(val) {
                this.values = {...this.values, ...val};
                this.changeQuery();
            },

            onPaginationClick(val) {
                this.values.page = val;
                this.changeQuery();
            },

            async fetchCompanies() {
                this.isReloading = true;
                window.scrollTo(0, 0);

                try {
                    const res = await this.$axios.$get(this.$api.companies.list, {
                        params: {
                            per_page: 10,
                            ...this.queryObj,
                        }
                    });

                    const {data, links, meta} = res;
                    this.companies = data;
                    this.pageInfo = {
                        links,
                        meta,
                    };
                } catch(e) {
                    console.warn('[CompaniesPage/onPaginationClick]: ', e);
                }

                setTimeout(() => {
                    this.$nextTick(() => {
                        this.isReloading = false;
                    })
                }, 400);
            },

            changeQuery() {
                this.$router.push({
                    path: '/company',
                    query: this.queryObj,
                });

                this.fetchCompanies();
            },
        },
    }
</script>

<style lang="scss" module>
    .CompaniesPage {
        position: relative;
        min-height: calc(100vh - 95px);
        padding: 75px 0 44px;
    }

    .filter {
        position: absolute;
        top: 65px;
        right: 0;
    }

    .results {
        position: relative;
        width: 792px;
        padding: 78px 0;

        &._reloading {

            .list {
                opacity: 0;
                transform: translateY(30px);
            }

            .empty {
                opacity: 0;
            }
        }
    }

    .loader {
        position: absolute;
        top: 78px;
        left: 50%;
        transform: translate3d(0, -50%, 0);
    }

    .list {
        //opacity: 1;
        transform: translateY(0);
        transition: opacity .4s, transform .3s;
    }

    .empty {
        display: flex;
        justify-content: center;
        font-size: 20px;
        //opacity: 1;
        transition: opacity .4s;
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

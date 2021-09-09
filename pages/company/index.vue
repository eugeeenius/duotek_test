<template>
    <section :class="$style.CompaniesPage">
        <h1 class="title">Каталог компаний</h1>

        <CompaniesHead
            :specs="specs"
            :values="values"
            @change="onValueChange"
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
                    @click.native="$router.push('/company/info?id=' + company.id)"
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
                @click="onValueChange({page: index})"
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
    import CompaniesHead from '../../components/pages/company/CompaniesHead';

    export default {
        name: 'CompaniesPage',

        components: {
            CompaniesHead,
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

        watchQuery(query) {
            this.fetchCompanies(query);
        },

        methods: {
            onValueChange(val) {
                this.values = {...this.value, ...val};
                this.changeQuery();
            },

            changeQuery() {
                this.$router.push({
                    path: '/company',
                    query: this.queryObj,
                });
            },

            async fetchCompanies(query) {
                this.isReloading = true;
                window.scrollTo(0, 0);

                try {
                    const res = await this.$axios.$get(this.$api.companies.list, {
                        params: {
                            per_page: 10,
                            ...query,
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
        },
    }
</script>

<style lang="scss" module>
    .CompaniesPage {
        position: relative;
        min-height: calc(100vh - 96px);
        padding: 75px 0 44px;

        @include mobile {
            padding: 28px 0 40px;
        }
    }

    .results {
        position: relative;
        width: 792px;
        padding: 78px 0;

        @include mobile {
            width: 100%;
            padding: 20px 0 44px;
        }

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
        transform: translate3d(-50%, 0, 0);

        @include mobile {
            top: 24px;
        }
    }

    .list {
        transform: translateY(0);
        transition: opacity .4s, transform .3s;
    }

    .empty {
        display: flex;
        justify-content: center;
        font-size: 20px;
        transition: opacity .4s;

        @include mobile {
            font-size: 18px;
            text-align: center;
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

<template>
    <section :class="$style.InfoPage">
        <div :class="$style.backlink"
             @click="$router.back()">
            <div :class="$style.arrow">
                <IconArrow />
            </div>
            Компании
        </div>

        <aside :class="$style.aside">
            <InfoAside :info="company" />
        </aside>

        <div :class="$style.content">
            <h1 class="title">{{ company.title }}</h1>

            <ul :class="$style.numbers">
                <li :class="$style.numbersItem">
                    {{ company.age }}<sup>{{ agePlural }}</sup>
                </li>

                <li :class="$style.numbersItem">
                    {{ company.staff }}<sup>человек</sup>
                </li>
            </ul>

            <p :class="$style.shortDescr"
               v-html="company.description_short"></p>

            <p :class="$style.fullDescr"
               v-html="company.description_full"></p>

            <div v-if="company.companySpecializations.length"
                 :class="$style.features">
                <h4>Проектная специализация</h4>

                <UiTagList :tags="company.companySpecializations" />
            </div>

            <div v-if="company.industries.length"
                 :class="$style.features">
                <h4>Технологии</h4>

                <UiTagList :tags="company.industries" />
            </div>
        </div>
    </section>
</template>

<script>
    import {plural} from 'assets/js/utils';

    // Components
    import IconArrow from '../../../components/common/icons/IconArrow';
    import UiTagList from '../../../components/ui/UiTagList';
    import InfoAside from '../../../components/pages/info/InfoAside';

    export default {
        name: 'InfoPage',

        components: {InfoAside, UiTagList, IconArrow},

        transitions: {
            name: 'fade',
            appear: true,
        },

        async asyncData({$axios, $api, query, store, redirect}) {
            try {
                const {id} = query;

                const infoRes = await $axios.$get($api.companies.info, {
                    params: {
                        id: id,
                    },
                });

                await store.dispatch('setDarkTheme', true);

                return {
                    company: infoRes.data,
                };
            } catch(e) {
                console.warn('[InfoPage/asyncData]: ', e);
                redirect('/company');
            }
        },

        data() {
            return {
                company: {},
            };
        },

        computed: {
            agePlural() {
                return plural(this.company.age, ['год', 'года', 'лет']);
            },
        },

        beforeRouteLeave(to, from, next) {
            this.$store.dispatch('setDarkTheme', false);
            next();
        },
    }
</script>

<style lang="scss" module>
    .InfoPage {
        position: relative;
        min-height: calc(100vh - 96px);
        padding: 40px 0 78px;
    }

    .backlink {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        font-size: 14px;
        color: $main-blue;
        cursor: pointer;
        user-select: none;
    }

    .arrow {
        position: relative;
        margin-right: 11px;
        transform: rotate(180deg);
    }

    .aside {
        position: absolute;
        top: 140px;
        right: 37px;
        width: 264px;
    }

    .numbers {
        display: flex;
    }

    .numbersItem {
        position: relative;
        font-size: 60px;
        line-height: 1.1;
        font-weight: 300;
        color: $red;

        & + .numbersItem {
            margin-left: 60px;
        }

        sup {
            position: absolute;
            font-size: 16px;
            font-weight: 400;
            color: $black;
            transform: translate3d(5px, 6px, 0);
        }
    }

    .shortDescr {
        max-width: 54%;
        margin-top: 10px;
        font-size: 18px;
        line-height: 25.2px;
        color: $black;
    }

    .fullDescr {
        max-width: 66%;
        margin-top: 24px;
        line-height: 21px;
        color: $black;
    }

    .features {
        max-width: 54%;
        margin-top: 40px;

        h4 {
            font-size: 18px;
            margin-bottom: 24px;
        }
    }
</style>

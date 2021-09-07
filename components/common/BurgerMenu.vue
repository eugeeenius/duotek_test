<template>
    <transition name="appear-right">
        <div v-show="isOpen"
             :class="$style.BurgerMenu">
            <nav :class="$style.nav">
                <ul>
                    <li class="link"
                        :class="$style.link">
                        <a href="#">Вход и регистрация</a>
                    </li>

                    <nuxt-link
                        v-for="item in items"
                        :key="item.name"
                        tag="li"
                        class="link"
                        :class="$style.link"
                        :to="item.link"
                    >
                        {{ item.name }}
                    </nuxt-link>
                </ul>
            </nav>

            <IconClose
                :class="$style.close"
                @click.native="toggle"
            />
        </div>
    </transition>
</template>

<script>
    import {mapState, mapActions} from 'vuex';

    // Components
    import IconClose from './icons/IconClose';

    export default {
        name: 'BurgerMenu',

        components: {IconClose},

        props: {
            items: {
                type: Array,
                default: () => [],
            },
        },

        computed: {
            ...mapState({
                isOpen: state => state.isBurgerOpen,
            }),
        },


        watch: {
            $route() {
                if(!this.isOpen) return;
                this.toggle();
            },
        },

        methods: {
            ...mapActions({
                toggle: 'toggleBurger',
            }),
        },
    };
</script>

<style lang="scss" module>
    .BurgerMenu {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
        overflow: hidden;
        width: 100vw;
        height: 100%;
        background-color: #fff;
    }

    .nav {
        padding: 12px 24px 0;
        font-size: 20px;

        ul {
            display: inline-flex;
            flex-direction: column;
        }
    }

    .link {
        display: inline-block;
        padding: 12px 0;
    }

    .close {
        position: absolute;
        top: 24px;
        right: 24px;
        width: 20px;
        height: 20px;
        color: $main-blue;
    }

    :global {
        .appear-right-enter-active,
        .appear-right-leave-active {
            transition: transform .5s;
        }
        .appear-right-enter,
        .appear-right-leave-to {
            transform: translateX(110%);
        }
    }
</style>

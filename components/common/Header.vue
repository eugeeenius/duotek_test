<template>
    <header :class="[$style.Header, {[$style._inverse]: inverse}]">
        <div class="container"
             :class="$style.content">
            <a href="/">
                <Logo :inverse="inverse"/>
            </a>

            <nav :class="$style.nav">
                <nuxt-link
                    v-for="item in items"
                    :key="item.name"
                    class="link"
                    :class="$style.link"
                    :to="item.link"
                >
                    {{ item.name }}
                </nuxt-link>
            </nav>

            <a href="#"
               class="link"
               :class="$style.login">Вход и регистрация</a>

            <div :class="$style.burger"></div>
        </div>
    </header>
</template>

<script>
    // Components
    import Logo from './Logo'

    export default {
        name: 'Header',

        components: {Logo},

        props: {
            inverse: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            return {
                items: [
                    {
                        name: 'Тендеры',
                        link: '/empty/1',
                    },
                    {
                        name: 'Компании',
                        link: '/company',
                    },
                    {
                        name: 'Продукты',
                        link: '/empty/2',
                    },
                    {
                        name: 'Кейсы',
                        link: '/empty/3',
                    },
                    {
                        name: 'Блог',
                        link: '/empty/4',
                    },
                ],
            }
        },
    }
</script>

<style lang="scss" module>
    .Header {
        height: 96px;
        border-bottom: 1px solid #f2f2f2;
        transition: background-color $header-transition;

        @include mobile {
            height: 54px;
        }

        &._inverse {
            background-color: $main-blue;
            border-bottom: none;

            .login,
            .link {
                color: #fff;

                &:hover {
                    opacity: .7;
                }
            }

            :global(.active-link) {
                opacity: .7;
            }
        }
    }

    .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
    }

    .nav {
        display: flex;

        @include mobile {
            display: none;
        }
    }

    .link {
        padding: 5px 20px;
    }

    .login,
    .link {
        transition: opacity $color-transition, color $header-transition;

        &:hover {
            opacity: .3;
        }
    }

    .login {

        @include mobile {
            display: none;
        }

        &._mob {
            display: none;

            @include mobile {
                display: inline-block;
            }
        }
    }

    .burger {
        position: relative;
        width: 26px;
        height: 2px;
        background-color: $main-blue;

        &:before,
        &:after {
            content: "";
            position: absolute;
            width: 26px;
            height: 2px;
            background-color: $main-blue;
        }

        &:before {
            transform: translate3d(0, -320%, 0);
        }

        &:after {
            transform: translate3d(0, 320%, 0);
        }
    }

    :global(.active-link) {
        opacity: .3;
    }
</style>

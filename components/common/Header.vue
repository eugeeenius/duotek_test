<template>
    <header id="header"
            :class="[$style.Header, {[$style._inverse]: inverse}]">
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

            <div class="link"
                 :class="$style.login">Вход и регистрация
            </div>
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

    :global(.active-link) {
        opacity: .3;
    }
</style>

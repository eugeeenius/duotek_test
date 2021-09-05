<template>
    <footer :class="$style.Footer">
        <div :class="$style.list">
            <div :class="$style.column">
                <span :class="$style.title">Тендеры</span>

                <ul>
                    <li :class="$style.btn">Добавить тендер</li>

                    <li
                        v-for="item in tenders"
                        :class="[$style.item, {[$style._indent]: item.indent}]"
                    >{{ item.name }}</li>
                </ul>
            </div>

            <div :class="$style.column">
                <span :class="$style.title">Компании</span>

                <ul>
                    <li :class="[$style.btn, $style._red]">Добавить компнию</li>

                    <li
                        v-for="item in companies"
                        :class="[$style.item, {[$style._indent]: item.indent}]"
                    >{{ item.name }}</li>
                </ul>
            </div>

            <div :class="$style.column">
                <span :class="$style.title">Продукты</span>

                <ul>
                    <li
                        v-for="item in products"
                        :class="[$style.item, {[$style._indent]: item.indent}]"
                    >{{ item.name }}</li>
                </ul>
            </div>

            <div :class="$style.column">
                <span :class="$style.title">Кейсы</span>

                <ul>
                    <li
                        v-for="item in cases"
                        :class="[$style.item, {[$style._indent]: item.indent}]"
                    >{{ item.name }}</li>
                </ul>
            </div>
        </div>

        <div :class="$style.bottom">
            <div :class="$style.social">
                <a  href="#"
                    :class="$style.icon">
                    <IconFacebook />
                </a>
                <a  href="#"
                    :class="$style.icon">
                    <IconVk />
                </a>
                <a  href="#"
                    :class="$style.icon">
                    <IconYoutube />
                </a>
            </div>

            <div :class="$style.about">
                <span>О проекте</span>

                <span>Пользовательское соглашение</span>
            </div>
        </div>
    </footer>
</template>

<script>
    // Components

    import IconFacebook from './icons/social/IconFacebook';
    import IconVk from './icons/social/IconVk';
    import IconYoutube from './icons/social/IconYoutube';
    export default {
        name: 'Footer',
        components: {IconYoutube, IconVk, IconFacebook},
        data() {
            return {
                tenders: [
                    {
                        name: 'Каталог тендеров',
                    },
                    {
                        name: 'Работа с клиентами',
                        indent: true,
                    },
                    {
                        name: 'Управление проектами',
                    },
                    {
                        name: 'Маркетинг',
                    },
                    {
                        name: 'Финансы',
                    },
                    {
                        name: 'Управление бизнесом',
                    },
                ],
                companies: [
                    {
                        name: 'Рейтинги',
                    },
                    {
                        name: 'Отраслевая специализация',
                    },
                    {
                        name: 'Управление проектами',
                        indent: true,
                    },
                    {
                        name: 'Интеграторы',
                    },
                    {
                        name: 'Решения для бизнеса крепеж',
                    },
                    {
                        name: 'Разработка сайтов',
                    },
                    {
                        name: 'Мобильные приложения',
                    },
                    {
                        name: 'Онлайн-реклама',
                    },
                    {
                        name: 'Контент',
                    },
                ],
                products: [
                    {
                        name: 'Рейтинги',
                    },
                    {
                        name: 'Отраслевая',
                    },
                    {
                        name: 'Работа с клиентами',
                        indent: true,
                    },
                    {
                        name: 'Управление проектами',
                    },
                    {
                        name: 'Маркетинг',
                    },
                    {
                        name: 'Финансы',
                    },
                    {
                        name: 'Управление бизнесом',
                    },
                ],
                cases: [
                    {
                        name: 'Автоматизация сантехников',
                    },
                    {
                        name: 'Автоматизация клининга',
                    },
                    {
                        name: 'Автоматизация СТО',
                    },
                    {
                        name: 'Автоматизация сантехников',
                    },
                    {
                        name: 'Автоматизация клининга',
                    },
                    {
                        name: 'Автоматизация СТО',
                    },
                ],
            };
        },
    };
</script>

<style lang="scss" module>
    .Footer {
        padding: 80px 136px 88px;
        border-top: 1px solid $gray-l;
    }

    .title {
        font-size: 16px;
    }

    .list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr .96fr;
    }

    .btn {
        display: inline-flex;
        padding: 6px 16px;
        margin-top: 16px;
        line-height: 20px;
        border-radius: 4px;
        background-color: $main-blue;
        color: #fff;
        cursor: pointer;

        &._red {
            background-color: $red;
        }
    }

    .item {
        margin-top: 16px;
        font-family: "IBM Plex Sans", sans-serif;
        color: $black;
        transition: opacity $color-transition;
        cursor: pointer;

        &:hover {
            opacity: .7;
        }

        &._indent {
            margin-top: 32px;
        }
    }

    .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 18px;
    }

    .icon + .icon {
        margin-left: 20px;
    }

    .about {
        font-size: 12px;
        color: $gray;

        span + span {
            margin-left: 30px;
        }
    }
</style>

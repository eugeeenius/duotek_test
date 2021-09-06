<template>
    <div :class="$style.InfoAside">
        <div :class="$style.logo"
             :style="{backgroundImage: `url(${info.picture})`}"></div>

        <div :class="$style.contacts">
            <div v-if="info.url"
                 :class="$style.item">
                <span>Сайт:</span>

                <a :href="info.url"
                   target="_blank">{{ info.url }}</a>
            </div>

            <div v-if="info.contact_email"
                 :class="$style.item">
                <span>E-mail:</span>

                <a :href="`mailto:${info.contact_email}`"
                   target="_blank">{{ info.contact_email }}</a>
            </div>

            <div v-if="info.contact_phone"
                 :class="$style.item">
                <span>Телефон:</span>

                <a :href="`tel: ${info.contact_phone}`">{{ info.contact_phone }}</a>
            </div>

            <div v-if="info.contact_telegram"
                 :class="$style.item">
                <span>Telegram:</span>

                <a href="#">{{ info.contact_telegram }}</a>
            </div>

            <div v-if="info.contact_whatsapp"
                 :class="$style.item">
                <span>Whatsapp:</span>

                <a href="#">{{ info.contact_whatsapp }}</a>
            </div>

            <div v-if="info.contact_skype"
                 :class="$style.item">
                <span>Skype:</span>

                <a href="#">{{ info.contact_skype }}</a>
            </div>

            <div v-if="address"
                 :class="$style.item">
                <span>Офис:</span>

                <address>{{ address }}</address>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'InfoAside',

        props: {
            info: {
                type: Object,
                default: () => ({}),
            },
        },

        computed: {
            address() {
                const country = this.info.country?.title ? this.info.country.title + ', ' : '';
                const city = this.info.city?.title ?? '';
                return country + city;
            },
        },
    };
</script>

<style lang="scss" module>
    .InfoAside {
        font-size: 14px;
        line-height: 21px;
    }

    .logo {
        height: 120px;
        background: left center / contain no-repeat;
    }

    .contacts {
        margin-top: 16px;
    }

    .item {

        &:not(:first-child) {
            margin-top: 20px;
        }

        a {
            color: $main-blue;
        }

        span {
            display: block;
            color: $gray;
        }

        address {
            font-style: normal;
        }
    }
</style>

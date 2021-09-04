<template>
    <div :class="$style.CompanyCard"
         @mouseenter="isHovered = true"
         @mouseleave="isHovered = false">

        <img :class="$style.logo"
             :src="data.picture"
             :alt="data.ident">

        <h4 :class="$style.title">{{ data.title }}</h4>

        <div :class="$style.description">
            <p>{{ data.description_short }}</p>
        </div>

        <UiTagList
            :tags="data.industries"
            :inverse="isHovered"
        />

        <IconArrow :class="$style.arrow" />
    </div>
</template>

<script>
    // Components
    import UiTagList from '../../ui/UiTagList';
    import IconArrow from '../../common/icons/IconArrow';

    export default {
        name: 'CompanyCard',

        components: {IconArrow, UiTagList},

        props: {
            data: {
                type: Object,
                default: () => ({}),
            },
        },

        data() {
            return {
                isHovered: false,
            };
        },
    };
</script>

<style lang="scss" module>
    .CompanyCard {
        position: relative;
        width: 100%;
        padding: 45px 75px 35px 193px;
        border-radius: 8px;
        background-color: #fff;
        transition: background-color $color-transition-slow;
        cursor: pointer;

        &:hover {
            background-color: rgba(3, 9, 83, .03);

            .title,
            .arrow {
                color: $red;
            }

        }
    }

    .logo {
        position: absolute;
        top: 32px;
        left: 30px;
        max-width: 140px;
    }

    .title {
        font-size: 24px;
        color: $link;
        transition: color $color-transition-slow;
    }

    .description {
        padding: 16px 0;
        line-height: 21px;
        color: $black;

        p {
            min-height: 40px;
        }
    }

    .arrow {
        position: absolute;
        right: 15px;
        bottom: 18px;
        color: transparent;
        transition: color $color-transition-slow;
    }
</style>

<template>
    <li :class="[$style.UiTag, {[$style._inverse]: inverse}]">
        <span v-html="title"></span>
    </li>
</template>

<script>
    // Components

    export default {
        name: 'UiTag',

        props: {
            title: {
                type: String,
                default: '',
            },
            inverse: {
                type: Boolean,
                default: false,
            },
        },
    };
</script>

<style lang="scss" module>
    .UiTag {

        &._inverse {
            background-color: #fff;
        }

        span {
            display: inline-block;
            padding: 5px 22px;
            border-radius: 200px;
            background-color: $gray-bg;
            font-size: 14px;
            line-height: 20px;
            color: $black;
            transition: background-color $color-transition-slow;
        }
    }
</style>

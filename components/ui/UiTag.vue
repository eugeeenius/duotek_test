<template>
    <li :class="[$style.UiTag, {[$style._inverse]: inverse}]"
         v-html="title"
    ></li>
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
        padding: 5px 22px;
        line-height: 20px;
        border-radius: 200px;
        background-color: $gray-bg;
        color: $black;
        transition: background-color $color-transition-slow;

        &._inverse {
            background-color: #fff;
        }
    }
</style>

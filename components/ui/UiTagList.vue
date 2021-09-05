<template>
    <ul :class="$style.UiTagList">
        <UiTag
            v-for="(tag, index) in tags"
            :key="tag.title + index"
            :class="$style.tag"
            :title="tag.title"
            :inverse="inverse"
        />
    </ul>
</template>

<script>
    // Components
    import UiTag from './UiTag';

    export default {
        name: 'UiTagList',

        components: {UiTag},

        props: {
            tags: {
                type: Array,
                default: () => [],
            },
            inverse: {
                type: Boolean,
                default: false,
            },
        },
    };
</script>

<style lang="scss" module>
    .UiTagList {
        display: flex;
    }

    .tag {

        &:not(:first-child) {
            margin-left: 4px;
        }
    }
</style>

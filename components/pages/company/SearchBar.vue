<template>
    <div :class="$style.SearchBar">
        <div :class="$style.input">
            <IconSearch/>

            <input
                v-model="text"
                ref="input"
                type="text"
                :placeholder="placeholder"
                @keydown.enter="onSearchClick"
                @focus="isInputFocused = true"
                @blur="isInputFocused = false"
            >
        </div>

        <div :class="$style.btn"
             @click="onSearchClick">
            Найти
        </div>
    </div>
</template>

<script>
    // Components
    import IconSearch from '../../common/icons/IconSearch';

    export default {
        name: 'SearchBar',

        components: {IconSearch},

        data() {
            return {
                text: '',
                isInputFocused: false,
            };
        },

        computed: {
            placeholder() {
                return this.text || this.isInputFocused ? '' : 'Поиск продукта или отрасли';
            },
        },

        methods: {
            onSearchClick() {
                if (this.$refs.input) return;
                this.$refs.input.blur();
                this.$emit('on-search', this.text.trim());
            },
        },
    };
</script>

<style lang="scss" module>
    .SearchBar {
        display: flex;
        height: 40px;
    }

    .input {
        display: flex;
        align-items: center;
        width: 665px;
        height: 100%;
        padding-left: 12px;
        border: 1px solid $gray-l;
        border-radius: 4px 0 0 4px;
        background-color: #fff;

        input {
            width: 100%;
            margin-left: 8px;
            border: none;
            font-family: "Raleway", sans-serif;
            font-size: 16px;
            line-height: 1.33;
            outline: none;

            &::placeholder {
                color: $gray;
            }
        }
    }

    .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 79px;
        border-radius: 0 4px 4px 0;
        background-color: $main-blue;
        color: #fff;
        cursor: pointer;
    }
</style>

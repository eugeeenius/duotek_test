<template>
    <div :class="$style.SearchBar">
        <div :class="$style.wrap">
            <div :class="[$style.input, {[$style._invalid]: !isInputValid}]">
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

            <div v-if="!isInputValid"
                :class="$style.error">Название компании должно быть более 2 символов</div>
        </div>


        <div :class="$style.btn"
             @click.stop="onSearchClick">
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

        props: {
            value: {
                type: String,
                default: '',
            },
        },

        data() {
            return {
                text: this.value,
                isInputFocused: false,
            };
        },

        computed: {
            placeholder() {
                return this.text || this.isInputFocused ? '' : 'Поиск продукта или отрасли';
            },

            isInputValid() {
                return this.text.length > 2 || this.text.length === 0;
            }
        },

        methods: {
            onSearchClick() {
                if (!this.$refs.input) return;
                this.$refs.input.blur();

                const text = this.text.trim().toLowerCase()

                if (!this.isInputValid) return;
                this.$emit('on-search', text);
            },
        },
    };
</script>

<style lang="scss" module>
    .SearchBar {
        display: flex;
        height: 40px;

        @include mobile {
            width: 100%;
        }
    }

    .wrap {

        @include mobile {
            width: 100%;
        }
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

        @include mobile {
            width: 100%;
        }

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

        &._invalid {
            border: 1px solid $red;
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
        user-select: none;
    }

    .error {
        margin-top: 10px;
        color: $red;
    }
</style>

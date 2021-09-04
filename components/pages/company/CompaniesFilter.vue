<template>
    <div :class="$style.CompaniesFilter">
        <div :class="$style.cell">
            <div :class="$style.name">Отрасль</div>

            <Multiselect
                :value="values.industry"
                :searchable="false"
                :options="specs.industry"
                trackBy="id"
                label="title"
                :allow-empty="false"
                :show-labels="false"
                @select="$emit('change', {industry: $event})"
            />
        </div>

        <div :class="$style.cell">
            <div :class="$style.name">Специализация</div>

            <Multiselect
                :value="values.specialization"
                :searchable="false"
                :options="specs.specialization"
                trackBy="id"
                label="title"
                :allow-empty="false"
                :show-labels="false"
                @select="$emit('change', {specialization: $event})"
            />
        </div>
    </div>
</template>

<script>
    // Components
    import Multiselect from 'vue-multiselect';

    export default {
        name: 'CompaniesFilter',

        components: {
            Multiselect,
        },

        props: {
            specs: {
                type: Object,
                default: () => ({}),
            },
            values: {
                type: Object,
                default: () => ({}),
            },
        },
    };
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" module>
    .CompaniesFilter {
        width: 264px;
        padding: 18px 20px;
        border-radius: 4px;
        background-color: $gray-bg;
    }

    .cell {
        width: 100%;

        &:last-child {
            margin-top: 24px;
        }
    }

    .name {
        margin-bottom: 16px;
    }

    :global(.multiselect) {
        * {
            font-size: 14px;
            line-height: 21px;
        }

        &__tags {
            height: 40px;
            padding: 10px 16px;
            border: 1px solid $gray-l;
            border-radius: 4px;
            cursor: pointer;
        }

        &__select{
            z-index: 1;

            &:before {
                content: url("static/images/select-spinner.svg");
                position: absolute;
                top: 50%;
                right: 50%;
                width: 24px;
                height: 24px;
                margin: 0;
                border: none;
                transform: translate3d(50%, -50%, 0);
            }
        }

        &__single {
            padding: 0;
            margin: 0;
        }

        &__option {
            $option: &;

            min-height: unset;
            padding: 10px 16px;
            font-size: 12px;

            &--highlight {
                background-color: #fff;
                color: $link;
                transition: color $text-transition;
            }

            &--selected {
                background-color: $gray-bg;
                transition: background-color $color-transition;

                &#{$option}--highlight {
                    background-color: $gray-bg;
                    color: $black;
                }
            }
        }
    }
</style>


<template>

    <span>
        <select v-on:change="changed" v-bind:id="id" class="field-style moneyselect">
            <option v-bind:value="key" v-for="(name, key) in numbers">{{ name }} ({{ key }} nuller)</option>
        </select>
    </span>

</template>
<script>
    import Numbers from './numbersizes.json'

    export default {
        props: ['id'],
        data () {
            return {
                numbers: Numbers
            }
        },
        methods: {
            changed () {
                this.$emit('moneytype-changed')
            }
        }
    }
</script>

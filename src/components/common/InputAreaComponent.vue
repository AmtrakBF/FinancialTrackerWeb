<script lang="ts">
import { defineComponent, type PropType} from 'vue';

export default defineComponent({

    props: {
        inputType: { type: String, default: 'text' },
        errors: {type: Array as PropType<string[]>},

        placeHolder: String,
        defaultValue: String,

        color: { type: String, default: 'var(--black75)' },
        borderColor: { type: String, default: 'var(--primary)' },
        backgroundColor: { type: String, default: 'rgb(255, 255, 255, .9)' },
        focusBorderColor: { type: String, default: 'var(--secondary)' },
        disabledBackgroundColor: { type: String, default: 'var(--black5)' },
        alignText: { type: String, default: "left"},

        isDisabled: { type: Boolean, default: false }
    },
    mounted() {
        if (this.defaultValue != undefined) {
            this.data = this.defaultValue
        }
    },
    data() {
        return {
            data: '',
        }
    },
})
</script>

<template>
    <div id="input-area" :style="{
    '--text-color' : color,
    '--background-color' : backgroundColor,
    '--disabled-bg-color' : disabledBackgroundColor,
    '--focus-border-color' : focusBorderColor,
    '--border-color' : borderColor,
    '--alignment' : alignText}">
        <div class="container">
            <textarea :type="inputType" :placeholder="placeHolder" v-model="data" @input="$emit('onUpdate', data)" :disabled="isDisabled"/>
        </div>

        <span v-if="errors != undefined && errors.length > 0">{{ errors }}</span>
    </div>
</template>

<style scoped>
#input-area {
    --text-color: black;
    --background-color: white;
    --disabled-bg-color: grey;
    --focus-border-color: black;
    --border-color: black;
    --alignment: left;
}

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.container textarea {
    flex: 2;
    width: 100%;
    padding: 8px;

    color: var(--text-color);
    background-color: var(--background-color);

    border-radius: 10px;
    border: 1px solid var(--border-color);

    text-align: var(--alignment);
}

.containertextarea:focus {
    outline-color: var(--focus-border-color);
}

.container textarea:disabled {
    background-color: var(--disabled-bg-color);
}

.container textarea {
    resize: none;
    min-height: 96px;
}

</style>
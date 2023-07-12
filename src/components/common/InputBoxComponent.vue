<script lang="ts">
import { defineComponent} from 'vue';

export default defineComponent({

    props: {
        inputType: { type: String, default: 'text' },
        defaultValue: String,
        placeHolder: String,
        autoComplete: { type: String, default: 'on' },

        color: { type: String, default: 'var(--black75)' },
        borderColor: { type: String, default: 'var(--primary)' },
        backgroundColor: { type: String, default: 'rgb(255, 255, 255, .9)' },
        focusBorderColor: { type: String, default: 'var(--secondary)' },
        disabledBackgroundColor: { type: String, default: 'var(--black5)' },

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
    <div id="input-box" :style="{
    '--text-color' : color,
    '--background-color' : backgroundColor,
    '--disabled-bg-color' : disabledBackgroundColor,
    '--focus-border-color' : focusBorderColor,
    '--border-color' : borderColor}">
        <input :type="inputType" :placeholder="placeHolder" v-model="data" @input="$emit('onUpdate', data)" :autocomplete="autoComplete" :disabled="isDisabled">
    </div>
</template>

<style scoped>
#input-box  {
    --text-color: black;
    --background-color: white;
    --disabled-bg-color: grey;
    --focus-border-color: black;
    --border-color: black;


    display: flex;
    justify-content: center;
    align-items: center;
}

#input-box input {
    flex: 2;
    width: 100%;
    padding: 8px;

    color: var(--text-color);
    background-color: var(--background-color);

    border-radius: 10px;
    border: 1px solid var(--border-color);
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;

    transition: .5s linear;
}

#input-box  input:focus {
    outline-width: 0px;
    
    border-width: 1px;
    border-color: var(--focus-border-color);
}

#input-box  input:disabled {
    background-color: var(--disabled-bg-color);
}
</style>
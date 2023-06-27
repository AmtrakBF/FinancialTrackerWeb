<script lang="ts">
import { defineComponent} from 'vue';

export default defineComponent({

    props: {
        color: { type: String, default: 'var(--black75)' },
        borderColor: { type: String, default: 'var(--primary)' },
        backgroundColor: { type: String, default: 'rgb(255, 255, 255, .9)' },
        focusBorderColor: { type: String, default: 'var(--secondary)' },
        disabledBackgroundColor: { type: String, default: 'var(--black5)' },

        isDisabled: { type: Boolean, default: false }
    },
    data() {
        return {
            data: '',
        }
    },
})
</script>

<template>
    <div id="parent">
        <div id="input-area" :style="{
        '--text-color' : color,
        '--background-color' : backgroundColor,
        '--disabled-bg-color' : disabledBackgroundColor,
        '--focus-border-color' : focusBorderColor,
        '--border-color' : borderColor}">
            <textarea v-model="data" :disabled="isDisabled"/>
        </div>
    </div>
</template>

<style scoped>

#input-area {
    --text-color: black;
    --background-color: white;
    --disabled-bg-color: grey;
    --focus-border-color: black;
    --border-color: black;


    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
}

#input-area textarea {
    flex: 2;
    width: 100%;
    padding: 8px;

    color: var(--text-color);
    background-color: var(--background-color);

    border-radius: 10px;
    border: 1px solid var(--border-color);
}

#input-area textarea:focus {
    outline-color: var(--focus-border-color);
}

#input-area textarea:disabled {
    background-color: var(--disabled-bg-color);
}

#input-area textarea {
    resize: none;
    height: 96px;
}

</style>
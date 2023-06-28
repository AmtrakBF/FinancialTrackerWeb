<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

    props: {
        title: {type: String, required: true},

        color: { type: String, default: 'var(--black100)' },
        borderColor: { type: String, default: 'var(--primary)' },
        backgroundColor: { type: String, default: 'rgb(255, 255, 255, .9)' },
        hoverBackgroundColor: { type: String, default: 'var(--black25)' },
        focusBorderColor: { type: String, default: 'var(--secondary)' },
        disabledBackgroundColor: { type: String, default: 'var(--black5)' },

        isDisabled: { type: Boolean, default: false }
    },
    methods: {
        OnClick() {
            this.$emit('onClick')
        },
    }
})
</script>

<template>
    <div class="submit-buttons">
        <div id="button" @click="OnClick" :disabled="isDisabled" :style="{
        '--text-color' : color,
        '--background-color' : backgroundColor,
        '--hover-background-color': hoverBackgroundColor,
        '--disabled-bg-color' : disabledBackgroundColor,
        '--focus-border-color' : focusBorderColor,
        '--border-color' : borderColor}">
            <h6>{{ title }}</h6>
        </div>
    </div>
</template>

<style scoped>
.submit-buttons {
    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: row;
    padding: 20px;

    width: 100%;
}

#button {
    --text-color: black;
    --background-color: white;
    --hover-background-color: grey;
    --disabled-bg-color: grey;
    --focus-border-color: black;
    --border-color: black;

    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    color: var(--text-color);
    background-color: var(--background-color);

    border: 1px solid var(--border-color);
    border-radius: 10px;

    margin: 0px 64px;
}

#button:hover {
    cursor: pointer;
    background-color: var(--hover-background-color);
}

#button:disabled {
    background-color: var(--disabled-bg-color);
}

.button-parent {
    padding: 40em;
}

h6 {
    padding: 8px 16px;
}
</style>
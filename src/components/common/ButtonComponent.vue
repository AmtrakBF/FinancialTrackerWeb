<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export default defineComponent({

    props: {
        title: {type: String, required: true},

        color: { type: String, default: 'var(--black100)' },
        borderColor: { type: String, default: 'var(--primary)' },
        backgroundColor: { type: String, default: 'rgb(255, 255, 255, .9)' },
        hoverBackgroundColor: { type: String, default: 'var(--black25)' },
        focusBorderColor: { type: String, default: 'var(--secondary)' },
        disabledBackgroundColor: { type: String, default: 'var(--black25)' },

        isDisabled: { type: Boolean, default: false }
    },
    data() {
        return {
            selectedBackgroundColor: '',
            selectedId: 'button'
        }
    },
    mounted() {
        if (this.isDisabled) {
            this.selectedBackgroundColor = this.disabledBackgroundColor
            this.selectedId = 'button-disabled'
        } else {
            this.selectedBackgroundColor = this.backgroundColor
            this.selectedId = 'button'
        }
    },
    methods: {
        OnClick() {
            if (!this.isDisabled) {
                this.$emit('onClick')
            }
        },
    }
})
</script>

<template>
    <div class="submit-buttons">
        <div :id="selectedId" @click="OnClick" :style="{
        '--text-color' : color,
        '--background-color' : selectedBackgroundColor,
        '--hover-background-color': hoverBackgroundColor,
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

    user-select: none;
}

#button, #button-disabled {
    --text-color: black;
    --background-color: white;
    --hover-background-color: grey;
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
}

#button:hover {
    cursor: pointer;
    background-color: var(--hover-background-color);
}

.button-parent {
    padding: 40em;
}

h6 {
    padding: 8px 16px;
}
</style>
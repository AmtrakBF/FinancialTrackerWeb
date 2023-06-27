<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export default defineComponent({

    props: {
        dropdownItems: {type: [] as PropType<string[]>, required: true},

        color: { type: String, default: 'var(--black75)' },
        borderColor: { type: String, default: 'var(--primary)' },
        backgroundColor: { type: String, default: 'rgb(255, 255, 255, .9)' },
        hoverBackgroundColor: { type: String, default: 'var(--black25)' },
        focusBorderColor: { type: String, default: 'var(--secondary)' },
        disabledBackgroundColor: { type: String, default: 'var(--black5)' },

        isDisabled: { type: Boolean, default: false }
    },
    data() {
        return {
            isDropDownActive: false,
            selectedItem: ''
        }
    },
    created() {
    },
    methods: {
        CloseDropDownMenu() {
            this.isDropDownActive = false
        }
    }
})
</script>

<template>
    <div class="dropdown-container" @click="isDropDownActive = !isDropDownActive" :class="{'dropdown-container-active': isDropDownActive}" v-click-outside="CloseDropDownMenu"
    :style="{'--text-color' : color,
    '--background-color' : backgroundColor,
    '--hover-background-color': hoverBackgroundColor,
    '--disabled-bg-color' : disabledBackgroundColor,
    '--focus-border-color' : focusBorderColor,
    '--border-color' : borderColor}" :disabled="isDisabled">
        <p>{{selectedItem}}</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" width="19" height="19">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
        <div class="dropdown" :class="{'dropdown-active': isDropDownActive}">
            <div class="dropdown-item" v-for="item in dropdownItems" @click="selectedItem = item">
                <p>{{item}}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.dropdown-container {
    --text-color: black;
    --background-color: white;
    --hover-background-color: grey;
    --disabled-bg-color: grey;
    --focus-border-color: black;
    --border-color: black;


    position: relative;
    flex: 2;

    width: 100%;
    height: 40px;

    padding: 8px;
    font-size: 16px;
    
    color: var(--text-color);
    background-color: var(--background-color);

    border: 1px solid var(--border-color);
    border-radius: 10px;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.dropdown-container:hover {
    cursor: pointer;
}

.dropdown {
    position: absolute;
    display: none;
    user-select: none;

    background-color: white;

    width: 100%;
    top: 2.4em;
    left: 0;
    
    border-radius: 0px 0px 10px 10px;
    outline: 1px solid var(--border-color);
}

.dropdown-item {
    padding: 8px;
    border-radius: 10px;
    background-color: var(--background-color);
}

.dropdown-item:hover {
    background-color: var(--hover-background-color);
}

.dropdown-active {
    display: block
}

.dropdown-container-active {
    border-radius: 10px 10px 0px 0px;
}
</style>
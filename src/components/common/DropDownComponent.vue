<script lang="ts">
import { defineComponent, type Prop, type PropType } from 'vue';

export default defineComponent({

    props: {
        values: {type: [] as PropType<any>, required: true},
        key: {type: String, required: false},
        previewKey: {type: String, required: true},
        defaultValue: {type: {} as PropType<any>},

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
            keyFound: false,
            selectedItem: {} as any,
            selectedItemPreview: ''
        }
    },
    mounted() {
        this.InitSelectedItem()
    },
    methods: {
        InitSelectedItem() {
            if (this.defaultValue == undefined) return

            this.selectedItem = this.defaultValue
            this.selectedItemPreview = this.selectedItem[this.previewKey]
        },
        SetSelectedItem(item:any) {
            this.selectedItem = item
            this.selectedItemPreview = item[this.previewKey]
            this.$emit('onClick', item)
        },
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
        <p>{{selectedItemPreview}}</p>
        <div style="padding: 0px 8px;">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" width="16" height="16">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
            </svg>
        </div>
        <div class="dropdown" :class="{'dropdown-active': isDropDownActive}">
            <div class="dropdown-item" v-for="item in values" :key="key" @click="SetSelectedItem(item)">
                <p>{{item[previewKey]}}</p>
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

    min-height: 39px;
    max-height: 39px;

    font-size: 16px;
    
    color: var(--text-color);
    background-color: var(--background-color);

    border: 1px solid var(--border-color);
    border-radius: 10px;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.dropdown-container p {
    padding: 8px;
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
<script lang="ts">
import { defineComponent } from 'vue';
import ButtonComponent from './common/ButtonComponent.vue';
import DropDownComponent from './common/DropDownComponent.vue';
import InputAreaComponent from './common/InputAreaComponent.vue';
import InputBoxComponent from './common/InputBoxComponent.vue';
import InputBoxComp from './InputRowComponent.vue';


export default defineComponent({
    
    data() {
        return {
            showOtherButton: false
        }
    },
    components: {
        ButtonComponent,
        DropDownComponent,
        InputAreaComponent,
        InputBoxComponent,
        InputBoxComp
    }
})

</script>

<template>
    <InputBoxComp class="input-box-comp">
        <InputBoxComponent class="input-comp" place-holder="First Name"/>
        <InputBoxComponent class="input-comp" place-holder="Last Name"/>
    </InputBoxComp>
</template>

<style scoped>

.input-comp {
    flex: 1;
    padding-left: 16px;
}

.input-box-comp {
    width: 80%;
    margin: auto;
}

</style>
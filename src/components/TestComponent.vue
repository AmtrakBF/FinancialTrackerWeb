<script lang="ts">
import { defineComponent } from 'vue';
import ButtonComponent from './common/ButtonComponent.vue';
import DropDownComponent from './common/DropDownComponent.vue';
import InputAreaComponent from './common/InputAreaComponent.vue';
import InputBoxComponent from './common/InputBoxComponent.vue';


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
        InputBoxComponent
    }
})

</script>

<template>
        <ButtonComponent title="Test Button1" @OnClick="() => showOtherButton = true"/>
        <ButtonComponent title="Test Button2" color="brown" @OnClick="() => showOtherButton = true"/>
        <ButtonComponent title="Test Button3" focus-border-color="pink" @OnClick="() => showOtherButton = true"/>
        <ButtonComponent title="Test Button4" @OnClick="() => showOtherButton = true"/>
        <ButtonComponent v-if="showOtherButton" title="Other Button" @OnClick="() => showOtherButton = true"/>

        <div style="width: 20%; display: flex; justify-content: space-around;">
            <h4 style="flex: 1;">Type: </h4>
            <DropDownComponent style="flex: 2;" :dropdownItems="['Deposit', 'Withdraw', 'Transfer']"/>
        </div>
        <InputAreaComponent/>
        <InputBoxComponent focus-border-color="yellow"/>
        <InputBoxComponent focus-border-color="orange"/>
        <InputBoxComponent focus-border-color="green"/>
</template>
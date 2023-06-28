<script lang="ts">
import SavingsAccountService from '@/services/SavingsAccountService';
import { defineComponent } from 'vue';
import DropDownComponent from './common/DropDownComponent.vue';
import InputBoxComponent from './common/InputBoxComponent.vue';
import InputAreaComponent from './common/InputAreaComponent.vue';
import ButtonComponent from './common/ButtonComponent.vue';

export default defineComponent({

    components: {
        DropDownComponent,
        InputAreaComponent,
        InputBoxComponent,
        ButtonComponent
    },
    data() {
        return {
            name: '',
            balance: '0.00',
        }
    },
    methods: {
        submitForm() {
            SavingsAccountService.PostAccount(this.name, this.balance)
            .then( () => this.$emit('isDisplayed', false))
            .catch(error => console.log(error))
        },
    }
})
</script>

<template>
    <body>
        <div class="wrapper">
            <div class="container">
                <div class="header">
                    <h2>New Account</h2>
                    <img @click="$emit('isDisplayed', false)" src="./imgs/x-icon.png" height="32" width="32">
                </div>
                <div class="content">
                    <div class="input-box">
                        <h5>Name: </h5>
                        <InputBoxComponent class="input-comp" @onUpdate="newValue => name = newValue"/>
                    </div>
                    <div class="input-box">
                        <h5>Initial Balance:</h5>
                        <InputBoxComponent class="input-comp" :default-value="balance" @onUpdate="newValue => balance = newValue"/>
                    </div>
                </div>
                <div class="submit-buttons">
                    <ButtonComponent title="Cancel" background-color="var(--error50)" hover-background-color="var(--error)" @onClick="$emit('isDisplayed', false)"/>
                    <ButtonComponent title="Add" background-color="var(--primary25)" hover-background-color="var(--primary)" @onClick="submitForm"/>
                </div>
            </div>
        </div>
    </body>
</template>

<style scoped>
body {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background-color: var(--black25);
    height: 100%;
    width: 100%;

    z-index: 1;
}

.wrapper {
    width: 516px;
    background-color: white;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border-radius: 10px;
}
.container {
    background-image: linear-gradient(to right, var(--primary25), var(--secondary25));
    border: 1px solid var(--black100);

    color: var(--black100);
    border-radius: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.header {
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
}

.header img:hover {
    cursor: pointer;
}

.content {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
}

.input-box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
}

.input-box h5 {
    flex: 1;
    padding: 0px 16px;
    text-align: center;
}

.input-comp{
    flex: 2;
    width: 100%;
}

.submit-buttons {
    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: row;
    padding: 20px;
}
</style>
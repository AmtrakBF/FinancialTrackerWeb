<script lang="ts">
import type { SavingsAccount } from '@/models/SavingsAccount';
import SavingsAccountService from '@/services/SavingsAccountService';
import { defineComponent, type PropType } from 'vue';
import DropDownComponent from './common/DropDownComponent.vue';
import InputBoxComponent from './common/InputBoxComponent.vue';
import InputAreaComponent from './common/InputAreaComponent.vue';
import ButtonComponent from './common/ButtonComponent.vue';

export default defineComponent({

    props: {
        account: {type: Object as PropType<SavingsAccount>, required: true},
        accounts: {type: [] as PropType<SavingsAccount[]>, required: true}
    },
    components: {
        DropDownComponent,
        InputAreaComponent,
        InputBoxComponent,
        ButtonComponent
    },
    data() {
        return {
            amount: '',
            description: '',
            email: '',
            password: '',
            selectedAccount: {} as SavingsAccount,
            
            isDropDownActive: false,
            isLoginMenuDisplayed: false,
            isTransferMenuActive: true
        }
    },
    created() {
    },
    methods: {
        SubmitForm() {
            SavingsAccountService.PostTransfer(this.account.id, this.selectedAccount.id, this.amount, this.description, this.email, this.password)
            .then(() => this.$emit('isDisplayed', false))
            .catch(error => console.log(error))
        },

        ToggleLoginMenu() {
            this.isLoginMenuDisplayed = !this.isLoginMenuDisplayed,
            this.isTransferMenuActive = !this.isTransferMenuActive
        },

        CloseDropDownMenu() {
            this.isDropDownActive = false
        }
    }
})
</script>

<template>
    <body>
        <div class="wrapper" v-if="isTransferMenuActive">
            <div class="container">
                <div class="header">
                    <h2>Add Transfer</h2>
                    <img @click="$emit('isDisplayed', false)" src="./imgs/x-icon.png" height="32" width="32">
                </div>
                <div class="content">
                    <div class="input-box">
                        <h5>Account: </h5>
                        <InputBoxComponent class="input-comp" :default-value="account.name" :is-disabled="true"/>
                    </div>
                    
                    <div class="input-box">
                        <h5>To Account:</h5>
                        <DropDownComponent :values="accounts" key="id" preview-key="name" @onClick="value => selectedAccount = value"/>
                    </div>
                    
                    <div class="input-box">
                        <h5>Amount:</h5>
                        <InputBoxComponent class="input-comp" @onUpdate="newValue => amount = newValue"/>
                    </div>
                        
                    <div class="input-box">
                        <h5>Description:</h5>
                        <InputAreaComponent class="input-comp" @onUpdate="newValue => description = newValue"/>
                    </div>

                    <div class="submit-buttons">
                        <ButtonComponent title="Cancel" background-color="var(--error50)" hover-background-color="var(--error)" @onClick="$emit('isDisplayed', false)"/>
                        <ButtonComponent title="Add" background-color="var(--primary25)" hover-background-color="var(--primary)" @onClick="ToggleLoginMenu"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="wrapper" v-if="isLoginMenuDisplayed">
            <div class="container">
                <div class="header">
                    <h2>Confirm Login</h2>
                    <img @click="$emit('isDisplayed', false)" src="./imgs/x-icon.png" height="32" width="32">
                </div>
                <div class="content">
                    <div class="input-box">
                        <h5>Email: </h5>
                        <InputBoxComponent class="input-comp" @onUpdate="newValue => email = newValue"/>
                    </div>
                    
                    <div class="input-box">
                        <h5>Password:</h5>
                        <InputBoxComponent class="input-comp" input-type="password" @onUpdate="newValue => password = newValue"/>
                    </div>
                </div>
                <div class="submit-buttons">
                    <ButtonComponent title="Back" background-color="var(--error50)" hover-background-color="var(--error)" @onClick="ToggleLoginMenu"/>
                    <ButtonComponent title="Add" background-color="var(--primary25)" hover-background-color="var(--primary)" @onClick="SubmitForm"/>
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

.input-comp {
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
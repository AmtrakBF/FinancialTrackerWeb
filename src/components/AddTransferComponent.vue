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
        accounts: {type: Object as PropType<SavingsAccount[]>, required: true}
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
            selectedAccount: {} as SavingsAccount,
            
            isDropDownActive: false,
        }
    },
    created() {
    },
    methods: {
        SubmitForm() {
            SavingsAccountService.PostTransfer(this.account.id, this.selectedAccount.id, this.amount, this.description)
            .then(() => this.$emit('isDisplayed', false))
            .catch(error => console.log(error))
        },

        CloseDropDownMenu() {
            this.isDropDownActive = false
        }
    }
})
</script>

<template>
    <body class="body-global">
        <div class="wrapper-global">
            <div class="container-global">
                <div class="header-global">
                    <h2>Add Transfer</h2>
                    <img @click="$emit('isDisplayed', false)" src="./imgs/x-icon.png" height="32" width="32">
                </div>
                <div class="content-global">
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
                        <ButtonComponent title="Add" background-color="var(--primary25)" hover-background-color="var(--primary)" @onClick="SubmitForm"/>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>

<style scoped>
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
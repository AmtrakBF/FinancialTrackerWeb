<script lang="ts">
import type { SavingsAccount } from '@/models/SavingsAccount';
import SavingsAccountService from '@/services/SavingsAccountService';
import { defineComponent, type PropType } from 'vue';
import DropDownComponent from './common/DropDownComponent.vue';
import InputBoxComponent from './common/InputBoxComponent.vue';
import InputAreaComponent from './common/InputAreaComponent.vue';
import ButtonComponent from './common/ButtonComponent.vue';
import type { ATBFError } from '@/models/ATBFError';
import ErrorHandlingService from '@/services/ErrorHandlingService';

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

            accountError: {name: 'AccountId', errors: []} as ATBFError,
            receiverAccountError: {name: 'ReceiverAccountId', errors: []} as ATBFError,
            amountError: {name: 'TransferAmount', errors: []} as ATBFError,
            descriptionError: {name: 'Description', errors: []} as ATBFError,

            domErrors: [] as ATBFError[],
            
            isDropDownActive: false,
        }
    },
    mounted() {
        this.domErrors = [ this.amountError, this.descriptionError, this.accountError, this.receiverAccountError ]
    },
    methods: {
        async SubmitForm() {
            try {
                let response = await SavingsAccountService.PostTransfer(this.account.id, this.selectedAccount.id, this.amount, this.description)
                this.$emit('onSubmit', response.data)
            } catch (error) {
                ErrorHandlingService.GetErrors(this.domErrors, error)
            }
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
                    <img @click="$emit('isDisplayed')" src="./imgs/x-icon.png" height="32" width="32">
                </div>
                <div class="content-global">
                    <div class="input-container">
                        <div class="input-row">
                            <h5>Account: </h5>
                            <InputBoxComponent class="input-comp" :default-value="account.name" :is-disabled="true"/>
                        </div>
                        <div class="input-row">
                            <p></p>
                            <span v-if="accountError.errors.length > 0">*{{ accountError.errors[0] }}</span>
                        </div>
                    </div> 

                    <div class="input-container">
                        <div class="input-row">
                            <h5>To Account:</h5>
                            <DropDownComponent :values="accounts" id-key="id" preview-key="name" @onClick="value => selectedAccount = value"/>
                        </div>
                        <div class="input-row">
                            <p></p>
                            <span v-if="receiverAccountError.errors.length > 0">*{{ receiverAccountError.errors[0] }}</span>
                        </div>
                    </div> 

                    <div class="input-container">
                        <div class="input-row">
                            <h5>Amount:</h5>
                            <InputBoxComponent class="input-comp" @onUpdate="newValue => amount = newValue"/>
                        </div>
                        <div class="input-row">
                            <p></p>
                            <span v-if="amountError.errors.length > 0">*{{ amountError.errors[0] }}</span>
                        </div>
                    </div> 

                    <div class="input-container">
                        <div class="input-row">
                            <h5>Description:</h5>
                            <InputAreaComponent class="input-comp" @onUpdate="newValue => description = newValue"/>
                        </div>
                        <div class="input-row">
                            <p></p>
                            <span v-if="descriptionError.errors.length > 0">*{{ descriptionError.errors[0] }}</span>
                        </div>
                    </div> 

                    <div class="submit-buttons">
                        <ButtonComponent title="Cancel" background-color="var(--error50)" hover-background-color="var(--error)" @onClick="$emit('isDisplayed')"/>
                        <ButtonComponent title="Add" background-color="var(--primary25)" hover-background-color="var(--primary)" @onClick="SubmitForm"/>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>

<style scoped>
.input-container {
    padding: 16px;
}

.input-row {
    display: grid;
    justify-content: center;
    align-items: center;

    grid-template-columns: 180px 1fr;
}

.input-row h5 {
    padding: 0px 16px;
    text-align: center;
}

.input-row span {
    color: var(--error);
    font-weight: 500;
}

.submit-buttons {
    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: row;
    padding: 20px;
}
</style>
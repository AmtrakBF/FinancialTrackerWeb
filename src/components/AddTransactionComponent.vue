<script lang="ts">
import type { SavingsAccount } from '@/models/SavingsAccount';
import { defineComponent, type PropType } from 'vue';
import type { ATBFError } from '@/models/ATBFError';

import SavingsAccountService from '@/services/SavingsAccountService';
import ErrorHandlingService from '@/services/ErrorHandlingService';

import DropDownComponent from './common/DropDownComponent.vue';
import InputBoxComponent from './common/InputBoxComponent.vue';
import InputAreaComponent from './common/InputAreaComponent.vue';
import ButtonComponent from './common/ButtonComponent.vue';
import CalendarComponent from './common/CalendarComponent.vue';


export default defineComponent({

    props: {
        account: {type: Object as PropType<SavingsAccount>, required: true},
    },
    components: {
        DropDownComponent,
        InputAreaComponent,
        InputBoxComponent,
        ButtonComponent,
        CalendarComponent
    },
    data() {
        return {
            amount: '',
            date: new Date(),
            types: [
                {id: 0, value: "Deposit / Add" },
                {id: 1, value: "Withdraw / Subtract" },
            ],
            type: {id: -1, value: "null"},
            description: '',
            isDropDownActive: false,

            accountError: {name: 'AccountId', errors: []} as ATBFError,
            typeError: {name: 'Type', errors: []} as ATBFError,
            amountError: {name: 'Amount', errors: []} as ATBFError,
            descriptionError: {name: 'Description', errors: []} as ATBFError,
            dateError: {name: 'Description', errors: []} as ATBFError,

            domErrors: [] as ATBFError[],
        }
    },
    mounted() {
        this.domErrors = [ this.accountError, this.typeError, this.amountError, this.descriptionError, this.dateError ]
    },
    methods: {
        async submitForm() {

            try {
                const response = await SavingsAccountService.PostTransaction(this.account.id, this.type.id, parseFloat(this.amount), this.description, this.date)
                this.$emit('onSubmit', response.data)
            } catch (error) {
                ErrorHandlingService.GetErrors(this.domErrors, error)
            }
        },
        closeDropDownMenu() {
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
                    <h2>Add Transaction</h2>
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
                            <h5>Date:</h5>
                            <CalendarComponent :user-date="date" @on-update="newDate => date = newDate"/>
                        </div>
                        <div class="input-row">
                            <p></p>
                            <span v-if="dateError.errors.length > 0">*{{ dateError.errors[0] }}</span>
                        </div>
                    </div> 

                    <div class="input-container">
                        <div class="input-row">
                            <h5>Type:</h5>
                        <DropDownComponent :values="types" preview-key="value" id-key="id" @onClick="newType => type = newType"/>
                        </div>
                        <div class="input-row">
                            <p></p>
                            <span v-if="typeError.errors.length > 0">*{{ typeError.errors[0] }}</span>
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
                            <InputAreaComponent class="input-comp" place-holder="(optional)" @onUpdate="newValue => description = newValue"/>
                        </div>
                        <div class="input-row">
                            <p></p>
                            <span v-if="descriptionError.errors.length > 0">*{{ descriptionError.errors[0] }}</span>
                        </div>
                    </div> 

                </div>
                <div class="submit-buttons">
                    <ButtonComponent title="Cancel" background-color="var(--error50)" hover-background-color="var(--error)" @onClick="$emit('isDisplayed')"/>
                    <ButtonComponent title="Add" background-color="var(--primary25)" hover-background-color="var(--primary)" @onClick="submitForm()"/>
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

    grid-template-columns: 160px 1fr;
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
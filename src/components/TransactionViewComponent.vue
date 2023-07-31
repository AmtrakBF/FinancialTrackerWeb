<script lang="ts">
import SavingsAccountService from '@/services/SavingsAccountService';
import ErrorHandlingService from '@/services/ErrorHandlingService';

import DropDownComponent from './common/DropDownComponent.vue';
import InputBoxComponent from './common/InputBoxComponent.vue';
import InputAreaComponent from './common/InputAreaComponent.vue';
import ButtonComponent from './common/ButtonComponent.vue';
import ErrorComponent from './ErrorComponent.vue';
import CalendarComponent from './common/CalendarComponent.vue';

import { defineComponent, type PropType } from 'vue';

import type { ATBFError } from '@/models/ATBFError';
import type { Transaction } from '@/models/Transaction';
import DateService from '@/services/DateService';

export default defineComponent({

    props: {
        transaction: {type: Object as PropType<Transaction>, required: true},
    },
    emits: ['isDisplayed'],
    components: {
        DropDownComponent,
        InputAreaComponent,
        InputBoxComponent,
        ButtonComponent,
        ErrorComponent,
        CalendarComponent
    },
    data() {
        return {
            description: '',
            date: {} as Date,
            isEditMode: false,
            saveKey: 0,

            month:[] as [] as {week:number, days:Date[]}[],
            months: ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', "November", 'Decemeber'],
            currentMonthNumber: -1,
            currentYear: new Date().getFullYear(),

            accountIdError: {name: 'AccountId', errors: []} as ATBFError,
            transactionIdError: {name: 'TransactionId', errors: []} as ATBFError,
            dateError: {name: 'Date', errors: []} as ATBFError,
            descriptionError: {name: 'Description', errors: []} as ATBFError,
            typeError: {name: 'Type', errors: []} as ATBFError,
            amountError: {name: 'Amount', errors: []} as ATBFError,

            genericErrorKey: 0,
            genericError: { name: ErrorHandlingService.ErrorKeys.DefaultKey, errors:[] } as ATBFError,

            domErrors: [] as ATBFError[],
        }
    },
    mounted() {
        this.domErrors = [ this.amountError, this.descriptionError, this.accountIdError, this.transactionIdError, this.typeError, this.dateError, this.genericError ]
        this.description = this.transaction.description
        this.date = this.transaction.date
        this.month = this.GetMonth(new Date().getMonth())
    },
    watch: {
        genericError() {
            this.genericErrorKey++
        },
    },
    methods: {
        ToggleEditMode() {
            this.saveKey++
            this.isEditMode = !this.isEditMode
        },

        isTransfer() {
            return this.transaction.transactionType != 'Transfer Out' && this.transaction.transactionType != 'Transfer In'
        },

        SaveTransactionEdits() {
            SavingsAccountService.PutTransaction(this.transaction.savingsAccountId, this.transaction.id, this.date, this.description)
            .then(response => {
                this.$emit('isDisplayed', response.data)
            })
            .catch(error => ErrorHandlingService.GetErrors(this.domErrors, error))
        },

        GetMonth(monthNum:number) : {week:number, days:Date[]}[]  {
            return DateService.GetMonth(monthNum, new Date().getFullYear())
        }
    }
})
</script>

<template>
    <body class="body-global">
        <div class="wrapper">
            <div class="container-global">
                <div class="header-global">
                    <h2>{{transaction.transactionType}}</h2>
                    <img @click="$emit('isDisplayed', undefined)" src="./imgs/x-icon.png" height="32" width="32">
                </div>
                <div class="content-global">

                    <div class="input-container">
                        <div class="input-row">
                            <h5>Date:</h5>
                            <CalendarComponent :user-date="transaction.date" :is-disabled="!isEditMode" @on-update="newDate => date = newDate"/>
                        </div>
                        <div class="input-row">
                            <p></p>
                            <span v-if="dateError.errors.length > 0">*{{ dateError.errors[0] }}</span>
                        </div>
                    </div> 

                    <div class="input-container">
                        <div class="input-row">
                            <h5>Description:</h5>
                            <InputBoxComponent class="input-comp" :default-value="transaction.description" :is-disabled="!isEditMode" 
                            @on-update="newDescription => description = newDescription"/>
                        </div>
                        <div class="input-row">
                            <p></p>
                            <span v-if="descriptionError.errors.length > 0">*{{ descriptionError.errors[0] }}</span>
                        </div>
                    </div> 

                    <div class="input-container">
                        <div class="input-row">
                            <h5>Amount:</h5>
                            <InputBoxComponent class="input-comp" :default-value="'$'+transaction.amount.toFixed(2)" :is-disabled="true"/>
                        </div>
                        <div class="input-row">
                            <p></p>
                            <span v-if="amountError.errors.length > 0">*{{ amountError.errors[0] }}</span>
                        </div>
                    </div> 
                    
                    <div class="buttons-submit">
                        <ButtonComponent title="Edit" v-if="isTransfer()" background-color="var(--secondary50)" hover-background-color="var(--secondary)" @onClick="ToggleEditMode"/>
                        <ButtonComponent title="Save" background-color="var(--primary25)" hover-background-color="var(--primary)" :key="saveKey"
                         :is-disabled="!isEditMode" @onClick="SaveTransactionEdits"/>
                    </div>
                </div>
            </div>
        </div>
        <ErrorComponent v-if="genericError.errors.length > 0" :errors="genericError" @isDisplayed="genericError.errors = []" :key="genericErrorKey"/>
    </body>
</template>

<style scoped>
.calendar {
    background-color: white;
    width: 300px;
    padding: 10px;
    border-radius: 10px;
}

.week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center; 
}

.day {
    padding: 2px;
    border-radius: 10px;
}

.day:hover {
    cursor: pointer;
    background-color: var(--secondary25);
}

.wrapper {
    background-color: white;
    border-radius: 10px;

    margin: auto;

    width: 50%;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

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

.buttons-submit {
    position: relative;
    display: flex;

    width: fit-content;
    margin: auto;
    white-space: nowrap;
}
</style>
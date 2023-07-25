<script lang="ts">
import SavingsAccountService from '@/services/SavingsAccountService';
import { defineComponent } from 'vue';
import DropDownComponent from './common/DropDownComponent.vue';
import InputBoxComponent from './common/InputBoxComponent.vue';
import InputAreaComponent from './common/InputAreaComponent.vue';
import ButtonComponent from './common/ButtonComponent.vue';
import type { ATBFError } from '@/models/ATBFError';
import ErrorHandlingService from '@/services/ErrorHandlingService';

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

            nameError: {name: 'AccountName', errors: []} as ATBFError,
            balanceError: {name: 'InitialBalance', errors: []} as ATBFError,

            domErrors: [] as ATBFError[],
        }
    },
    mounted() {
        this.domErrors = [ this.nameError, this.balanceError ]
    },
    methods: {
        async submitForm() {
            try {
                let response = await SavingsAccountService.PostAccount(this.name, this.balance)
                this.$emit('onSubmit', response.data)
            } catch (error) {
                ErrorHandlingService.GetErrors(this.domErrors, error)
            }
        },
    }
})
</script>

<template>
    <body class="body-global">
        <div class="wrapper-global">
            <div class="container-global">
                <div class="header-global">
                    <h2>New Account</h2>
                    <img @click="$emit('isDisplayed', false)" src="./imgs/x-icon.png" height="32" width="32">
                </div>
                <div class="content-global">
                    <div class="input-container">
                        <div class="input-row">
                            <h5>Name: </h5>
                            <InputBoxComponent class="input-comp" @onUpdate="newValue => name = newValue"/>
                        </div>
                        <div class="input-row">
                            <p></p>
                            <span v-if="nameError.errors.length > 0">*{{ nameError.errors[0] }}</span>
                        </div>
                    </div> 

                    <div class="input-container">
                        <div class="input-row">
                            <h5>Initial Balance:</h5>
                            <InputBoxComponent class="input-comp" :default-value="balance" @onUpdate="newValue => balance = newValue"/>
                        </div>
                        <div class="input-row">
                            <p></p>
                            <span v-if="balanceError.errors.length > 0">*{{ balanceError.errors[0] }}</span>
                        </div>
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
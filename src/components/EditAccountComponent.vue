<script lang="ts">
import type { ATBFError } from '@/models/ATBFError';
import type { SavingsAccount } from '@/models/SavingsAccount';
import SavingsAccountService from '@/services/SavingsAccountService';
import { defineComponent, type PropType } from 'vue';
import DropDownComponent from './common/DropDownComponent.vue';
import InputBoxComponent from './common/InputBoxComponent.vue';
import ButtonComponent from './common/ButtonComponent.vue';
import ErrorHandlingService from '@/services/ErrorHandlingService';
import ErrorComponent from './ErrorComponent.vue';

export default defineComponent({
    
    components: {
        DropDownComponent,
        InputBoxComponent,
        ButtonComponent,
        ErrorComponent
    },
    props: {
        accounts: {type: Object as PropType<SavingsAccount[]>, required: true}
    },
    emits: ['isDisplayed', 'onSubmit', 'onAccountNameChange'],
    data() {
        return {
            selectedAccount: {} as SavingsAccount,
            newAccountName: '',
            SavingsAccountNewNameKey: 0,
            deleteAccountEmail: '',
            deleteAccountPassword: '',
            genericErrorKey: 0,

            accountError: {name: "AccountId", errors: []} as ATBFError,
            nameError: {name: 'Name', errors: []} as ATBFError,
            emailError: {name: "LoginRequest.Email", errors: []} as ATBFError,
            passwordError: {name: "LoginRequest.Password", errors: []} as ATBFError,
            genericError: {name: ErrorHandlingService.ErrorKeys.DefaultKey, errors: []} as ATBFError,

            domErrors: [] as ATBFError[],

            isSavingsAccountSettingsDisplayed: true,
            isConfirmDeleteAccountDisplayed: false,
        }
    },
    mounted() {
        this.domErrors = [ this.accountError, this.nameError, this.emailError, this.passwordError, this.genericError ]
    },
    watch: {
        genericError() {
            this.genericErrorKey++
        }
    },
    methods: {
        async SaveSavingsAccountDetails() {
            try {
                let response = await SavingsAccountService.PatchSavingsAccountName(this.selectedAccount.id, this.newAccountName)
                this.$emit('onAccountNameChange', response.data)
            } catch (error) {
                ErrorHandlingService.GetErrors(this.domErrors, error)
            }
        },
        async DeleteAccount() {
            try {
                let response = await SavingsAccountService.DeleteAccount(this.selectedAccount.id, this.deleteAccountEmail, this.deleteAccountPassword)
                this.$emit('onSubmit', response.data)
            } catch (error) {
                ErrorHandlingService.GetErrors(this.domErrors, error)
            }
        },
        ClearErrors() {
            this.domErrors.forEach(x => {
                x.errors = []
            })
        },
        CloseMenu() {
            this.$emit('isDisplayed')
        }
    }
})

</script>

<template>
    <div class="wrapper-global" v-if="isSavingsAccountSettingsDisplayed">
        <div class="container-global">
            <div class="header-global">
                <h2>Savings Account Settings</h2>
                <img @click="$emit('isDisplayed', false)" src="./imgs/x-icon.png" height="32" width="32">
            </div>
            <div class="content-global">
                <div class="input-container">
                    <div class="input-row">
                        <h5>Select Account: </h5>
                        <DropDownComponent :values="accounts" id-key="id" preview-key="name" @onClick="newAccount => { selectedAccount = newAccount; SavingsAccountNewNameKey++;} "/>
                    </div>
                    <div class="input-row">
                        <p></p>
                        <span v-if="accountError.errors.length > 0">*{{ accountError.errors[0] }}</span>
                    </div>
                </div>

                <div class="input-container">
                    <div class="input-row">
                        <h5>Name: </h5>
                        <InputBoxComponent class="input-comp" :default-value="selectedAccount.name" :key="SavingsAccountNewNameKey" @onUpdate="newValue => newAccountName = newValue"/>
                    </div>
                    <div class="input-row">
                        <p></p>
                        <span v-if="nameError.errors.length > 0">*{{ nameError.errors[0] }}</span>
                    </div>
                </div> 

                <div class="buttons-submit">
                    <ButtonComponent title="Delete Account" background-color="var(--error50)" hover-background-color="var(--error)" 
                    @onClick="isConfirmDeleteAccountDisplayed = true, isSavingsAccountSettingsDisplayed = false, ClearErrors()"
                    :is-disabled="selectedAccount.id == null" :key="SavingsAccountNewNameKey"/>
                    <ButtonComponent title="Back" background-color="var(--error50)" hover-background-color="var(--error)" @onClick="CloseMenu()"/>
                    <ButtonComponent title="Save" background-color="var(--primary25)" hover-background-color="var(--primary)" @onClick="SaveSavingsAccountDetails"/>
                </div>
            </div>
        </div>
    </div>

    <div class="wrapper-global" v-if="isConfirmDeleteAccountDisplayed">
        <div class="container-global">
            <div class="header-global">
                <h3>Confirm Delete '{{ selectedAccount.name }}'</h3>
                <img @click="isConfirmDeleteAccountDisplayed = false, isSavingsAccountSettingsDisplayed = true" src="./imgs/x-icon.png" height="32" width="32">
            </div>
            <div class="content-global">
                <div class="input-container">
                    <div class="input-row">
                        <h5>Confirm Email: </h5>
                            <InputBoxComponent class="input-comp" @onUpdate="newValue => deleteAccountEmail = newValue"/>
                    </div>
                    <div class="input-row">
                        <p></p>
                        <span v-if="emailError.errors.length > 0">*{{ emailError.errors[0] }}</span>
                    </div>
                </div>

                <div class="input-container">
                    <div class="input-row">
                        <h5>Confirm Password: </h5>
                        <InputBoxComponent class="input-comp" input-type="password" @onUpdate="newValue => deleteAccountPassword = newValue"/>
                    </div>
                    <div class="input-row">
                        <p></p>
                        <span v-if="passwordError.errors.length > 0">*{{ passwordError.errors[0] }}</span>
                    </div>
                </div> 

                <div class="buttons-submit">
                    <ButtonComponent title="Back" background-color="var(--error50)" hover-background-color="var(--error)" 
                    @onClick="isSavingsAccountSettingsDisplayed = true, isConfirmDeleteAccountDisplayed = false, ClearErrors()"/>
                    <ButtonComponent title="Save" background-color="var(--primary25)" hover-background-color="var(--primary)" @onClick="DeleteAccount"/>
                </div>
            </div>
        </div>
    </div>

    <ErrorComponent v-if="genericError.errors.length > 0" :errors="genericError" @isDisplayed="genericError.errors = []" :key="genericErrorKey"/>
</template>

<style scoped>
.input-container {
    padding: 16px;
}

.input-row {
    display: grid;
    justify-content: center;
    align-items: center;

    grid-template-columns: 200px 1fr;
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

.buttons-submit {
    position: relative;
    display: flex;

    width: fit-content;
    margin: auto;
    white-space: nowrap;
}
</style>
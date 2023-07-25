<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import DropDownComponent from './common/DropDownComponent.vue';
import InputBoxComponent from './common/InputBoxComponent.vue';
import InputAreaComponent from './common/InputAreaComponent.vue';
import ButtonComponent from './common/ButtonComponent.vue';
import EditAccountComponent from './EditAccountComponent.vue'
import type { User } from '@/models/User';
import type { SavingsAccount } from '@/models/SavingsAccount';
import type { ATBFError } from '@/models/ATBFError';

export default defineComponent({

    props: {
        user: { type: Object as PropType<User>, required: true },
        accounts: { type: Object as PropType<SavingsAccount[]>, required: true}
    },
    components: {
    DropDownComponent,
    InputAreaComponent,
    InputBoxComponent,
    ButtonComponent,
    EditAccountComponent
},
    data() {
        return {
            localUser: {} as User,
            password: '',
            confirmPassword: '',
            userEmail: '',
            userPassword: '',

            firstNameError: {name: "FirstName", errors: []} as ATBFError,
            lastNameError: {name: 'LastName', errors: []} as ATBFError,
            emailError: {name: "Email", errors: []} as ATBFError,
            passwordError: {name: "Password", errors: []} as ATBFError,
            confirmPasswordError: {name: "ConfirmPassword", errors: []} as ATBFError,

            domErrors: [] as ATBFError[],

            isSettingsDisplayed: true,
            isProfileSettingsDisplayed: false,
            isSavingsAccountSettingsDisplayed: false,
            isConfirmLoginCredentialsDisplayed: false
        }
    },
    mounted() {
        this.localUser,
        this.domErrors = [ this.firstNameError, this.lastNameError, this.emailError, this.passwordError, this.confirmPasswordError ]
    },
    methods: {
        SubmitForm() {
            this.$emit('isDisplayed', false)
        },
        ClearErrors() {
            this.domErrors.forEach(x => x.errors = [])
        },

        onAccountNameChange(response:SavingsAccount) {
            this.isSavingsAccountSettingsDisplayed = false
            this.$emit('onAccountNameChange', response)
        }
    }
})
</script>

<template>
    <body class="body-global">
        <div class="wrapper-global">
            <div class="container-global">
                <div class="header-global">
                    <h2>Settings</h2>
                    <img @click="$emit('isDisplayed', false)" src="./imgs/x-icon.png" height="32" width="32">
                </div>
                <div class="content-global">
                    <div class="buttons">
                        <ButtonComponent title="Profile Settings" @onClick="isProfileSettingsDisplayed = true"/>
                        <ButtonComponent title="Savings Account Settings" @onClick="isSavingsAccountSettingsDisplayed = true"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="wrapper-global" v-if="isProfileSettingsDisplayed">
            <div class="container-global">
                <div class="header-global">
                    <h2>Profile Settings</h2>
                    <img @click="$emit('isDisplayed', false)" src="./imgs/x-icon.png" height="32" width="32">
                </div>
                <div class="content-global">
                    <div class="input-container">
                        <div class="input-row">
                            <h5>First Name: </h5>
                            <InputBoxComponent class="input-comp" :default-value="user.firstName" @onUpdate="newValue => localUser.firstName = newValue"/>
                        </div>
                        <div class="input-row">
                            <p></p>
                            <span v-if="firstNameError.errors.length > 0">*{{ firstNameError.errors[0] }}</span>
                        </div>
                    </div> 

                    <div class="input-container">
                        <div class="input-row">
                            <h5>Last Name: </h5>
                            <InputBoxComponent class="input-comp" :default-value="user.lastName" @onUpdate="newValue => localUser.lastName = newValue"/>
                        </div>
                        <div class="input-row">
                            <p></p>
                            <span v-if="lastNameError.errors.length > 0">*{{ lastNameError.errors[0] }}</span>
                        </div>
                    </div> 

                    <div class="input-container">
                        <div class="input-row">
                            <h5>Email: </h5>
                            <InputBoxComponent class="input-comp" :is-disabled="true" :default-value="user.email" @onUpdate="newValue => localUser.email = newValue"/>
                        </div>
                        <div class="input-row">
                            <p></p>
                            <span v-if="emailError.errors.length > 0">*{{ emailError.errors[0] }}</span>
                        </div>
                    </div> 

                    <div class="input-container">
                        <div class="input-row">
                            <h5>New Password: </h5>
                            <InputBoxComponent class="input-comp" :is-disabled="true" input-type="password" auto-complete="off" @onUpdate="newValue => password = newValue"/>
                        </div>
                        <div class="input-row">
                            <p></p>
                            <span v-if="passwordError.errors.length > 0">*{{ passwordError.errors[0] }}</span>
                        </div>
                    </div> 

                    <div class="input-container">
                        <div class="input-row">
                            <h5>Confirm New Password: </h5>
                            <InputBoxComponent class="input-comp" :is-disabled="true" input-type="password" auto-complete="off" @onUpdate="newValue => confirmPassword = newValue"/>
                        </div>
                        <div class="input-row">
                            <p></p>
                            <span v-if="confirmPasswordError.errors.length > 0">*{{ confirmPasswordError.errors[0] }}</span>
                        </div>
                    </div> 

                </div>
                <div class="submit-buttons">
                    <ButtonComponent title="Back" background-color="var(--error50)" hover-background-color="var(--error)"
                     @onClick="isProfileSettingsDisplayed = false, ClearErrors()"/>
                    <ButtonComponent title="Save" background-color="var(--primary25)" hover-background-color="var(--primary)"
                     @onClick="isConfirmLoginCredentialsDisplayed = true, ClearErrors()"/>
                </div>
            </div>
        </div>

        <div class="wrapper-global" v-if="isConfirmLoginCredentialsDisplayed">
        <div class="container-global">
            <div class="header-global">
                <h3>Confirm Login</h3>
                <img @click="isConfirmLoginCredentialsDisplayed = false, isProfileSettingsDisplayed = true" src="./imgs/x-icon.png" height="32" width="32">
            </div>
            <div class="content-global">
                <div class="input-container">
                    <div class="input-row">
                        <h5>Confirm Email: </h5>
                        <InputBoxComponent class="input-comp" @onUpdate="newValue => userEmail = newValue"/>
                    </div>
                    <div class="input-row">
                        <p></p>
                        <span v-if="emailError.errors.length > 0">*{{ emailError.errors[0] }}</span>
                    </div>
                </div>

                <div class="input-container">
                    <div class="input-row">
                        <h5>Confirm Password: </h5>
                        <InputBoxComponent class="input-comp" input-type="password" @onUpdate="newValue => userPassword = newValue"/>
                    </div>
                    <div class="input-row">
                        <p></p>
                        <span v-if="passwordError.errors.length > 0">*{{ passwordError.errors[0] }}</span>
                    </div>
                </div> 

                <div class="submit-buttons">
                    <ButtonComponent title="Back" background-color="var(--error50)" hover-background-color="var(--error)" 
                    @onClick="isProfileSettingsDisplayed = true, isConfirmLoginCredentialsDisplayed = false, ClearErrors()"/>
                    <ButtonComponent title="Save" background-color="var(--primary25)" hover-background-color="var(--primary)" @onClick="SubmitForm"/>
                </div>
            </div>
        </div>
    </div>

    <EditAccountComponent :accounts="accounts" v-if="isSavingsAccountSettingsDisplayed" @isDisplayed="isSavingsAccountSettingsDisplayed = false"
    @onAccountNameChange="response => onAccountNameChange(response)"/>
        
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

.buttons {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: auto;
}
</style>
<script lang="ts">
import { defineComponent, type Prop, type PropType } from 'vue';
import DropDownComponent from './common/DropDownComponent.vue';
import InputBoxComponent from './common/InputBoxComponent.vue';
import InputAreaComponent from './common/InputAreaComponent.vue';
import ButtonComponent from './common/ButtonComponent.vue';
import type { User } from '@/models/User';
import type { SavingsAccount } from '@/models/SavingsAccount';
import SavingsAccountService from '@/services/SavingsAccountService';

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
},
    data() {
        return {
            localUser: {} as User,
            password: '',
            confirmPassword: '',

            selectedAccount: {} as SavingsAccount,
            newAccountName: 'Savings Account',
            SavingsAccountNewNameKey: 0,
            deleteAccountEmail: '',
            deleteAccountPassword: '',

            isSettingsDisplayed: true,
            isProfileSettingsDisplayed: false,
            isSavingsAccountSettingsDisplayed: false,
            isConfirmDeleteAccountDisplayed: false,
        }
    },
    mounted() {
        this.localUser
    },
    methods: {
        submitForm() {
            this.$emit('isDisplayed', false)
        },
        SaveSavingsAccountDetails() {
            SavingsAccountService.PatchSavingsAccountName(this.selectedAccount.id, this.newAccountName)
            .then(_ => this.$emit('isDisplayed', false))
        },
        DeleteAccount() {
            SavingsAccountService.DeleteAccount(this.selectedAccount.id, this.deleteAccountEmail, this.deleteAccountPassword)
            .then(_ => this.$emit('isDisplayed', false))
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
                    <div class="input-box">
                        <h5>First Name: </h5>
                        <InputBoxComponent class="input-comp" :default-value="user.firstName" @onUpdate="newValue => localUser.firstName = newValue"/>
                    </div>
                    <div class="input-box">
                        <h5>Last Name: </h5>
                        <InputBoxComponent class="input-comp" :default-value="user.lastName" @onUpdate="newValue => localUser.lastName = newValue"/>
                    </div>
                    <div class="input-box">
                        <h5>Email: </h5>
                        <InputBoxComponent class="input-comp" :default-value="user.email" @onUpdate="newValue => localUser.email = newValue"/>
                    </div>
                    <div class="input-box">
                        <h5>New Password: </h5>
                        <InputBoxComponent class="input-comp" input-type="password" auto-complete="off" @onUpdate="newValue => password = newValue"/>
                    </div>
                    <div class="input-box">
                        <h5>Confirm Password: </h5>
                        <InputBoxComponent class="input-comp" input-type="password" auto-complete="off" @onUpdate="newValue => confirmPassword = newValue"/>
                    </div>
                </div>
                <div class="buttons-submit">
                    <ButtonComponent title="Back" background-color="var(--error50)" hover-background-color="var(--error)" @onClick="isProfileSettingsDisplayed = false; "/>
                    <ButtonComponent title="Add" background-color="var(--primary25)" hover-background-color="var(--primary)" @onClick="submitForm"/>
                </div>
            </div>
        </div>

        <div class="wrapper-global" v-if="isSavingsAccountSettingsDisplayed">
            <div class="container-global">
                <div class="header-global">
                    <h2>Savings Account Settings</h2>
                    <img @click="$emit('isDisplayed', false)" src="./imgs/x-icon.png" height="32" width="32">
                </div>
                <div class="content-global">
                    <div class="input-box">
                        <h5>Select Account: </h5>
                        <DropDownComponent :values="accounts" key="id" preview-key="name" @onClick="newAccount => { selectedAccount = newAccount; SavingsAccountNewNameKey++} "/>
                    </div>
                    <div class="input-box">
                        <h5>Name: </h5>
                        <InputBoxComponent class="input-comp" :default-value="selectedAccount.name" :key="SavingsAccountNewNameKey" @onUpdate="newValue => newAccountName = newValue"/>
                    </div>
                    
                </div>
                <div class="buttons-submit">
                    <ButtonComponent title="Delete Account" background-color="var(--error50)" hover-background-color="var(--error)" 
                    @onClick="isConfirmDeleteAccountDisplayed = true, isSavingsAccountSettingsDisplayed = false"/>
                    <ButtonComponent title="Back" background-color="var(--error50)" hover-background-color="var(--error)" @onClick="isSavingsAccountSettingsDisplayed = false"/>
                    <ButtonComponent title="Save" background-color="var(--primary25)" hover-background-color="var(--primary)" @onClick="SaveSavingsAccountDetails"/>
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
                    <div class="input-box">
                        <h5>Confirm Email: </h5>
                        <InputBoxComponent class="input-comp" @onUpdate="newValue => deleteAccountEmail = newValue"/>
                    </div>
                    <div class="input-box">
                        <h5>Confirm Password: </h5>
                        <InputBoxComponent class="input-comp" input-type="password" @onUpdate="newValue => deleteAccountPassword = newValue"/>
                    </div>
                    <div class="buttons-submit">
                        <ButtonComponent title="Back" background-color="var(--error50)" hover-background-color="var(--error)" 
                        @onClick="isSavingsAccountSettingsDisplayed = true, isConfirmDeleteAccountDisplayed = false"/>
                        <ButtonComponent title="Save" background-color="var(--primary25)" hover-background-color="var(--primary)" @onClick="DeleteAccount"/>
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

.input-comp{
    flex: 2;
    width: 100%;
}

.buttons-submit {
    position: relative;
    display: flex;

    width: fit-content;
    margin: auto;
    white-space: nowrap;
}

.buttons {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: auto;
}
</style>
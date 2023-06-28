<script lang="ts">
import SavingsAccountService from '@/services/SavingsAccountService';
import { defineComponent, type Prop, type PropType } from 'vue';
import DropDownComponent from './common/DropDownComponent.vue';
import InputBoxComponent from './common/InputBoxComponent.vue';
import InputAreaComponent from './common/InputAreaComponent.vue';
import ButtonComponent from './common/ButtonComponent.vue';
import type { User } from '@/models/User';

export default defineComponent({

    props: {
        user: { type: Object as PropType<User>, required: true }
    },
    components: {
        DropDownComponent,
        InputAreaComponent,
        InputBoxComponent,
        ButtonComponent
    },
    data() {
        return {
            localUser: {} as User,
            password: '',
            confirmPassword: '',

            isSettingsDisplayed: true,
            isAccountSettingsDisplayed: false,
            isSavingsAccountSettingsDisplayed: false
        }
    },
    mounted() {
        this.localUser
    },
    methods: {
        submitForm() {
            this.$emit('isDisplayed', false)
        },
    }
})
</script>

<template>
    <body>
        <div class="wrapper">
            <div class="container">
                <div class="header">
                    <h2>Settings</h2>
                    <img @click="$emit('isDisplayed', false)" src="./imgs/x-icon.png" height="32" width="32">
                </div>
                <div class="content">
                    <div class="buttons">
                        <ButtonComponent title="Profile Settings" @onClick="isAccountSettingsDisplayed = true"/>
                        <ButtonComponent title="Savings Account Settings" @onClick="isSavingsAccountSettingsDisplayed = true"/>
                    </div>
                </div>
            </div>
        </div>

        <div class="wrapper" v-if="isAccountSettingsDisplayed">
            <div class="container">
                <div class="header">
                    <h2>Profile Settings</h2>
                    <img @click="$emit('isDisplayed', false)" src="./imgs/x-icon.png" height="32" width="32">
                </div>
                <div class="content">
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
                    <ButtonComponent title="Back" background-color="var(--error50)" hover-background-color="var(--error)" @onClick="isAccountSettingsDisplayed = false; "/>
                    <ButtonComponent title="Add" background-color="var(--primary25)" hover-background-color="var(--primary)" @onClick="submitForm"/>
                </div>
            </div>
        </div>

        <div class="wrapper" v-if="isSavingsAccountSettingsDisplayed">
            <div class="container">
                <div class="header">
                    <h2>Savings Account Settings</h2>
                    <img @click="$emit('isDisplayed', false)" src="./imgs/x-icon.png" height="32" width="32">
                </div>
                <div class="content">
                    <div class="input-box">
                        <h5>Select Account: </h5>
                        <InputBoxComponent class="input-comp" :default-value="user.firstName" @onUpdate="newValue => localUser.firstName = newValue"/>
                    </div>
                    <div class="input-box">
                        <h5>Name: </h5>
                        <InputBoxComponent class="input-comp" :default-value="user.lastName" @onUpdate="newValue => localUser.lastName = newValue"/>
                    </div>
                    <div class="input-box">
                        <h5>Delete: </h5>
                        <InputBoxComponent class="input-comp" :default-value="user.email" @onUpdate="newValue => localUser.email = newValue"/>
                    </div>
                </div>
                <div class="buttons-submit">
                    <ButtonComponent title="Back" background-color="var(--error50)" hover-background-color="var(--error)" @onClick="isSavingsAccountSettingsDisplayed = false"/>
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

.buttons-submit {
    position: relative;
    width: fit-content;

    display: flex;
}

.buttons {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: auto;
}
</style>
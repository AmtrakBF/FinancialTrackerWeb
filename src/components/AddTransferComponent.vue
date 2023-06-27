<script lang="ts">
import type { SavingsAccount } from '@/models/SavingsAccount';
import SavingsAccountService from '@/services/SavingsAccountService';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({

    props: {
        account: {type: Object as PropType<SavingsAccount>, required: true},
        accounts: {type: [] as PropType<SavingsAccount[]>, required: true}
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
            .then(response => {
                this.$emit('isDisplayed', false)
            })
            .catch(error => console.log(error))
        },

        OpenLoginMenu() {
            this.isLoginMenuDisplayed = true,
            this.isTransferMenuActive = false
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
                        <input type="text" v-model="account.name" disabled>
                    </div>
                    
                    <div class="input-box">
                        <h5>To Account:</h5>
                        <div class="dropdown-input" @click="isDropDownActive = !isDropDownActive" :class="{'dropdown-input-active': isDropDownActive}" v-click-outside="CloseDropDownMenu">
                            <p>{{ selectedAccount.name }}</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" width="19" height="19">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                            <div class="input-dropdown-menu" :class="{'input-dropdown-active': isDropDownActive}">
                                <div class="dropdown-input" v-for="savingsAccount in accounts" @click="selectedAccount = savingsAccount">
                                    <p>{{ savingsAccount.name }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="input-box">
                        <h5>Amount:</h5>
                        <input type="text" v-model="amount">
                    </div>

                    <div class="input-box">
                        <h5>Description:</h5>
                        <textarea v-model="description"/>
                    </div>
                </div>
                <div class="submit-buttons">
                    <div class="button">
                        <h6 id="cancel-button" @click="$emit('isDisplayed', false)">Cancel</h6>
                    </div>
                    <div class="button" @click="OpenLoginMenu">
                        <h6>Add</h6>
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
                        <input type="text" v-model="email">
                    </div>

                    <div class="input-box">
                        <h5>Password:</h5>
                        <input type="password" v-model="password">
                    </div>
                </div>
                <div class="submit-buttons">
                    <div class="button" @click="SubmitForm">
                        <h6>Confirm</h6>
                    </div>
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

.input-box input, .input-box textarea {
    flex: 2;
    width: 100%;
    padding: 8px;

    color: var(--black75);
    background-color: rgb(255, 255, 255, .9);

    border-radius: 10px;
    border: 1px solid var(--primary);
}

.input-box input:focus {
    outline-color: var(--secondary);
}

.input-box input:disabled {
    background-color: var(--black5);
}

.input-box textarea {
    resize: none;
    height: 96px;
}

.submit-buttons {
    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: row;
    padding: 20px;
}

.button {
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: var(--white25);

    border: 1px solid var(--black75);
    border-radius: 10px;

    margin: 0px 64px;
}

.button:hover {
    cursor: pointer;
    background-image: linear-gradient(to left, var(--primary), var(--secondary));
}

.button h6 {
    padding: 8px 16px;
}

#cancel-button {
    background-color: var(--error50);
    border-radius: 10px;
}

#cancel-button:hover {
    background-color: var(--error)
}

.dropdown-input {
    position: relative;
    flex: 2;
    width: 100%;
    height: 39px;
    padding: 8px;
    font-size: 16px;
    
    color: var(--black75);
    background-color: rgb(255, 255, 255, .9);

    border: 1px solid var(--primary);
    border-radius: 10px;

    display: flex;
    justify-content: space-between;
    align-items: center;
}

.dropdown-input:hover {
    cursor: pointer;
}

.dropdown-input-active {
    border-radius: 10px 10px 0px 0px;
}

.input-dropdown-menu {
    position: absolute;
    display: none;

    background-color: white;
    border-radius: 10px;

    width: 306px;
    top: 2.4em;
    right: -1px;

    border: 1px solid var(--primary);
    border-top: 0px;
    border-radius: 0px 0px 10px 10px;
}

.input-dropdown-menu .dropdown-input {
    border: 1px solid rgb(255, 255, 255, .9);
}

.input-dropdown-menu .dropdown-input:hover {
    background-color: var(--black25);
}

.input-dropdown-active {
    display: block;
}
</style>
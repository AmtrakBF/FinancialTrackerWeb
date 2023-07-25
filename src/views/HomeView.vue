<script lang="ts">
import { defineComponent } from 'vue';

import SavingsAccountService from '@/services/SavingsAccountService';
import UserService from '@/services/UserService';

import type { Transaction } from '@/models/Transaction';
import type { User } from '@/models/User';
import type { SavingsAccount as SavingsAccount } from '@/models/SavingsAccount';
import type { ATBFError } from '@/models/ATBFError';

import TransactionComponent from '../components/TransactionComponent.vue'
import LoginComponent from '../components/LoginComponent.vue'
import AddTransactionComponent from '../components/AddTransactionComponent.vue'
import AddTransferComponent from '../components/AddTransferComponent.vue'
import TestComponent from '@/components/TestComponent.vue';
import AddAccountComponent from '@/components/AddAccountComponent.vue';
import SettingsComponent from '@/components/SettingsComponent.vue'
import TransactionViewComponent from '@/components/TransactionViewComponent.vue'
import ErrorHandlingService from '@/services/ErrorHandlingService';
import ErrorComponent from '@/components/ErrorComponent.vue'

const UserCookieName = 'UserCookie'

export default defineComponent({

    data() {
        return {
            transactions: [] as Transaction[],
            user: {} as User,
            savingsAccounts: [] as SavingsAccount[],
            displaySavingsAccounts: [] as SavingsAccount[],
            selectedAccount: {} as SavingsAccount,
            selectedTransaction: {} as Transaction,

            genericErrorKey: 0,
            genericError: { name: ErrorHandlingService.ErrorKeys.DefaultKey, errors:[] } as ATBFError,
            domErrors: [] as ATBFError[],

            atBottomOfPage: false,

            booleans: {
                isLoggedIn: false,
                isTitleActive: false,
                isProfileActive: false,
                isAddMenuActive: false,
                isAddTransactionDisplayed: false,
                isLoginDisplayed: false,
                isAddTransferDisplayed: false,
                isAddAccountDisplayed: false,
                isSettingsDisplayed: false,
                isTransactionViewDisplayed: false
            }
        }
    },
    components: {
        TransactionComponent,
        LoginComponent,
        AddTransactionComponent,
        AddTransferComponent,
        TestComponent,
        AddAccountComponent,
        SettingsComponent,
        TransactionViewComponent,
        ErrorComponent
    },
    async created() {
        this.domErrors = [ this.genericError ]
        await this.UpdatePageState()
    },
    watch: {
        genericError() {
            this.genericErrorKey++
        },
        selectedAccount(oldAccount:SavingsAccount, newAccount:SavingsAccount) {
            if (oldAccount.id != newAccount.id){
                this.transactions = []
            }
        }
    },
    errorCaptured(err:any, instance:any, info:string) {
        if (err.message == "User session invalid" || err.message == 'Request failed with status code 401') {
            this.booleans.isLoginDisplayed = true
        }

        console.log("CAUGHT")

        this.genericError.errors = err.message
        this.genericErrorKey++

        return false
    },
    methods: {
        async GetUserTransactionsAsync(savingsAccountId:string) {
            try {
                const response = await SavingsAccountService.GetUserTransactions(savingsAccountId, this.transactions.length, 10)
                response.data.forEach(x => {
                    this.transactions.push(x)
                    this.SetTransactionDate(x)
                })
            } catch (error) {
                ErrorHandlingService.GetErrors(this.domErrors, error)
            }
        },

        async GetUpdatedTransactionsAsync(savingsAccountId:string) {
            try {
                const response = await SavingsAccountService.GetUserTransactions(savingsAccountId, 0, 15)
                for (let x = response.data.length - 1; x >= 0; x--){
                    let filter = this.transactions.filter(y => y.id === response.data[x].id)
                    if (filter.length < 1) {
                        this.SetTransactionDate(response.data[x])
                        this.transactions.unshift(response.data[x])
                    }
                }
            } catch (error) {
                ErrorHandlingService.GetErrors(this.domErrors, error)
            }
        },

        UpdateTransaction(newTransaction:Transaction) {
            let index = this.transactions.findIndex(x => x.id === newTransaction.id)
            this.SetTransactionDate(newTransaction)
            this.transactions[index] = newTransaction
        },

        async GetSavingsAccountsAsync() {
            try {
                let response = await SavingsAccountService.GetUserSavingsAccounts()
                this.savingsAccounts = response.data
            } catch (error) {
                ErrorHandlingService.GetErrors(this.domErrors, error)
            }
        },

        async GetUserAsync() {
            try {
                let response = await UserService.GetUser()
                this.user = response.data
                this.booleans.isLoggedIn = true
            } catch (error) {
                this.booleans.isLoginDisplayed = true
                this.booleans.isLoggedIn = false
                ErrorHandlingService.GetErrors(this.domErrors, error)
            }
        },

        async Logout() {
            try {
                await UserService.Logout()
                this.RemoveUserCookie()
                
                this.transactions = []
                this.savingsAccounts = []
                this.user = {} as User
                this.displaySavingsAccounts = []
                this.selectedAccount  = {} as SavingsAccount

                await this.UpdatePageState()
            } catch (error) {
                ErrorHandlingService.GetErrors(this.domErrors, error)
            }
        },

        async UpdatePageState() {
            await this.GetUserAsync()
            await this.GetSavingsAccountsAsync()

            const userCookie = this.$cookies.get(UserCookieName)
            if (userCookie != null) {
                const accountId = userCookie.savingsAccountId
                const account = this.savingsAccounts.find(x => x.id === accountId)
                
                if (account != undefined){
                    this.SetCurrentAccount(account)    

                } else {
                    if (this.savingsAccounts.length > 0) {
                        this.SetCurrentAccount(this.savingsAccounts[0])
                    }
                }
            } else {
                if (this.savingsAccounts.length > 0) {
                    this.SetCurrentAccount(this.savingsAccounts[0])
                }
            }
        },

        SetCurrentAccount(account:SavingsAccount) {
            this.displaySavingsAccounts = this.savingsAccounts.filter(x => x.id != account.id)
            this.GetUpdatedTransactionsAsync(account.id)
            this.selectedAccount = account

            this.RemoveUserCookie()
            this.SetUserCookie()
        },

        SetTransactionDate(transaction:Transaction) {
            if (typeof(transaction.date) == typeof("")) {
                if (transaction.date.toString()[transaction.date.toString().length - 1] != 'Z') {
                    transaction.date = new Date(transaction.date + 'Z')
                } else {
                    transaction.date = new Date(transaction.date)
                }
            }
        },

        SetUserCookie() {
            this.$cookies.set(UserCookieName, {'savingsAccountId' : this.selectedAccount.id})
        },

        RemoveUserCookie() {
            this.$cookies.remove(UserCookieName)
        },

        DisplayTransactionViewComponent(transaction:Transaction) {
            this.booleans.isTransactionViewDisplayed = true;
            this.selectedTransaction = transaction
        },

        CloseComponent(booleans:any, selectedBool:string) {
            try{
                booleans[selectedBool] = false
            }
            catch {}
        },

        Redirect(route:string){
            window.open(route)
        },

        onScroll(e:any){
            const clientHeight = e.target.clientHeight
            const scrollHeight = e.target.scrollHeight
            const scrollTop = e.target.scrollTop

            if (scrollTop + clientHeight >= scrollHeight) {
                this.GetUserTransactionsAsync(this.selectedAccount.id)
                this.atBottomOfPage = true
            } else {
                this.atBottomOfPage = false
            }
        },

        OnAddTransaction(response:{transaction:Transaction, savingsAccount:SavingsAccount}) {
            if (response == undefined) {
                return
            }

            this.SetTransactionDate(response.transaction)
            this.transactions.unshift(response.transaction)
            this.selectedAccount.balance = response.transaction.newBalance
            this.booleans.isAddTransactionDisplayed = false
        },

        OnAddTransfer(response:{transferOut:Transaction, transferIn:Transaction}) {
            if (response == undefined) {
                return
            }

            this.SetTransactionDate(response.transferOut)
            this.transactions.unshift(response.transferOut)
            this.selectedAccount.balance = response.transferOut.newBalance
            this.booleans.isAddTransferDisplayed = false
        },

        OnAddAccount(response:SavingsAccount) {
            if (response == undefined) {
                return
            }

            this.savingsAccounts.push(response)
            this.SetCurrentAccount(response)
            this.booleans.isAddAccountDisplayed = false
        },

        onAccountNameChange(response:SavingsAccount) {
            if (response == undefined) {
                return
            }

            let accountIndex = this.savingsAccounts.findIndex(x => x.id === response.id)
            this.savingsAccounts[accountIndex] = response
            if (this.selectedAccount.id == response.id) {
                this.selectedAccount = response
            }
            this.booleans.isSettingsDisplayed = false
        },

        OnLogin(response:User) {
            this.user = response
            this.UpdatePageState()
            this.booleans.isLoginDisplayed = false
        }
    },
})

</script>

<template>
    <div class="flex-container">
        <div class="flex-header">
            <img src="/atbfLogo.png" width="48">

            <div class="header-title">
                <div class="title-dropdown" @click="booleans.isTitleActive = !booleans.isTitleActive">
                    <h4>${{ selectedAccount.balance }}</h4>
                    <div class="title-dropdown-wrapper" v-click-outside="() => booleans.isTitleActive = false">
                        <div class="dropdown-button">
                            <h3> {{ selectedAccount.name }}</h3>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" width="30">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                        <div class="dropdown-content" :class="{'display-dropdown': booleans.isTitleActive}">
                            <h5 v-for="savingsAccount in displaySavingsAccounts" @click="SetCurrentAccount(savingsAccount)">{{ savingsAccount.name }}</h5>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="header-profile">
                <div class="profile-dropdown">
                    <div class="profile-dropdown-wrapper" v-if="booleans.isLoggedIn" v-click-outside="() => booleans.isProfileActive = false"
                         @click="booleans.isProfileActive = !booleans.isProfileActive">
                        <div class="dropdown-button">
                            <h5>{{ user.firstName }}</h5>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" width="20">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                        <div class="dropdown-content" :class="{'display-dropdown': booleans.isProfileActive}" id="profile-dropdown-content">
                            <h5 @click="booleans.isSettingsDisplayed = true">Settings</h5>
                            <h5 @click="Logout">Logout</h5>
                        </div>
                    </div>
                    <div v-else class="dropdown-button" @click="booleans.isLoginDisplayed = true">
                        <h5>Login</h5>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex-body" @scroll="onScroll">
            <TransactionComponent class="transaction" v-for="transaction in transactions" :key="transaction.id" :transaction="transaction" 
            @click="DisplayTransactionViewComponent(transaction)"/>

            <AddTransactionComponent v-if="booleans.isAddTransactionDisplayed" @onSubmit="response => OnAddTransaction(response)" 
            :account="selectedAccount" @isDisplayed="CloseComponent(booleans, 'isAddTransactionDisplayed')"/>

            <AddTransferComponent v-if="booleans.isAddTransferDisplayed" @isDisplayed="CloseComponent(booleans, 'isAddTransferDisplayed')"
            :account="selectedAccount" @onSubmit="response => OnAddTransfer(response)" :accounts="displaySavingsAccounts"/>

            <AddAccountComponent v-if="booleans.isAddAccountDisplayed" @isDisplayed="CloseComponent(booleans, 'isAddAccountDisplayed')"
            @onSubmit="response => OnAddAccount(response)"/>

            <SettingsComponent v-if="booleans.isSettingsDisplayed" :user="user" :accounts="savingsAccounts" @isDisplayed="CloseComponent(booleans, 'isSettingsDisplayed')"
            @onAccountNameChange="response => onAccountNameChange(response)"/>

            <LoginComponent v-if="booleans.isLoginDisplayed" @onSubmit="response => OnLogin(response)"/>

            <TransactionViewComponent v-if="booleans.isTransactionViewDisplayed" :transaction="selectedTransaction" 
            @isDisplayed="(data:Transaction) => {CloseComponent(booleans, 'isTransactionViewDisplayed'); if (data != undefined) { UpdateTransaction(data) }}"/>

            <ErrorComponent v-if="genericError.errors.length > 0" style="z-index: 2;" :errors="genericError" @isDisplayed="genericError.errors = []" :key="genericErrorKey"/>
        </div>

        <div class="button-add" v-click-outside="() => booleans.isAddMenuActive = false" @click="booleans.isAddMenuActive = !booleans.isAddMenuActive">
            <div class="dropdown-button">
                <div class="absolute-button-add">
                    <img src="../components/imgs/plus.png" width="48" style="display: block;">
                </div>
            </div>
            <div class="dropdown-content" id="add-menu" :class="{'display-dropdown': booleans.isAddMenuActive}">
                <h5 @click="booleans.isAddTransactionDisplayed = true">Transaction</h5>
                <h5 @click="booleans.isAddTransferDisplayed = true">Transfer</h5>
                <h5 @click="booleans.isAddAccountDisplayed = true">Account</h5>
            </div>
        </div>

        <div class="flex-footer">
            <p>Copyright © 2023 Riley Juniewic. All rights reserved.</p>
            <div class="footer-privacy">
                <h6>Privacy Policy</h6>
                <h6>Terms & Conditions</h6>
            </div>
            <div class="footer-social">
                <img src="../components/icons/linkedin.svg" width="32" class="img-button" @click="Redirect('https://www.linkedin.com/in/riley-juniewic-906a33197/')" 
                style="filter: opacity(.75);">
                <img src="../components/icons/github.svg" width="32" class="img-button" @click="Redirect('https://github.com/AmtrakBF')" 
                style="filter: opacity(.75); border-radius: 50px;">
            </div>
        </div>
    </div>    
</template>

<style>
.img-button:hover {
    cursor: pointer;
    background-image: linear-gradient(to right, var(--primary), var(--secondary));
}

.body-global {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background-color: var(--black25);
    height: 100%;
    width: 100%;

    z-index: 1;
}

.wrapper-global {
    width: 516px;
    background-color: white;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border-radius: 10px;
}
.container-global {
    background-image: linear-gradient(to right, var(--primary25), var(--secondary25));
    border: 1px solid var(--black100);

    color: var(--black100);
    border-radius: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.header-global {
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
}

.header-global img:hover {
    cursor: pointer;
}

.content-global {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
}
</style>

<style scoped>
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
}

.flex-container {
    display: flex;
    flex-direction: column;

    min-height: 100vh;
    max-height: 100vh;
    margin: 0px 176px;
}

.flex-header {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;

    padding: 20px 48px;

    border-bottom: 1px solid var(--black10);
}

.header-title {
    flex: 2;
}

.title-dropdown, .dropdown-button { 
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
}

.title-dropdown-wrapper, .profile-dropdown-wrapper {
    position: relative;

    border: 1px solid white;

    padding: 8px;

    display: flex;
    align-items: center;
    justify-content: center;
}

.profile-dropdown-wrapper {
    min-width: 136px;
}

.dropdown-button:hover {
    cursor: pointer;
}

.title-dropdown h4 {
    color: var(--primary);
    padding-right: 32px;
}

.dropdown-content {
    position: absolute;
    top: 4.05em;

    display: none;
    background-color: white;
    min-width: 100%;

    white-space:nowrap;

    border: 1px solid var(--black25);
    border-radius: 10px;
    text-align: center;
}

.display-dropdown {
    display: block;
}

#profile-dropdown-content {
    top: 3.5em;
}

.dropdown-content h5 {
    padding: 24px;
}

.dropdown-content h5:hover {
    background-color: var(--black25);
    border-radius: 10px;
    cursor: pointer;
}

.flex-header h5 {
    color: var(--black100);
}

.flex-body {
    margin: 0px 160px 16px 160px;
    overflow-y: auto;
    flex: 1;
}

.transaction:hover {
    cursor: pointer;
}

.flex-footer
{
    margin: 0px 160px;
    margin-top: auto;
    padding: 20.5px 32px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    border-top: 1px solid var(--black10);
}

.footer-privacy {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 290px;
}

.footer-social {
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    width: 80px;
}


.button-add {
    position: absolute;
    bottom: 126px;
    right: 214px;
    width: 150px;

    user-select: none;
}

.absolute-button-add {
    background-image: linear-gradient(to right, var(--primary), var(--secondary));

    width: 64px;
    height: 64px;

    margin: auto;

    border-radius: 50%;
    padding: 8px;
}

.absolute-button-add:hover {
    cursor: pointer;
}

#add-menu {
    top: -16em;
}

.displayAddTransactionComponent {
    display: block;
}
</style>

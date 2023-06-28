<script lang="ts">
import { defineComponent, toHandlers } from 'vue';
import type { Transaction } from '@/models/Transaction';
import SavingsAccountService from '@/services/SavingsAccountService';
import UserService from '@/services/UserService';
import type { User } from '@/models/User';
import type { SavingsAccount as SavingsAccount } from '@/models/SavingsAccount';
import TransactionComponent from '../components/TransactionComponent.vue'
import LoginComponent from '../components/LoginComponent.vue'
import AddTransactionComponent from '../components/AddTransactionComponent.vue'
import AddTransferComponent from '../components/AddTransferComponent.vue'
import TestComponent from '@/components/TestComponent.vue';
import AddAccountComponent from '@/components/AddAccountComponent.vue';
import SettingsComponent from '@/components/SettingsComponent.vue'

const UserCookieName = 'UserCookie'

export default defineComponent({

    data() {
        return {
            transactions: [] as Transaction[],
            user: {} as User,
            savingsAccounts: [] as SavingsAccount[],
            displaySavingsAccounts: [] as SavingsAccount[],
            selectedAccount: {} as SavingsAccount,

            isLoggedIn: false,
            isTitleActive: false,
            isProfileActive: false,
            isAddMenuActive: false,
            isAddTransactionCompActive: false,
            isLoginCompActive: false,
            isAddTransferCompActive: false,
            isAddAccountCompActive: false,
            isSettingsCompActive: false
        }
    },
    components: {
        TransactionComponent,
        LoginComponent,
        AddTransactionComponent,
        AddTransferComponent,
        TestComponent,
        AddAccountComponent,
        SettingsComponent
    },
    async created() {
        this.UpdatePageState()
    },
    methods: {
        async GetUserTransactionsAsync(savingsAccountId:string) {
            try {
                const response = await SavingsAccountService.GetUserTransactions(savingsAccountId)
                this.transactions = response.data
                this.SortDate()
            } catch (error) {
                console.log(error)
            }
        },

        async GetSavingsAccountsAsync() {
            try {
                let response = await SavingsAccountService.GetUserSavingsAccounts()
                this.savingsAccounts = response.data
            } catch (error) {
                console.log(error)
            }
        },

        async GetUserAsync() {
            try {
                let response = await UserService.GetUser()
                this.user = response.data
                this.isLoggedIn = true
            } catch (error) {
                this.isLoginCompActive = true
                this.isLoggedIn = false
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

                this.UpdatePageState()
            } catch (error) {
                console.log(error)
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
                }
            } else {
                if (this.savingsAccounts.length > 0) {
                    this.SetCurrentAccount(this.savingsAccounts[0])
                }
            }
        },

        SetCurrentAccount(account:SavingsAccount) {
            this.displaySavingsAccounts = this.savingsAccounts.filter(x => x.id != account.id)
            this.GetUserTransactionsAsync(account.id)
            this.selectedAccount = account

            this.RemoveUserCookie()
            this.SetUserCookie()
        },

        SetUserCookie() {
            this.$cookies.set(UserCookieName, {'savingsAccountId' : this.selectedAccount.id})
        },

        RemoveUserCookie() {
            this.$cookies.remove(UserCookieName)
        },

        SortDate() {
            this.transactions.forEach(transaction => {
                let date = transaction.date + 'Z'
                transaction.date = new Date(date);
            });
            this.transactions.sort((a, b) => b.date.getTime() - a.date.getTime())
        },

        CloseTransactionComponent() {
            this.isAddTransactionCompActive = false
            this.UpdatePageState()
        },
        
        CloseTransferComponent() {
            this.isAddTransferCompActive = false
            this.UpdatePageState()
        },

        CloseLoginComponent() {
            this.isLoginCompActive = false
            this.UpdatePageState()
        },

        CloseNewAccountComponent() {
            this.isAddAccountCompActive = false
            this.UpdatePageState()
        },

        CloseSettingsComponent() {
            this.isSettingsCompActive = false
            this.UpdatePageState()
        }
    },
})

</script>

<template>
    <div class="flex-container">
        <div class="flex-header">
            <img src="/atbfLogo.png" width="48">

            <div class="header-title">
                <div class="title-dropdown" @click="isTitleActive = !isTitleActive">
                    <h4>${{ selectedAccount.balance }}</h4>
                    <div class="title-dropdown-wrapper" v-click-outside="() => isTitleActive = false">
                        <div class="dropdown-button">
                            <h3> {{ selectedAccount.name }}</h3>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" width="30">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                        <div class="dropdown-content" :class="{'display-dropdown': isTitleActive}">
                            <h5 v-for="savingsAccount in displaySavingsAccounts" @click="SetCurrentAccount(savingsAccount)">{{ savingsAccount.name }}</h5>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="header-profile">
                <div class="profile-dropdown">
                    <div class="profile-dropdown-wrapper" v-if="isLoggedIn" v-click-outside="() => isProfileActive = false" @click="isProfileActive = !isProfileActive">
                        <div class="dropdown-button">
                            <h5>{{ user.firstName }}</h5>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" width="20">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </div>
                        <div class="dropdown-content" :class="{'display-dropdown': isProfileActive}" id="profile-dropdown-content">
                            <h5 @click="isSettingsCompActive = true">Settings</h5>
                            <h5 @click="Logout">Logout</h5>
                        </div>
                    </div>
                    <div v-else class="dropdown-button" @click="isLoginCompActive = true">
                        <h5>Login</h5>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex-body">
            <TransactionComponent class="transaction" v-for="transaction in transactions" :key="transaction.id" :transaction="transaction" @click="console.log('PENcil')"/>
            <AddTransactionComponent v-if="isAddTransactionCompActive" @isDisplayed="CloseTransactionComponent" :account="selectedAccount"/>
            <AddTransferComponent v-if="isAddTransferCompActive" @isDisplayed="CloseTransferComponent" :account="selectedAccount" :accounts="displaySavingsAccounts"/>
            <AddAccountComponent v-if="isAddAccountCompActive" @isDisplayed="CloseNewAccountComponent"/>
            <SettingsComponent v-if="isSettingsCompActive" :user="user" @isDisplayed="CloseSettingsComponent"/>
            <LoginComponent v-if="isLoginCompActive" @isDisplayed="CloseLoginComponent" @getUser="(x) => user = x"/>
        </div>

        <div class="button-add" v-click-outside="() => isAddMenuActive = false" @click="isAddMenuActive = !isAddMenuActive">
            <div class="dropdown-button">
                <div class="absolute-button-add">
                    <img src="../components/imgs/plus.png" width="48" style="display: block;">
                </div>
            </div>
            <div class="dropdown-content" id="add-menu" :class="{'display-dropdown': isAddMenuActive}">
                <h5 @click="isAddAccountCompActive = true">Account</h5>
                <h5 @click="isAddTransferCompActive = true">Transfer</h5>
                <h5 @click="isAddTransactionCompActive = true">Transaction</h5>
            </div>
        </div>

        <div class="flex-footer">
            <p>Copyright © 2023 Riley Juniewic. All rights reserved.</p>
            <div class="footer-privacy">
                <h6>Privacy Policy</h6>
                <h6>Terms & Conditions</h6>
            </div>
            <div class="footer-social">
                <img src="../components/icons/linkedin.svg" width="32" style="filter: opacity(.75);">
                <img src="../components/icons/github.svg" width="32" style="filter: opacity(.75);">
            </div>
        </div>
    </div>    
</template>

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

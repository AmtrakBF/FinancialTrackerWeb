import type { Transaction } from "@/models/Transaction"
import axios from '@/axios/axios'
import type { SavingsAccount } from "@/models/SavingsAccount"
import type { TransactionResponse } from "@/contracts/TransactionResponse"

export default(
    {
        GetUserTransactions(savingsAccountId:string, dbOffset:number, dbRowLimit:number){
            return axios.get<Transaction[]>('SavingsAccount/Transactions', { 
                params: { accountId: savingsAccountId, dbOffset, dbRowLimit }, 
                withCredentials: true 
            })
        },

        GetUserSavingsAccounts() {
            return axios.get<SavingsAccount[]>('SavingsAccount/Accounts', {withCredentials:true})
        },

        PostTransaction(accountId:string, type:number, amount:number, description:string, date:Date){
            return axios.post<TransactionResponse>('SavingsAccount/NewTransaction', 
                { accountId, date, type, description, amount},
                { withCredentials: true }
            )
        },

        PostTransfer(accountId:string, receiverAccountId:string, transferAmount:number, description:string, date:Date){
            return axios.post<TransactionResponse>('SavingsAccount/Transfer', 
                { accountId, date, receiverAccountId, transferAmount, description},
                { withCredentials: true }
            )
        },

        PostAccount(accountName:string, initialBalance:number) {
            return axios.post<SavingsAccount>('SavingsAccount/OpenAccount', 
                { accountName, initialBalance},{ withCredentials: true })
        },

        PatchSavingsAccountName(accountId:string, name:string) {
            return axios.patch('SavingsAccount/ChangeName', { accountId, name }, { withCredentials: true })
        },

        DeleteAccount(accountId:string, email:string, password:string) {
            return axios.post('SavingsAccount/CloseAccount', { accountId, loginRequest: { email, password }}, { withCredentials: true })
        },

        DeleteTransaction(savingsAccountId:string, transactionId:string) {
            return axios.post('SavingsAccount/DeleteTransaction', { savingsAccountId, transactionId }, { withCredentials: true })
        },

        PutTransaction(accountId:string, transactionId:string, date:Date, description:string) {
            return axios.put('SavingsAccount/EditTransaction', 
            { accountId, transactionId, date, description}, { withCredentials: true })
        }
    }
)
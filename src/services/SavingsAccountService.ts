import type { Transaction } from "@/models/Transaction"
import axios from '@/axios/axios'
import type { SavingsAccount } from "@/models/SavingsAccount"
import type { TransactionResponse } from "@/contracts/TransactionResponse"

export default(
    {
        GetUserTransactions(savingsAccountId:string){
            return axios.get<Transaction[]>('SavingsAccount/Transactions', { 
                params: { accountId: savingsAccountId }, 
                withCredentials: true 
            })
        },

        GetUserSavingsAccounts() {
            return axios.get<SavingsAccount[]>('SavingsAccount/Accounts', {withCredentials:true})
        },

        PostTransaction(accountId:string, type:number, amount:string, description:string){
            return axios.post<TransactionResponse>('SavingsAccount/NewTransaction', 
                { accountId, type, description, amount },
                { withCredentials: true }
            )
        },

        PostTransfer(accountId:string, receiverAccountId:string, transferAmount:string, description:string){
            return axios.post<TransactionResponse>('SavingsAccount/Transfer', 
                { accountId, receiverAccountId, transferAmount, description},
                { withCredentials: true }
            )
        },

        PostAccount(accountName:string, initialBalance:string) {
            return axios.post<SavingsAccount>('SavingsAccount/OpenAccount', 
                { accountName, initialBalance},{ withCredentials: true })
        },

        PatchSavingsAccountName(accountId:string, name:string) {
            return axios.patch('SavingsAccount/ChangeName', { accountId, name }, { withCredentials: true })
        },

        DeleteAccount(accountId:string, email:string, password:string) {
            return axios.post('SavingsAccount/CloseAccount', { accountId, loginRequest: { email, password }}, { withCredentials: true })
        }
    }
)
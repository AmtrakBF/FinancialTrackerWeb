import type { SavingsAccount } from "@/models/SavingsAccount";
import type { Transaction } from "@/models/Transaction";

export class TransactionResponse {
    Transaction: Transaction
    SavingsAccount: SavingsAccount
    
    constructor(transaction:Transaction, savingsAccount:SavingsAccount) {
        this.Transaction = transaction,
        this.SavingsAccount = savingsAccount
    }
}
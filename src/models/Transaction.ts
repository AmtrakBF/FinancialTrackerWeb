export interface Transaction {
    id: string,
    savingsAccountId: string,
    transactionType: string,
    description: string,
    amount: string,
    newBalance: string,
    date: Date
}
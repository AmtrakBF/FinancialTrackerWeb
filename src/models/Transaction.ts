export interface Transaction {
    id: string,
    savingsAccountId: string,
    transactionType: string,
    description: string,
    amount: number,
    newBalance: number,
    date: Date
}
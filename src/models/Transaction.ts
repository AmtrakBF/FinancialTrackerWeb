export enum TransactionType {
    Deposit,
    Withdrawal,
    Transfer
}

export interface Transaction {
    Id: string,
    SavingsAccountId: string,
    TransactionType: TransactionType,
    Description: string,
    Amount: string,
    Date: Date
}
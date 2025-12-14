export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: string;
}

export interface TransactionSummary {
  balance: number;
  income: number;
  expense: number;
}

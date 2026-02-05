import { TransactionType } from "../interfaces/enums/transaction-type";
import { Transaction } from "../interfaces/transaction";

export function sumTransactions(transactions: Transaction[], type: TransactionType): number {
  return transactions
    .filter((item) => item.type === type)
    .reduce((total, item) => total + item.value, 0);
} 
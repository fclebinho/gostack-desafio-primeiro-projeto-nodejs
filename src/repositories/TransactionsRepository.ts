import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    if (this.transactions.length <= 0) {
      return { income: 0, outcome: 0, total: 0 };
    }

    const sum = this.transactions
      .map(transaction => {
        const income = transaction.type === 'income' ? transaction.value : 0;
        const outcome = transaction.type === 'outcome' ? transaction.value : 0;

        return { income, outcome };
      })
      .reduce((total, item) => ({
        income: total.income + item.income,
        outcome: total.outcome + item.outcome,
      }));

    return { ...sum, total: sum.income - sum.outcome };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;

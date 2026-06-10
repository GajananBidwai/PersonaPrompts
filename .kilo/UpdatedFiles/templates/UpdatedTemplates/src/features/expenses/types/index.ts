export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
}

export interface ExpenseFormData {
  amount: string;
  category: string;
  date: string;
}

export interface ExpenseSummary {
  category: string;
  total: number;
}
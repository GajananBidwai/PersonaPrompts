import { Expense } from '../types';

export const storage = {
  getExpenses: (): Expense[] => {
    const data = localStorage.getItem('expenses');
    return data ? JSON.parse(data) : [];
  },
  saveExpenses: (expenses: Expense[]): void => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }
};
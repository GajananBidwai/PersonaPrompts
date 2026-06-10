import { storage } from '../storage';
import { Expense } from '../types';

export const expenseService = {
  getAll: (): Expense[] => storage.getExpenses(),
  add: (expense: Omit<Expense, 'id'>): Expense => {
    const expenses = storage.getExpenses();
    const newExpense: Expense = { ...expense, id: `exp_${Date.now()}` };
    storage.saveExpenses([...expenses, newExpense]);
    return newExpense;
  },
  update: (id: string, data: Partial<Omit<Expense, 'id'>>): Expense | null => {
    const expenses = storage.getExpenses();
    const index = expenses.findIndex(e => e.id === id);
    if (index === -1) return null;
    const updated = { ...expenses[index], ...data };
    expenses[index] = updated;
    storage.saveExpenses(expenses);
    return updated;
  },
  delete: (id: string): void => {
    const expenses = storage.getExpenses();
    storage.saveExpenses(expenses.filter(e => e.id !== id));
  }
};
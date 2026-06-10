import { useState, useCallback, useMemo } from 'react';
import { expenseService } from '../services';
import { Expense, ExpenseFormData, ExpenseSummary } from '../types';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>(() => expenseService.getAll());

  const addExpense = useCallback((data: ExpenseFormData) => {
    const newExpense = expenseService.add({
      amount: parseFloat(data.amount),
      category: data.category,
      date: data.date
    });
    setExpenses(prev => [...prev, newExpense]);
  }, []);

  const updateExpense = useCallback((id: string, data: Partial<Omit<Expense, 'id'>>) => {
    const updated = expenseService.update(id, data);
    if (updated) setExpenses(prev => prev.map(e => e.id === id ? updated : e));
  }, []);

  const deleteExpense = useCallback((id: string) => {
    expenseService.delete(id);
    setExpenses(prev => prev.filter(e => e.id !== id));
  }, []);

  const monthlySummary = useMemo((): ExpenseSummary[] => {
    const totals: Record<string, number> = {};
    expenses.forEach(e => {
      totals[e.category] = (totals[e.category] || 0) + e.amount;
    });
    return Object.entries(totals).map(([category, total]) => ({ category, total }));
  }, [expenses]);

  return { expenses, addExpense, updateExpense, deleteExpense, monthlySummary };
};
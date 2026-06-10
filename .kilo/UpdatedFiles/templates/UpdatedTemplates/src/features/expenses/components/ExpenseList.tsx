import { useState } from 'react';
import { Expense, ExpenseFormData } from '../types';
import { ExpenseForm } from './ExpenseForm';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: Partial<Omit<Expense, 'id'>>) => void;
}

export const ExpenseList = ({ expenses, onDelete, onUpdate }: ExpenseListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  if (expenses.length === 0) {
    return <div className="text-center p-4">No expenses logged yet. Add your first expense above!</div>;
  }

  const handleEdit = (expense: Expense) => {
    setEditingId(expense.id);
  };

  const handleUpdate = (data: ExpenseFormData) => {
    if (editingId) {
      onUpdate(editingId, {
        amount: parseFloat(data.amount),
        category: data.category,
        date: data.date
      });
      setEditingId(null);
    }
  };

  return (
    <div className="space-y-2">
      {expenses.map(e => (
        <div key={e.id} className="border p-3">
          {editingId === e.id ? (
            <ExpenseForm 
              onSubmit={handleUpdate} 
              initialValues={{ amount: e.amount.toString(), category: e.category, date: e.date }}
              submitLabel="Update Expense"
            />
          ) : (
            <div className="flex justify-between items-center">
              <div>
                <span className="font-bold">{e.category}</span>
                <span className="ml-4">${e.amount.toFixed(2)}</span>
                <span className="ml-4 text-gray-500">{e.date}</span>
              </div>
              <div>
                <button onClick={() => handleEdit(e)} className="text-blue-500 mr-2">Edit</button>
                <button onClick={() => onDelete(e.id)} className="text-red-500">Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
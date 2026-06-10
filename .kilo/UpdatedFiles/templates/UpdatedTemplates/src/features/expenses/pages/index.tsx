import { useExpenses } from '../hooks/useExpenses';
import { ExpenseForm } from '../components/ExpenseForm';
import { ExpenseList } from '../components/ExpenseList';
import { ExpenseChart } from '../charts/ExpenseChart';
import { ExportButton } from '../components/ExportButton';

export const ExpensesPage = () => {
  const { expenses, addExpense, updateExpense, deleteExpense, monthlySummary } = useExpenses();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>
      <ExpenseForm onSubmit={addExpense} />
      <div className="mt-8">
        <ExpenseChart data={monthlySummary} />
      </div>
      <div className="mt-4">
        <ExpenseList expenses={expenses} onUpdate={updateExpense} onDelete={deleteExpense} />
      </div>
      <div className="mt-4">
        <ExportButton expenses={expenses} />
      </div>
    </div>
  );
};
import { Expense } from '../types';

interface ExportButtonProps {
  expenses: Expense[];
}

export const ExportButton = ({ expenses }: ExportButtonProps) => {
  const exportToCSV = () => {
    const headers = 'ID,Amount,Category,Date';
    const rows = expenses.map(e => {
      const sanitizedCategory = e.category.replace(/^[=+\-@]/, "'");
      return `${e.id},${e.amount},${sanitizedCategory},${e.date}`;
    }).join('\n');
    const csvContent = `${headers}\n${rows}`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses_export.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={exportToCSV} className="bg-green-500 text-white p-2">Export to CSV</button>
  );
};
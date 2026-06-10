import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ExpenseSummary } from '../types';

interface ExpenseChartProps {
  data: ExpenseSummary[];
}

export const ExpenseChart = ({ data }: ExpenseChartProps) => {
  if (data.length === 0) {
    return <div className="text-center p-8">No expenses logged yet. Add your first expense above!</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};
import { render, screen, fireEvent } from '@testing-library/react';
import { ExpenseForm } from './ExpenseForm';
import { ExpenseList } from './ExpenseList';
import { ExpenseChart } from '../charts/ExpenseChart';

describe('ExpenseForm', () => {
  it('submits valid expense data', () => {
    const mockSubmit = jest.fn();
    render(<ExpenseForm onSubmit={mockSubmit} />);
    fireEvent.change(screen.getByPlaceholderText('Amount'), { target: { value: '50' } });
    fireEvent.change(screen.getByPlaceholderText('Category'), { target: { value: 'Meals' } });
    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2026-06-10' } });
    fireEvent.click(screen.getByText('Add Expense'));
    expect(mockSubmit).toHaveBeenCalledWith({ amount: '50', category: 'Meals', date: '2026-06-10' });
  });
});

describe('ExpenseList', () => {
  it('renders empty state', () => {
    render(<ExpenseList expenses={[]} onUpdate={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByText(/No expenses logged yet/)).toBeInTheDocument();
  });
});

describe('ExpenseChart', () => {
  it('renders empty state when no data', () => {
    render(<ExpenseChart data={[]} />);
    expect(screen.getByText(/No expenses logged yet/)).toBeInTheDocument();
  });
});
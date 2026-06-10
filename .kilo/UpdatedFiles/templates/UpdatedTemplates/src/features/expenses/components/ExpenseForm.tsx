import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ExpenseFormData } from '../types';

interface ExpenseFormProps {
  onSubmit: (data: ExpenseFormData) => void;
  initialValues?: ExpenseFormData;
  submitLabel?: string;
}

const validationSchema = Yup.object({
  amount: Yup.number().positive('Must be positive').max(999999.99, 'Max $999,999.99').required('Required'),
  category: Yup.string().required('Required'),
  date: Yup.string().required('Required')
});

export const ExpenseForm = ({ onSubmit, initialValues, submitLabel = 'Add Expense' }: ExpenseFormProps) => {
  const formik = useFormik<ExpenseFormData>({
    initialValues: initialValues || { amount: '', category: '', date: '' },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      if (!initialValues) resetForm();
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={formik.values.amount}
        onChange={formik.handleChange}
        className={`border p-2 w-full ${formik.errors.amount ? 'border-red-500' : ''}`}
      />
      <input
        name="category"
        placeholder="Category"
        value={formik.values.category}
        onChange={formik.handleChange}
        className={`border p-2 w-full ${formik.errors.category ? 'border-red-500' : ''}`}
      />
      <input
        name="date"
        type="date"
        value={formik.values.date}
        onChange={formik.handleChange}
        className={`border p-2 w-full ${formik.errors.date ? 'border-red-500' : ''}`}
      />
      <button type="submit" className="bg-blue-500 text-white p-2 w-full">{submitLabel}</button>
    </form>
  );
};
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '../modules/dashboard/Dashboard';
import { TravelRequestList } from '../modules/travel-request/TravelRequestList';
import { TravelRequestForm } from '../modules/travel-request/TravelRequestForm';
import { ApprovalList } from '../modules/approval/ApprovalList';
import { ExpenseClaimList } from '../modules/expense/ExpenseClaimList';
import { ExpenseClaimForm } from '../modules/expense/ExpenseClaimForm';
import { ReimbursementList } from '../modules/reimbursement/ReimbursementList';
import { Reports } from '../modules/reports/Reports';
import { EmployeeProfile } from '../modules/employee/EmployeeProfile';
import { Login } from '../modules/employee/Login';
import { Layout } from '../components/layout/Layout';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/travel-requests" element={<TravelRequestList />} />
        <Route path="/travel-requests/new" element={<TravelRequestForm />} />
        <Route path="/travel-requests/:id" element={<TravelRequestForm />} />
        <Route path="/approvals" element={<ApprovalList />} />
        <Route path="/expenses" element={<ExpenseClaimList />} />
        <Route path="/expenses/new" element={<ExpenseClaimForm />} />
        <Route path="/expenses/:id" element={<ExpenseClaimForm />} />
        <Route path="/reimbursements" element={<ReimbursementList />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/profile" element={<EmployeeProfile />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

import React, { useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip, Button, TextField, InputAdornment,
  IconButton
} from '@mui/material';
import { Add, Search, Edit, Visibility, FilterList, ReceiptLong } from '@mui/icons-material';

const mockExpenses = [
  { id: 'EXP-001', travelRequest: 'TR-001', category: 'Accommodation', amount: 450, date: '2024-01-16', status: 'Approved', hasReceipt: true },
  { id: 'EXP-002', travelRequest: 'TR-001', category: 'Meals', amount: 120, date: '2024-01-17', status: 'Approved', hasReceipt: true },
  { id: 'EXP-003', travelRequest: 'TR-001', category: 'Transport', amount: 85, date: '2024-01-18', status: 'Pending', hasReceipt: true },
  { id: 'EXP-004', travelRequest: 'TR-002', category: 'Flight', amount: 1200, date: '2024-02-10', status: 'Pending', hasReceipt: true },
  { id: 'EXP-005', travelRequest: 'TR-002', category: 'Accommodation', amount: 600, date: '2024-02-11', status: 'Draft', hasReceipt: false },
];

const statusColors: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  'Approved': 'success',
  'Pending': 'warning',
  'Draft': 'info',
  'Rejected': 'error',
};

const categoryColors: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  'Flight': 'primary',
  'Accommodation': 'secondary',
  'Meals': 'success',
  'Transport': 'info',
  'Other': 'default',
};

export const ExpenseClaimList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredExpenses = mockExpenses.filter(expense =>
    expense.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.travelRequest.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Expense Claims
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Submit and track your expense claims
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} href="/expenses/new">
          New Expense Claim
        </Button>
      </Box>

      <Paper elevation={2}>
        <Box p={2} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField
              placeholder="Search expense claims..."
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 300 }}
            />
            <Button variant="outlined" startIcon={<FilterList />}>
              Filters
            </Button>
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Claim ID</TableCell>
                <TableCell>Travel Request</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Receipt</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredExpenses.map((expense) => (
                <TableRow key={expense.id} hover>
                  <TableCell>{expense.id}</TableCell>
                  <TableCell>{expense.travelRequest}</TableCell>
                  <TableCell>
                    <Chip label={expense.category} size="small" color={categoryColors[expense.category] || 'default'} variant="outlined" />
                  </TableCell>
                  <TableCell>${expense.amount.toLocaleString()}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>
                    {expense.hasReceipt ? (
                      <ReceiptLong color="success" fontSize="small" />
                    ) : (
                      <ReceiptLong color="error" fontSize="small" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip label={expense.status} size="small" color={statusColors[expense.status] || 'default'} />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" aria-label="view">
                      <Visibility />
                    </IconButton>
                    <IconButton size="small" aria-label="edit" href={`/expenses/${expense.id}`}>
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredExpenses.length === 0 && (
          <Box p={4} textAlign="center">
            <Typography variant="body1" color="text.secondary">
              No expense claims found. Create your first claim!
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

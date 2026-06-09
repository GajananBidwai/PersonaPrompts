import React, { useState } from 'react';
import {
  Box, Typography, Paper, Card, CardContent, Grid, Button,
  TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem,
  LocalizationProvider, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, IconButton, Tabs, Tab, Divider
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Search, FilterList, Download, Visibility, TrendingUp } from '@mui/icons-material';

const mockTravelReports = [
  { id: 'TR-001', employee: 'John Smith', destination: 'New York, USA', startDate: '2024-01-15', endDate: '2024-01-18', status: 'Completed', totalExpenses: 655 },
  { id: 'TR-002', employee: 'Sarah Johnson', destination: 'London, UK', startDate: '2024-02-10', endDate: '2024-02-14', status: 'Completed', totalExpenses: 1800 },
  { id: 'TR-003', employee: 'Mike Wilson', destination: 'Tokyo, Japan', startDate: '2024-03-01', endDate: '2024-03-05', status: 'In Progress', totalExpenses: 0 },
];

const mockExpenseReports = [
  { id: 'EXP-001', employee: 'John Smith', category: 'Accommodation', amount: 450, date: '2024-01-16', status: 'Approved' },
  { id: 'EXP-002', employee: 'John Smith', category: 'Meals', amount: 120, date: '2024-01-17', status: 'Approved' },
  { id: 'EXP-003', employee: 'Sarah Johnson', category: 'Flight', amount: 1200, date: '2024-02-10', status: 'Pending' },
];

const statusColors: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  'Completed': 'success',
  'In Progress': 'info',
  'Pending': 'warning',
  'Approved': 'success',
  'Pending Review': 'warning',
  'Rejected': 'error',
};

export const Reports: React.FC = () => {
  const [tab, setTab] = useState(0);
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Reports & Analytics
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Generate and export travel and expense reports
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<Download />}>
            Export PDF
          </Button>
          <Button variant="contained" startIcon={<Download />}>
            Export Excel
          </Button>
        </Box>
      </Box>

      <Paper elevation={2} sx={{ mb: 3, p: 2 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              value={dateRange.start}
              onChange={(value) => setDateRange(prev => ({ ...prev, start: value }))}
              slotProps={{ textField: { size: 'small' } }}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="End Date"
              value={dateRange.end}
              onChange={(value) => setDateRange(prev => ({ ...prev, end: value }))}
              slotProps={{ textField: { size: 'small' } }}
            />
          </LocalizationProvider>
          <TextField
            placeholder="Search..."
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 250 }}
          />
          <Button variant="outlined" startIcon={<FilterList />}>
            Advanced Filters
          </Button>
        </Box>
      </Paper>

      <Tabs value={tab} onChange={(_, value) => setTab(value)} variant="fullWidth" sx={{ mb: 2 }}>
        <Tab label="Travel Report" icon={<TrendingUp />} />
        <Tab label="Expense Report" icon={<TrendingUp />} />
        <Tab label="Reimbursement Report" icon={<TrendingUp />} />
      </Tabs>

      <Paper elevation={2}>
        {tab === 0 && (
          <Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Request ID</TableCell>
                    <TableCell>Employee</TableCell>
                    <TableCell>Destination</TableCell>
                    <TableCell>Dates</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Total Expenses</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockTravelReports.map((report) => (
                    <TableRow key={report.id} hover>
                      <TableCell>{report.id}</TableCell>
                      <TableCell>{report.employee}</TableCell>
                      <TableCell>{report.destination}</TableCell>
                      <TableCell>{report.startDate} - {report.endDate}</TableCell>
                      <TableCell>
                        <Chip label={report.status} size="small" color={statusColors[report.status] || 'default'} />
                      </TableCell>
                      <TableCell>${report.totalExpenses.toLocaleString()}</TableCell>
                      <TableCell align="right">
                        <IconButton size="small" aria-label="view">
                          <Visibility />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {tab === 1 && (
          <Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Claim ID</TableCell>
                    <TableCell>Employee</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockExpenseReports.map((report) => (
                    <TableRow key={report.id} hover>
                      <TableCell>{report.id}</TableCell>
                      <TableCell>{report.employee}</TableCell>
                      <TableCell>{report.category}</TableCell>
                      <TableCell>${report.amount.toLocaleString()}</TableCell>
                      <TableCell>{report.date}</TableCell>
                      <TableCell>
                        <Chip label={report.status} size="small" color={statusColors[report.status] || 'default'} />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small" aria-label="view">
                          <Visibility />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {tab === 2 && (
          <Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Reimbursement ID</TableCell>
                    <TableCell>Employee</TableCell>
                    <TableCell>Travel Request</TableCell>
                    <TableCell>Total Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Payment Date</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockTravelReports.map((report) => (
                    <TableRow key={report.id} hover>
                      <TableCell>REIMB-{report.id.split('-')[1]}</TableCell>
                      <TableCell>{report.employee}</TableCell>
                      <TableCell>{report.id}</TableCell>
                      <TableCell>${report.totalExpenses.toLocaleString()}</TableCell>
                      <TableCell>
                        <Chip label={report.status === 'Completed' ? 'Paid' : 'Pending'} size="small" color={report.status === 'Completed' ? 'success' : 'warning'} />
                      </TableCell>
                      <TableCell>{report.status === 'Completed' ? '2024-01-25' : '-'}</TableCell>
                      <TableCell align="right">
                        <IconButton size="small" aria-label="view">
                          <Visibility />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

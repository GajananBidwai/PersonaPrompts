import React, { useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip, Button, TextField, InputAdornment,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { Search, FilterList, Visibility, AccountBalance, AttachMoney, Download } from '@mui/icons-material';

const mockReimbursements = [
  { id: 'REIMB-001', employee: 'John Smith', travelRequest: 'TR-001', totalAmount: 655, status: 'Paid', paymentDate: '2024-01-25', processedBy: 'Finance Team' },
  { id: 'REIMB-002', employee: 'Sarah Johnson', travelRequest: 'TR-002', totalAmount: 1800, status: 'Processing', paymentDate: '-', processedBy: 'Finance Team' },
  { id: 'REIMB-003', employee: 'Mike Wilson', travelRequest: 'TR-003', totalAmount: 4100, status: 'Pending Review', paymentDate: '-', processedBy: '-' },
  { id: 'REIMB-004', employee: 'Emily Davis', travelRequest: 'TR-004', totalAmount: 2200, status: 'Paid', paymentDate: '2024-01-20', processedBy: 'Finance Team' },
];

const statusColors: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  'Paid': 'success',
  'Processing': 'info',
  'Pending Review': 'warning',
  'Rejected': 'error',
};

export const ReimbursementList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReimbursement, setSelectedReimbursement] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [status, setStatus] = useState('');

  const filteredReimbursements = mockReimbursements.filter(reimb =>
    reimb.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reimb.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reimb.travelRequest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (reimb: any) => {
    setSelectedReimbursement(reimb);
    setDialogOpen(true);
  };

  const handleStatusChange = (reimb: any) => {
    setSelectedReimbursement(reimb);
    setStatus(reimb.status);
    setDialogOpen(true);
  };

  const handleConfirmStatus = () => {
    // Simulate API call
    console.log(`Update status for ${selectedReimbursement?.id} to ${status}`);
    setDialogOpen(false);
    setSelectedReimbursement(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Reimbursements
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track and manage reimbursement processing
          </Typography>
        </Box>
      </Box>

      <Paper elevation={2}>
        <Box p={2} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField
              placeholder="Search reimbursements..."
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
            <Button variant="contained" startIcon={<Download />}>
              Export Report
            </Button>
          </Box>
        </Box>

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
                <TableCell>Processed By</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReimbursements.map((reimb) => (
                <TableRow key={reimb.id} hover>
                  <TableCell>{reimb.id}</TableCell>
                  <TableCell>{reimb.employee}</TableCell>
                  <TableCell>{reimb.travelRequest}</TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      <AttachMoney fontSize="small" /> ${reimb.totalAmount.toLocaleString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={reimb.status} size="small" color={statusColors[reimb.status] || 'default'} />
                  </TableCell>
                  <TableCell>{reimb.paymentDate}</TableCell>
                  <TableCell>{reimb.processedBy}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" aria-label="view" onClick={() => handleViewDetails(reimb)}>
                      <Visibility />
                    </IconButton>
                    <Button size="small" variant="outlined" onClick={() => handleStatusChange(reimb)}>
                      Update Status
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredReimbursements.length === 0 && (
          <Box p={4} textAlign="center">
            <Typography variant="body1" color="text.secondary">
              No reimbursements found.
            </Typography>
          </Box>
        )}
      </Paper>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Reimbursement Details</DialogTitle>
        <DialogContent>
          {selectedReimbursement && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 300 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">Reimbursement ID:</Typography>
                <Typography variant="body1">{selectedReimbursement.id}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Employee:</Typography>
                <Typography variant="body1">{selectedReimbursement.employee}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Travel Request:</Typography>
                <Typography variant="body1">{selectedReimbursement.travelRequest}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Total Amount:</Typography>
                <Typography variant="h6">${selectedReimbursement.totalAmount.toLocaleString()}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Current Status:</Typography>
                <Chip label={selectedReimbursement.status} color={statusColors[selectedReimbursement.status as keyof typeof statusColors] || 'default'} />
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Payment Date:</Typography>
                <Typography variant="body1">{selectedReimbursement.paymentDate}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Processed By:</Typography>
                <Typography variant="body1">{selectedReimbursement.processedBy}</Typography>
              </Box>
              <Divider />
              <FormControl fullWidth>
                <InputLabel id="status-label">Update Status</InputLabel>
                <Select
                  labelId="status-label"
                  value={status}
                  label="Update Status"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value="Pending Review">Pending Review</MenuItem>
                  <MenuItem value="Processing">Processing</MenuItem>
                  <MenuItem value="Paid">Paid</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleConfirmStatus}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// Missing imports
import { Divider } from '@mui/material';

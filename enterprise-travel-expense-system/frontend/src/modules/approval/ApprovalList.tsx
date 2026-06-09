import React, { useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip, Button, TextField, InputAdornment,
  Dialog, DialogTitle, DialogContent, DialogActions, FormControl,
  InputLabel, Select, MenuItem, TextareaAutosize, IconButton
} from '@mui/material';
import { Search, FilterList, Visibility, Done, Close } from '@mui/icons-material';

const mockApprovals = [
  { id: 'TR-002', employee: 'John Smith', department: 'Engineering', destination: 'London, UK', purpose: 'Conference', startDate: '2024-02-10', endDate: '2024-02-14', estimatedBudget: 3200, status: 'Pending', submittedDate: '2024-01-15' },
  { id: 'TR-005', employee: 'Sarah Johnson', department: 'Marketing', destination: 'San Francisco, USA', purpose: 'Client Meeting', startDate: '2024-02-20', endDate: '2024-02-22', estimatedBudget: 1800, status: 'Pending', submittedDate: '2024-01-18' },
  { id: 'TR-006', employee: 'Mike Wilson', department: 'Sales', destination: 'Chicago, USA', purpose: 'Training', startDate: '2024-03-01', endDate: '2024-03-03', estimatedBudget: 1200, status: 'Pending', submittedDate: '2024-01-20' },
];

const statusColors: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  'Pending': 'warning',
  'Approved': 'success',
  'Rejected': 'error',
};

export const ApprovalList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [action, setAction] = useState<'approve' | 'reject'>('approve');
  const [comments, setComments] = useState('');

  const filteredApprovals = mockApprovals.filter(request =>
    request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApproveClick = (request: any) => {
    setSelectedRequest(request);
    setAction('approve');
    setComments('');
    setDialogOpen(true);
  };

  const handleRejectClick = (request: any) => {
    setSelectedRequest(request);
    setAction('reject');
    setComments('');
    setDialogOpen(true);
  };

  const handleConfirmAction = () => {
    if (action === 'reject' && !comments.trim()) return;
    // Simulate API call
    console.log(`${action} request ${selectedRequest?.id} with comments: ${comments}`);
    setDialogOpen(false);
    setSelectedRequest(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Approval Queue
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Review and approve pending travel requests
          </Typography>
        </Box>
      </Box>

      <Paper elevation={2}>
        <Box p={2} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TextField
            placeholder="Search approvals..."
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
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Request ID</TableCell>
                <TableCell>Employee</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell>Purpose</TableCell>
                <TableCell>Dates</TableCell>
                <TableCell>Budget</TableCell>
                <TableCell>Submitted</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredApprovals.map((request) => (
                <TableRow key={request.id} hover>
                  <TableCell>{request.id}</TableCell>
                  <TableCell>{request.employee}</TableCell>
                  <TableCell>{request.department}</TableCell>
                  <TableCell>{request.destination}</TableCell>
                  <TableCell>{request.purpose}</TableCell>
                  <TableCell>{request.startDate} - {request.endDate}</TableCell>
                  <TableCell>${request.estimatedBudget.toLocaleString()}</TableCell>
                  <TableCell>{request.submittedDate}</TableCell>
                  <TableCell>
                    <Chip label={request.status} size="small" color={statusColors[request.status] || 'default'} />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" aria-label="view" onClick={() => {}}>
                      <Visibility />
                    </IconButton>
                    <Button size="small" variant="outlined" startIcon={<Done />} onClick={() => handleApproveClick(request)}>
                      Approve
                    </Button>
                    <Button size="small" variant="outlined" color="error" startIcon={<Close />} onClick={() => handleRejectClick(request)}>
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredApprovals.length === 0 && (
          <Box p={4} textAlign="center">
            <Typography variant="body1" color="text.secondary">
              No pending approvals. Great job!
            </Typography>
          </Box>
        )}
      </Paper>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{action === 'approve' ? 'Approve Request' : 'Reject Request'}</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">Request: {selectedRequest?.id}</Typography>
            <Typography variant="body2" color="text.secondary">Employee: {selectedRequest?.employee}</Typography>
            <Typography variant="body2" color="text.secondary">Destination: {selectedRequest?.destination}</Typography>
          </Box>
          <FormControl fullWidth>
            <InputLabel id="comments-label">Comments</InputLabel>
            <TextareaAutosize
              id="comments-label"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder={`Enter ${action} comments...`}
              rows={3}
              required={action === 'reject'}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            color={action === 'approve' ? 'success' : 'error'}
            onClick={handleConfirmAction}
            disabled={action === 'reject' && !comments.trim()}
          >
            {action === 'approve' ? 'Approve' : 'Reject'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

import React, { useState } from 'react';
import { 
  Box, Typography, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, IconButton, Chip, Button, TextField,
  InputAdornment
} from '@mui/material';
import { Add, Search, Edit, Visibility, FilterList } from '@mui/icons-material';

const mockTravelRequests = [
  { id: 'TR-001', destination: 'New York, USA', purpose: 'Client Meeting', startDate: '2024-01-15', endDate: '2024-01-18', status: 'Approved', estimatedBudget: 2500 },
  { id: 'TR-002', destination: 'London, UK', purpose: 'Conference', startDate: '2024-02-10', endDate: '2024-02-14', status: 'Pending', estimatedBudget: 3200 },
  { id: 'TR-003', destination: 'Tokyo, Japan', purpose: 'Training', startDate: '2024-03-01', endDate: '2024-03-05', status: 'Draft', estimatedBudget: 4100 },
  { id: 'TR-004', destination: 'Sydney, Australia', purpose: 'Client Visit', startDate: '2024-04-05', endDate: '2024-04-08', status: 'Rejected', estimatedBudget: 2800 },
];

const statusColors: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
  'Approved': 'success',
  'Pending': 'warning',
  'Draft': 'info',
  'Rejected': 'error',
  'Cancelled': 'default',
};

export const TravelRequestList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRequests = mockTravelRequests.filter(request =>
    request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Travel Requests
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your travel requests and track their status
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} href="/travel-requests/new">
          New Travel Request
        </Button>
      </Box>

      <Paper elevation={2}>
        <Box p={2} sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField
              placeholder="Search travel requests..."
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
                <TableCell>Request ID</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell>Purpose</TableCell>
                <TableCell>Dates</TableCell>
                <TableCell>Estimated Budget</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id} hover>
                  <TableCell>{request.id}</TableCell>
                  <TableCell>{request.destination}</TableCell>
                  <TableCell>{request.purpose}</TableCell>
                  <TableCell>
                    {request.startDate} - {request.endDate}
                  </TableCell>
                  <TableCell>${request.estimatedBudget.toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip 
                      label={request.status} 
                      size="small" 
                      color={statusColors[request.status] || 'default'}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" aria-label="view">
                      <Visibility />
                    </IconButton>
                    <IconButton size="small" aria-label="edit" href={`/travel-requests/${request.id}`}>
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {filteredRequests.length === 0 && (
          <Box p={4} textAlign="center">
            <Typography variant="body1" color="text.secondary">
              No travel requests found. Create your first request!
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

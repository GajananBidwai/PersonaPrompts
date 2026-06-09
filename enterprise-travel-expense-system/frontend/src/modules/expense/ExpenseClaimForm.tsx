import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box, Typography, Button, TextField, Grid, Paper, Card, CardContent,
  FormControl, InputLabel, Select, MenuItem,
  Alert, AlertTitle, InputAdornment
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Save, ArrowBack, CloudUpload, Delete } from '@mui/icons-material';

export const ExpenseClaimForm: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const isEditing = !!params.id;

  const [formData, setFormData] = useState({
    travelRequestId: '',
    category: '',
    amount: '',
    date: null,
    description: '',
    receipt: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, receipt: 'File size must be less than 10MB' }));
        return;
      }
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, receipt: 'Only PDF, JPG, and PNG files are allowed' }));
        return;
      }
      setFormData(prev => ({ ...prev, receipt: file }));
      setErrors(prev => ({ ...prev, receipt: '' }));
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setReceiptPreview(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.travelRequestId) newErrors.travelRequestId = 'Travel request is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.amount) newErrors.amount = 'Amount is required';
    if (!formData.date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmitting(false);
    
    navigate('/expenses');
  };

  const handleSaveDraft = async (e: React.MouseEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmitting(false);
  };

  return (
    <Box maxWidth={900} mx="auto">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            {isEditing ? 'Edit Expense Claim' : 'Create Expense Claim'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {isEditing ? 'Update your expense claim details' : 'Fill in the details below to create a new expense claim'}
          </Typography>
        </Box>
        <Button variant="text" startIcon={<ArrowBack />} onClick={() => navigate('/expenses')}>
          Back to List
        </Button>
      </Box>

      <form onSubmit={handleSubmit}>
        <Card elevation={2} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Expense Details
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.travelRequestId}>
                  <InputLabel id="travel-request-label">Travel Request *</InputLabel>
                  <Select
                    labelId="travel-request-label"
                    value={formData.travelRequestId}
                    label="Travel Request *"
                    onChange={(e) => handleChange('travelRequestId', e.target.value)}
                  >
                    <MenuItem value="TR-001">TR-001 - New York, USA (Jan 15-18)</MenuItem>
                    <MenuItem value="TR-002">TR-002 - London, UK (Feb 10-14)</MenuItem>
                    <MenuItem value="TR-003">TR-003 - Tokyo, Japan (Mar 1-5)</MenuItem>
                  </Select>
                  {errors.travelRequestId && <FormHelperText>{errors.travelRequestId}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.category}>
                  <InputLabel id="category-label">Category *</InputLabel>
                  <Select
                    labelId="category-label"
                    value={formData.category}
                    label="Category *"
                    onChange={(e) => handleChange('category', e.target.value)}
                  >
                    <MenuItem value="flight">Flight</MenuItem>
                    <MenuItem value="accommodation">Accommodation</MenuItem>
                    <MenuItem value="meals">Meals</MenuItem>
                    <MenuItem value="transport">Transport</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                  {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Amount (USD) *"
                  value={formData.amount}
                  onChange={(e) => handleChange('amount', e.target.value)}
                  error={!!errors.amount}
                  helperText={errors.amount}
                  required
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Expense Date *"
                    value={formData.date}
                    onChange={(value) => handleChange('date', value)}
                    error={!!errors.date}
                    helperText={errors.date}
                    required
                    slotProps={{
                      textField: { fullWidth: true }
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Describe the expense..."
                />
              </Grid>

              <Grid item xs={12}>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Receipt (PDF, JPG, PNG - Max 10MB)
                  </Typography>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="receipt-upload"
                    disabled={submitting}
                  />
                  <Button
                    variant="outlined"
                    startIcon={<CloudUpload />}
                    component="label"
                    htmlFor="receipt-upload"
                    disabled={submitting}
                  >
                    {formData.receipt ? `Uploaded: ${formData.receipt.name}` : 'Upload Receipt'}
                  </Button>
                  {errors.receipt && <FormHelperText error>{errors.receipt}</FormHelperText>}
                  {receiptPreview && (
                    <Box mt={1}>
                      <img src={receiptPreview} alt="Receipt preview" style={{ maxWidth: 300, maxHeight: 200 }} />
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card elevation={2} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Policy Guidelines
            </Typography>
            <Alert severity="info" sx={{ mb: 2 }}>
              <AlertTitle>Expense Policy</AlertTitle>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>Receipts mandatory for expenses over $25</li>
                <li>Meal allowance: $75/day domestic, $100/day international</li>
                <li>Hotel rates must comply with city tier limits</li>
                <li>Alcohol expenses not reimbursable</li>
                <li>Personal expenses must be clearly separated</li>
              </ul>
            </Alert>
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          {isEditing && (
            <Button variant="outlined" startIcon={<Delete />} color="error">
              Delete
            </Button>
          )}
          <Button variant="outlined" onClick={handleSaveDraft} disabled={submitting}>
            Save as Draft
          </Button>
          <Button 
            variant="contained" 
            type="submit" 
            startIcon={<Save />}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : (isEditing ? 'Update Claim' : 'Submit Claim')}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

// Missing imports
import { FormHelperText } from '@mui/material';

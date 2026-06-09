import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box, Typography, Button, TextField, Grid, Paper, Card, CardContent,
  FormControl, InputLabel, Select, MenuItem, DatePicker, LocalizationProvider,
  Alert, AlertTitle
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Save, ArrowBack, Delete } from '@mui/icons-material';

export const TravelRequestForm: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const isEditing = !!params.id;

  const [formData, setFormData] = useState({
    destination: '',
    purpose: '',
    startDate: null,
    endDate: null,
    estimatedBudget: '',
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.destination) newErrors.destination = 'Destination is required';
    if (!formData.purpose) newErrors.purpose = 'Purpose is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (!formData.estimatedBudget) newErrors.estimatedBudget = 'Estimated budget is required';
    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
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
    
    navigate('/travel-requests');
  };

  const handleSaveDraft = async (e: React.MouseEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmitting(false);
    
    // Show success message
  };

  return (
    <Box maxWidth={900} mx="auto">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            {isEditing ? 'Edit Travel Request' : 'Create Travel Request'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {isEditing ? 'Update your travel request details' : 'Fill in the details below to create a new travel request'}
          </Typography>
        </Box>
        <Button variant="text" startIcon={<ArrowBack />} onClick={() => navigate('/travel-requests')}>
          Back to List
        </Button>
      </Box>

      <form onSubmit={handleSubmit}>
        <Card elevation={2} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Travel Details
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Destination *"
                  value={formData.destination}
                  onChange={(e) => handleChange('destination', e.target.value)}
                  error={!!errors.destination}
                  helperText={errors.destination}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={!!errors.purpose}>
                  <InputLabel id="purpose-label">Purpose *</InputLabel>
                  <Select
                    labelId="purpose-label"
                    value={formData.purpose}
                    label="Purpose *"
                    onChange={(e) => handleChange('purpose', e.target.value)}
                  >
                    <MenuItem value="business-meeting">Business Meeting</MenuItem>
                    <MenuItem value="conference">Conference</MenuItem>
                    <MenuItem value="training">Training</MenuItem>
                    <MenuItem value="client-visit">Client Visit</MenuItem>
                    <MenuItem value="team-building">Team Building</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                  {errors.purpose && <FormHelperText>{errors.purpose}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Start Date *"
                    value={formData.startDate}
                    onChange={(value) => handleChange('startDate', value)}
                    error={!!errors.startDate}
                    helperText={errors.startDate}
                    required
                    slotProps={{
                      textField: { fullWidth: true }
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="End Date *"
                    value={formData.endDate}
                    onChange={(value) => handleChange('endDate', value)}
                    error={!!errors.endDate}
                    helperText={errors.endDate}
                    required
                    slotProps={{
                      textField: { fullWidth: true }
                    }}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Estimated Budget (USD) *"
                  value={formData.estimatedBudget}
                  onChange={(e) => handleChange('estimatedBudget', e.target.value)}
                  error={!!errors.estimatedBudget}
                  helperText={errors.estimatedBudget}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Provide additional details about the trip..."
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Card elevation={2} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Policy Compliance
            </Typography>
            <Alert severity="info" sx={{ mb: 2 }}>
              <AlertTitle>Policy Reminder</AlertTitle>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>All international travel requires manager approval 30 days in advance</li>
                <li>Daily meal allowance: $75 domestic / $100 international</li>
                <li>Hotel booking must comply with company travel policy</li>
                <li>Receipts required for all expenses over $25</li>
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
            {submitting ? 'Submitting...' : (isEditing ? 'Update Request' : 'Submit Request')}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

// Need to import missing components
import { FormHelperText, InputAdornment } from '@mui/material';

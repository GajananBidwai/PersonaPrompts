import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, TextField, Button,
  FormControl, InputLabel, Select, MenuItem, Avatar, Divider,
  Alert, Tabs, Tab, Paper
} from '@mui/material';
import { Person, Edit, Save, Badge, Business } from '@mui/icons-material';

export const EmployeeProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    employeeId: 'EMP-00123',
    department: 'Engineering',
    position: 'Senior Software Engineer',
    manager: 'Jane Smith',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, San Francisco, CA 94105',
    emergencyContact: 'Jane Doe - +1 (555) 987-6543',
    travelPreferences: {
      seatPreference: 'Aisle',
      mealPreference: 'Vegetarian',
      hotelPreference: '3-star or above',
      frequentFlyerNumbers: 'AA: 12345678, UA: 87654321',
    },
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const handleChange = (field: string, value: any) => {
    if (field.startsWith('travelPreferences.')) {
      const prefField = field.split('.')[1];
      setProfile(prev => ({
        ...prev,
        travelPreferences: { ...prev.travelPreferences, [prefField]: value }
      }));
    } else {
      setProfile(prev => ({ ...prev, [field]: value }));
    }
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Profile
      </Typography>

      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
            <Avatar sx={{ width: 100, height: 100 }}>
              <Person fontSize={50} />
            </Avatar>
            <Box>
              <Typography variant="h5" component="h2">
                {profile.firstName} {profile.lastName}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {profile.employeeId} • {profile.position}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {profile.department} • Manager: {profile.manager}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Badge badgeContent={profile.department === 'Engineering' ? 'Engineering' : 'Employee'} color="primary">
                  <Business fontSize="small" />
                </Badge>
              </Box>
            </Box>
            <Box sx={{ ml: 'auto' }}>
              <Button 
                variant={editing ? 'contained' : 'outlined'} 
                startIcon={editing ? <Save /> : <Edit />}
                onClick={() => setEditing(!editing)}
                disabled={saving}
              >
                {editing ? (saving ? 'Saving...' : 'Save') : 'Edit Profile'}
              </Button>
              {editing && (
                <Button variant="outlined" onClick={handleCancel} sx={{ ml: 1 }}>
                  Cancel
                </Button>
              )}
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Tabs value={activeTab} onChange={(_, value) => setActiveTab(value)}>
            <Tab label="Personal Info" />
            <Tab label="Travel Preferences" />
            <Tab label="Security" />
          </Tabs>

          <Box mt={3}>
            {activeTab === 0 && (
              <form>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      value={profile.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      disabled={!editing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      value={profile.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      disabled={!editing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      disabled={true}
                      helperText="Email cannot be changed"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Employee ID"
                      value={profile.employeeId}
                      disabled={true}
                      helperText="Employee ID cannot be changed"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth disabled={!editing}>
                      <InputLabel id="department-label">Department</InputLabel>
                      <Select
                        labelId="department-label"
                        value={profile.department}
                        label="Department"
                        onChange={(e) => handleChange('department', e.target.value)}
                      >
                        <MenuItem value="Engineering">Engineering</MenuItem>
                        <MenuItem value="Marketing">Marketing</MenuItem>
                        <MenuItem value="Sales">Sales</MenuItem>
                        <MenuItem value="HR">Human Resources</MenuItem>
                        <MenuItem value="Finance">Finance</MenuItem>
                        <MenuItem value="Operations">Operations</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Position"
                      value={profile.position}
                      onChange={(e) => handleChange('position', e.target.value)}
                      disabled={!editing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Manager"
                      value={profile.manager}
                      onChange={(e) => handleChange('manager', e.target.value)}
                      disabled={!editing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      disabled={!editing}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      label="Address"
                      value={profile.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      disabled={!editing}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Emergency Contact"
                      value={profile.emergencyContact}
                      onChange={(e) => handleChange('emergencyContact', e.target.value)}
                      disabled={!editing}
                      placeholder="Name - Phone Number"
                    />
                  </Grid>
                </Grid>
              </form>
            )}

            {activeTab === 1 && (
              <form>
                <Typography variant="h6" gutterBottom>
                  Travel Preferences
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth disabled={!editing}>
                      <InputLabel id="seat-preference-label">Seat Preference</InputLabel>
                      <Select
                        labelId="seat-preference-label"
                        value={profile.travelPreferences.seatPreference}
                        label="Seat Preference"
                        onChange={(e) => handleChange('travelPreferences.seatPreference', e.target.value)}
                      >
                        <MenuItem value="Aisle">Aisle</MenuItem>
                        <MenuItem value="Window">Window</MenuItem>
                        <MenuItem value="Middle">No Preference</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth disabled={!editing}>
                      <InputLabel id="meal-preference-label">Meal Preference</InputLabel>
                      <Select
                        labelId="meal-preference-label"
                        value={profile.travelPreferences.mealPreference}
                        label="Meal Preference"
                        onChange={(e) => handleChange('travelPreferences.mealPreference', e.target.value)}
                      >
                        <MenuItem value="Standard">Standard</MenuItem>
                        <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                        <MenuItem value="Vegan">Vegan</MenuItem>
                        <MenuItem value="Gluten-Free">Gluten-Free</MenuItem>
                        <MenuItem value="Halal">Halal</MenuItem>
                        <MenuItem value="Kosher">Kosher</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Hotel Preference"
                      value={profile.travelPreferences.hotelPreference}
                      onChange={(e) => handleChange('travelPreferences.hotelPreference', e.target.value)}
                      disabled={!editing}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Frequent Flyer Numbers"
                      value={profile.travelPreferences.frequentFlyerNumbers}
                      onChange={(e) => handleChange('travelPreferences.frequentFlyerNumbers', e.target.value)}
                      disabled={!editing}
                      placeholder="AA: 12345678, UA: 87654321"
                    />
                  </Grid>
                </Grid>
              </form>
            )}

            {activeTab === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Security Settings
                </Typography>
                <Alert severity="info">
                  Password management and two-factor authentication are handled through the company SSO system.
                  Please contact IT support for any security-related changes.
                </Alert>
                <Box sx={{ mt: 2 }}>
                  <Button variant="outlined" startIcon={<Badge />}>
                    View Active Sessions
                  </Button>
                  <Button variant="outlined" color="primary" sx={{ ml: 2 }}>
                    Configure SSO
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { 
  Flight, AssignmentTurnedIn, ReceiptLong, AccountBalance, TrendingUp, AttachMoney
} from '@mui/icons-material';

const statCards = [
  { title: 'My Travel Requests', value: '12', icon: <Flight color="primary" />, color: 'primary' },
  { title: 'Pending Approvals', value: '5', icon: <AssignmentTurnedIn color="secondary" />, color: 'secondary' },
  { title: 'Expense Claims', value: '8', icon: <ReceiptLong color="success" />, color: 'success' },
  { title: 'Reimbursements', value: '$2,450', icon: <AccountBalance color="warning" />, color: 'warning' },
];

export const Dashboard: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Welcome back! Here's an overview of your travel and expense activities.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card elevation={2}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box sx={{ color: `${stat.color}.main` }}>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  No recent activity to display. Create your first travel request!
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Flight color="primary" />
                  <Typography variant="body1">Create Travel Request</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ReceiptLong color="success" />
                  <Typography variant="body1">Submit Expense Claim</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrendingUp color="secondary" />
                  <Typography variant="body1">View Reports</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

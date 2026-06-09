import React, { useState } from 'react';
import {
  Box, Typography, List, ListItem, ListItemIcon, ListItemText,
  ListItemSecondaryAction, Chip, IconButton, Paper, Tab, Tabs,
  Divider
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  MarkEmailRead as MarkReadIcon,
  Delete as DeleteIcon,
  Flight as TravelIcon,
  AssignmentTurnedIn as ApprovalIcon,
  ReceiptLong as ExpenseIcon,
  AccountBalance as ReimburseIcon
} from '@mui/icons-material';

const mockNotifications = [
  { id: 1, type: 'travel', title: 'Travel Request Approved', message: 'Your travel request TR-001 to New York has been approved.', time: '2 hours ago', read: false },
  { id: 2, type: 'approval', title: 'Approval Required', message: 'Travel request TR-005 from Sarah Johnson requires your approval.', time: '4 hours ago', read: false },
  { id: 3, type: 'expense', title: 'Expense Claim Submitted', message: 'Your expense claim EXP-003 for $85 has been submitted for review.', time: '1 day ago', read: true },
  { id: 4, type: 'reimbursement', title: 'Reimbursement Processed', message: 'Reimbursement REIMB-001 for $655 has been paid to your account.', time: '2 days ago', read: true },
  { id: 5, type: 'travel', title: 'Travel Request Rejected', message: 'Your travel request TR-004 to Sydney has been rejected. Reason: Budget constraints.', time: '3 days ago', read: true },
  { id: 6, type: 'approval', title: 'Reminder: Pending Approval', message: 'Travel request TR-002 has been pending for 3 days.', time: '5 days ago', read: true },
];

const typeIcons: Record<string, React.ReactNode> = {
  travel: <TravelIcon color="primary" />,
  approval: <ApprovalIcon color="secondary" />,
  expense: <ExpenseIcon color="success" />,
  reimbursement: <ReimburseIcon color="warning" />,
};

const typeLabels: Record<string, string> = {
  travel: 'Travel',
  approval: 'Approval',
  expense: 'Expense',
  reimbursement: 'Reimbursement',
};

export const Notifications: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [notifications] = useState(mockNotifications);

  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications;

  const handleMarkAsRead = (id: number) => {
    // Update local state
  };

  const handleDelete = (id: number) => {
    // Update local state
  };

  const handleMarkAllAsRead = () => {
    // Update local state
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Notifications
      </Typography>

      <Paper elevation={2} sx={{ mt: 1 }}>
        <Tabs
          value={filter}
          onChange={(_, value) => setFilter(value)}
          variant="fullWidth"
          aria-label="Notification filter"
        >
          <Tab label="All" />
          <Tab label={`Unread (${notifications.filter(n => !n.read).length)}`} />
        </Tabs>
        <Divider />

        <List disablePadding>
          {filteredNotifications.map((notification) => (
            <ListItem
              key={notification.id}
              sx={{
                px: 3,
                py: 2,
                borderBottom: 1,
                borderColor: 'divider',
                backgroundColor: notification.read ? 'transparent' : 'action.hover',
              }}
            >
              <ListItemIcon sx={{ minWidth: 48 }}>
                {typeIcons[notification.type]}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: notification.read ? 400 : 600 }}>
                      {notification.title}
                    </Typography>
                    <Chip label={typeLabels[notification.type]} size="small" variant="outlined" />
                  </Box>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    {notification.message}
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    {notification.time}
                  </Typography>
                  {!notification.read && (
                    <IconButton size="small" onClick={() => handleMarkAsRead(notification.id)} aria-label="Mark as read">
                      <MarkReadIcon fontSize="small" />
                    </IconButton>
                  )}
                  <IconButton size="small" onClick={() => handleDelete(notification.id)} aria-label="Delete" color="error">
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        {filteredNotifications.length === 0 && (
          <Box p={4} textAlign="center">
            <NotificationsIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {filter === 'unread' ? 'You\'re all caught up!' : 'Notifications will appear here when you receive them.'}
            </Typography>
          </Box>
        )}

        {filter === 'all' && notifications.some(n => !n.read) && (
          <Box p={2} sx={{ borderTop: 1, borderColor: 'divider' }}>
            <Button 
              variant="text" 
              onClick={handleMarkAllAsRead}
              startIcon={<MarkReadIcon />}
            >
              Mark all as read
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

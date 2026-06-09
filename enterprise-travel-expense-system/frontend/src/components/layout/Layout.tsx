import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  AppBar, Toolbar, Typography, Box, Drawer, List, ListItem, 
  ListItemIcon, ListItemText, IconButton, Avatar, Menu, MenuItem,
  Divider, useMediaQuery, useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Flight as FlightIcon,
  AssignmentTurnedIn as ApprovalIcon,
  ReceiptLong as ExpenseIcon,
  AccountBalance as ReimbursementIcon,
  Assessment as ReportsIcon,
  Person as ProfileIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';

export const Layout: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    localStorage.removeItem('token');
    navigate('/login');
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', pt: 2, pb: 1 }}>
      <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
        Travel & Expense
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Management System
      </Typography>
    </Box>
  );

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { path: '/travel-requests', label: 'Travel Requests', icon: <FlightIcon /> },
    { path: '/approvals', label: 'Approvals', icon: <ApprovalIcon /> },
    { path: '/expenses', label: 'Expenses', icon: <ExpenseIcon /> },
    { path: '/reimbursements', label: 'Reimbursements', icon: <ReimbursementIcon /> },
    { path: '/reports', label: 'Reports', icon: <ReportsIcon /> },
    { path: '/profile', label: 'Profile', icon: <ProfileIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ width: { md: `calc(100% - 250px)` }, ml: { md: '250px' } }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            Travel & Expense Management
          </Typography>
          <IconButton onClick={handleProfileMenuOpen}>
            <Avatar sx={{ width: 32, height: 32 }}>
              <PersonIcon />
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleProfileMenuClose}>
              <ListItemIcon><ProfileIcon fontSize="small" /></ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>
              <ListItemIcon><SettingsIcon fontSize="small" /></ListItemIcon>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: '250px' }, flexShrink: { md: 0 } }}
        aria-label="main navigation"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '250px' },
          }}
        >
          {drawer}
          <Divider />
          <List>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleDrawerToggle}
                sx={{
                  textDecoration: 'none',
                  '&.active': { backgroundColor: 'primary.main', color: 'white' },
                  '&.active .MuiListItemIcon-root': { color: 'white' },
                }}
              >
                <ListItem button>
                  <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              </NavLink>
            ))}
          </List>
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '250px', borderRight: '1px solid', borderColor: 'divider' },
          }}
          open
        >
          {drawer}
          <Divider />
          <List>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                sx={{
                  textDecoration: 'none',
                  '&.active': { backgroundColor: 'primary.main', color: 'white' },
                  '&.active .MuiListItemIcon-root': { color: 'white' },
                }}
              >
                <ListItem button>
                  <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              </NavLink>
            ))}
          </List>
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - 250px)` }, mt: '64px' }}>
        <Outlet />
      </Box>
    </Box>
  );
};

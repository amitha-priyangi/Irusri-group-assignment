import React, { useContext, useEffect } from 'react';
import { AuthContext } from './context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container, Grid, Paper } from '@mui/material';

const App = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect to login page after logout
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
          {user ? (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 5 }}>
        {user ? (
          <Box>
            <Typography variant="h4" gutterBottom>
              Welcome, {user.email}!
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                  <Typography variant="h6">Your Todos</Typography>
                  <Typography variant="body2">
                    Manage your todos efficiently. Add, edit, and mark your tasks as completed.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                  <Typography variant="h6">Profile Settings</Typography>
                  <Typography variant="body2">
                    Update your personal information and manage your account settings.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Paper elevation={3} sx={{ padding: 2 }}>
                  <Typography variant="h6">Recent Activity</Typography>
                  <Typography variant="body2">
                    View your recent activity and track your progress.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box textAlign="center">
            <Typography variant="h4" gutterBottom>
              Please Login or Sign Up
            </Typography>
            <Typography variant="body1" paragraph>
              Welcome to our app! You need to be signed in to access your dashboard, manage tasks, and view your profile.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button variant="outlined" color="primary" component={Link} to="/signup">
              Sign Up
            </Button>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default App;

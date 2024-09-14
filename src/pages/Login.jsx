import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { AppBar, Toolbar, Grid, TextField, Button, Typography, Box, IconButton } from '@mui/material'; // Ensure TextField is imported here
import HomeIcon from '@mui/icons-material/Home';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Validation schema
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Formik form handler
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      login(values);
      navigate('/todos');
    },
  });

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="home" component={Link} to="/">
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>

      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={7}
          sx={{
            position: 'relative',
            backgroundImage: 'url(https://picsum.photos/500/500)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              p: { xs: 2, md: 4 },
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
              Welcome Back!
            </Typography>
            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }}>
              Sign in to access your personalized dashboard and stay productive.
            </Typography>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          component={Box}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ p: { xs: 3, md: 4 } }}
        >
          <Typography component="h1" variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}>
            Sign In
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1, width: { xs: '100%', sm: '80%' } }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;

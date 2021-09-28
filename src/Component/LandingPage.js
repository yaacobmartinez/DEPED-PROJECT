import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Checkbox, CssBaseline, FormControlLabel, Grid, Paper, TextField, Toolbar} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import {Link} from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CustomAppBar from './layout/CustomAppBar';
import CustomCarousel from './layout/CustomCarousel';
import { Title } from '@mui/icons-material';

export const LandingPage = ({type}) => {
    return(
      <div>
      <CustomAppBar />
      <Toolbar />
      <Grid container sx = {{height: '93vh'}}>
          <CssBaseline />
          <Grid item xs= {false} sm={4} md={7} style={{display: 'flex', alignItems: 'center'}}>
            <CustomCarousel />
          </Grid>
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>
            {type === 'login' && (
              <LoginComponent />
            )}
            {type === 'register' && (
              <RegisterComponent />
            )}

          </Grid>
        </Grid>
      </div>
    )
  }
  
const HeroTitle = ({title, subtitle}) => {
  return (
    <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%'}}>
      <img src="./Images/icon.png" alt="logo" height="60" style={{marginRight: 20}} />
      <Typography component='h1' variant="h5">
        {title}
        <Typography variant="subtitle2" color="textSecondary">
          {subtitle}
        </Typography>
      </Typography>
    </div>
  )
}

const LoginComponent = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(1)
  }
  return (
      <Box sx={{
          my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
          <HeroTitle title="Sign in to your account" subtitle="Manage your school records with ease" />
          <Box component="form" noValidate onSubmit={handleSubmit} sx = {{ mt: 1 }}>
            <TextField
              size="small"
              margin="normal"
              required fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              />
            <TextField
              size="small"
              margin="normal"
              required fullWidth
              label="Password"
              name="password"
              type="password"
              autoComplete="password"
              autoFocus
              />
              <Button type="submit" fullWidth variant="contained" sx= {{mt: 3, mb: 2}}>
                Sign In
              </Button>

              <Grid container direction="row" justifyContent="space-between">
                <Grid item xs>
                  <Typography component={Link} to="/forgot-password" variant="caption" style={{textDecoration: 'none'}}>
                    Forgot Password?
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography component={Link} to="/register" variant="caption" style={{textDecoration: 'none'}}>
                    Don't have an account? Sign Up
                  </Typography>
                </Grid>
              </Grid>  
          </Box>
        </Box>
  )
}

const RegisterComponent = () => {
  const handleSubmit = (e) => {
    	e.preventDefault()
  }
  return (
    <Box sx={{
      my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'
    }}>
      <HeroTitle title="Sign up for an account" subtitle="Please provide us with your account details" />
      <Box component="form" onSubmit={handleSubmit} noValidate sx = {{ mt: 1 }}>
        <TextField
          size="small"
          margin="normal"
          required fullWidth
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          />
        <TextField
          size="small"
          margin="normal"
          required fullWidth
          label="Password"
          name="password"
          type="password"
          autoComplete="password"
          autoFocus
          />
        <TextField
          size="small"
          margin="normal"
          required fullWidth
          label="Confirm Password"
          name="conpassword"
          type="password"
          autoComplete="password"
          autoFocus
          />
            <FormControlLabel
              value="terms-condition"
              control={<Checkbox />}
              label={`By clicking on create account, you agree to our Privacy Policy.`}
              disableTypography={true}
              style={{fontSize: 12}}
            />
          <Button type="submit" fullWidth variant="contained" sx= {{mt: 3, mb: 2}}>
            Create Account
          </Button> 
      </Box>
      <Typography component={Link} to="/" variant="caption" style={{textDecoration: 'none'}}>
          Already have an account? Sign in here
      </Typography>
    </Box>
  )
}
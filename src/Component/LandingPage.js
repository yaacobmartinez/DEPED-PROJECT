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
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const LandingPage = ({type}) => {
    return(
      <div>
      {/* <CustomAppBar /> */}
      {/* <Toolbar /> */}
      <Grid container sx = {{height: '100vh'}}>
          <CssBaseline />
          <Grid item xs= {false} sm={4} md={7} style={{display: 'flex', alignItems: 'center'}}>
            <CustomCarousel />
          </Grid>
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
          my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center',
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
  const [agreeToPolicy, setAgreeToPolicy] = React.useState(false)
  const changeAgree = () => {
    setAgreeToPolicy(!agreeToPolicy)
  }
  const {handleSubmit, errors, handleChange, values, handleBlur} = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmpassword: ''
    }, 
    validationSchema: Yup.object({
      firstName: Yup.string()
        .required('We need to know your first name.'),
      lastName: Yup.string()
        .required('We need to know your last name.'),
      email: Yup.string()
        .email('We need a valid email address')
        .required('We need a way to contact you.'),
      password: Yup.string()
        .required('Please Enter your password')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      confirmPassword: Yup
        .string()
        .required()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
    }), 
    onSubmit: values => {
      console.log(values)
    }
  })
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
            label="First Name"
            name="firstName"
            autoFocus
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.firstName}
            helperText={errors.firstName}
          />
        <TextField
          size="small"
          margin="normal"
          required fullWidth
          label="Last Name"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.lastName}
          helperText={errors.lastName}
        />
        <TextField
          size="small"
          margin="normal"
          required fullWidth
          label="Email Address"
          name="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
          helperText={errors.email}
        />
        <TextField
          size="small"
          margin="normal"
          required fullWidth
          label="Password"
          name="password"
          type="password"
          autoComplete="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.password}
          helperText={errors.password}
          />
        <TextField
          size="small"
          margin="normal"
          required fullWidth
          label="Confirm Password"
          name="confirmpassword"
          type="password"
          autoComplete="password"
          value={values.confirmpassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.confirmpassword}
          helperText={errors.confirmpassword}
          />
            <FormControlLabel
              value="terms-condition"
              control={<Checkbox />}
              label={`By clicking on create account, you agree to our Privacy Policy.`}
              disableTypography={true}
              style={{fontSize: 12}}
              onChange={changeAgree}
              checked={agreeToPolicy}
            />
          <Button type="submit" disabled={!agreeToPolicy} fullWidth variant="contained" sx= {{mt: 3, mb: 2}}>
            Create Account
          </Button> 
      </Box>
      <Typography component={Link} to="/" variant="caption" style={{textDecoration: 'none'}}>
          Already have an account? Sign in here
      </Typography>
    </Box>
  )
}
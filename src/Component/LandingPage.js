import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Alert, Checkbox, CssBaseline, Fab, FormControl, FormControlLabel, FormHelperText, Grid, Hidden, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Select, Snackbar, TextField } from '@mui/material';
import {Link, useHistory} from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CustomCarousel from './layout/CustomCarousel';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from '../library/axios'
import { saveToStorage } from '../library/utilities/Storage';
import { HelpOutline, Visibility, VisibilityOff } from '@mui/icons-material';

export const LandingPage = ({type}) => {
    return(
      <div>
      {/* <CustomAppBar /> */}
      {/* <Toolbar /> */}
      <Grid container sx = {{height: '100vh'}}>
          <CssBaseline />
          <Hidden mdDown>
            <Grid item xs={false} sm={4} md={7} style={{display: 'flex', alignItems: 'flex-start'}}>
              <CustomCarousel />
            </Grid>
          </Hidden>
          <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {type === 'login' && (
              <LoginComponent />
            )}
            {type === 'register' && (
              <RegisterComponent />
            )}
            <Fab variant="extended" size='small' color="primary" sx={{position: 'absolute', bottom: 10, right: 10, textTransform: 'none'}} target="_blank" href="https://docs.google.com/document/d/1b_XKjGfsiLob1LFWI-8T7ig_l4uu6Xh9wNDhJb7zWc8/edit">
              <HelpOutline sx={{ mr: 1 }} />
              How to use
            </Fab>
          </Grid>
        </Grid>
        
      </div>
    )
  }
  
export const HeroTitle = ({title, subtitle}) => {
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
  
  const {push} = useHistory()
  const [message, setMessage] = React.useState(null)
  const [success, setSuccess] = React.useState("error")
  const [showPassword, setShowPassword] = React.useState(false)

  const {errors, handleChange, values, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
    }, 
    validationSchema: Yup.object({
      email: Yup.string()
        .email('We need a valid email address')
        .required('Hey, what\'s your username?'),
      password: Yup.string()
        .required('Hey, what\'s your password?')
    }), 
    onSubmit:  async values => {
      const {data} = await axios.post('/users/auth',values)
      if (data.success) {
        saveToStorage('token', data.token)
        sessionStorage.setItem('user', JSON.stringify(data.user))
        if (data.user.confirmed) {
          return push('/change-password')
        }
        if (data.user.access_level === 3) {
          saveToStorage('student_record', data.studentRecord)
          return push('/student')
        } 
        if (data.user.access_level === 2) {
          return push('/faculty')
        } 
        if (data.user.access_level === 2048) {
          return push('/admin')
        } 
        if (data.user.access_level === 4096) {
          return push('/control-panel')
        } 
      }
      setMessage(data.message.message)
      setSuccess(data.success ? 'success' : 'error')
    }
  })

  return (
      <Box sx={{
          my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
        <AlertDialog callback={() => setMessage(null)} message={message} success={success}/>
          <HeroTitle title="Sign in to your account" subtitle="Manage your school records with ease" />
          <Box component="form" onSubmit={handleSubmit} noValidate sx = {{ mt: 1 }}>
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
              error={Boolean(errors.email)}
              helperText={errors.email}
              />
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              size="small"
              margin="normal"
              required fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text": "password"} 
              autoComplete="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(errors.password)}
              helperText={errors.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
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

export const AlertDialog = ({callback, message, success}) => {
  return (
    <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(message)}
        onClose={callback}
        // onClose={() => setMessage(null)}
        autoHideDuration={10000}
      >
      <Alert variant="filled" onClose={callback} severity={success} sx={{ width: '100%' }}>
        {message}
      </Alert>
      </Snackbar>
  )
}

const RegisterComponent = () => {
  const [schools, setSchools] = React.useState(null)
  const [agreeToPolicy, setAgreeToPolicy] = React.useState(false)
  const changeAgree = () => {
    setAgreeToPolicy(!agreeToPolicy)
  }
  const getSchools = React.useCallback(
      async () => {
          const res = await axios.get(`/schools`)
          console.log(res.data)
          setSchools(res.data.schools)
      },
  [])
  React.useEffect(() => {
      getSchools()
  },[getSchools])

  const [message, setMessage] = React.useState(null)
  const [success, setSuccess] = React.useState("error")
  const [showPassword, setShowPassword] = React.useState(false)
  const {errors, handleChange, values, touched, handleSubmit} = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      school : '', 
      lrn: ''
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
        .required('Passwords must match')
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
      school: Yup.string()
          .required('We need to know which school are you enrolling.'),
      lrn: Yup.string()
          .matches(/^[0-9]+$/, "Must be only digits")
          .min(12, "LRN must be 12 digits")
          .max(12, "LRN must be 12 digits")
          .required('Please provide a valid LRN'),
      }), 
    onSubmit:  async (values, {resetForm}) => {
      const {data} = await axios.post('/users',values)
      console.log(data)
      setMessage(data.success 
          ? 'Your account has been created. Please wait for within 24-48 hours for your account to be approved before you can log in.' 
          : data.message )
      setSuccess(data.success ? 'success' : 'error')
      resetForm()
    }
  })
  return (
    <Box sx={{
      my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'
    }}>
      <AlertDialog callback={() => setMessage(null)} message={message} success={success}/>
      <HeroTitle title="Sign up for an account" subtitle="Please provide us with your account details" />
      <Box component="form" onSubmit={handleSubmit}  noValidate sx = {{ mt: 1 }}>
        <TextField
            size="small"
            margin="normal"
            required fullWidth
            label="First Name"
            name="firstName"
            autoFocus
            value={values.firstName}
            onChange={handleChange}
            error={touched.firstName && Boolean(errors.firstName)}
            helperText={touched.firstName && errors.firstName}
          />
        <TextField
          size="small"
          margin="normal"
          required fullWidth
          label="Last Name"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          error={touched.lastName && Boolean(errors.lastName)}
          helperText={touched.lastName && errors.lastName}
        />
        <TextField
          size="small"
          margin="normal"
          required fullWidth
          label="Email Address"
          name="email"
          value={values.email}
          onChange={handleChange}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
        <InputLabel>Password</InputLabel>
        <OutlinedInput
          size="small"
          margin="normal"
          required fullWidth
          label="Password"
          name="password"
          type={showPassword ? "text": "password"} 
          autoComplete="password"
          value={values.password}
          onChange={handleChange}
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          />
          {(touched.password && errors.password) && (
              <FormHelperText style={{color: 'red'}}>{errors.password}</FormHelperText>
          )}  
        <TextField
          size="small"
          margin="normal"
          required fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type={showPassword ? "text": "password"} 
          autoComplete="password"
          value={values.confirmPassword}
          onChange={handleChange}
          error={touched.confirmPassword && Boolean(errors.confirmPassword)}
          helperText={touched.confirmPassword && errors.confirmPassword}
          />
          {schools && (
            <FormControl fullWidth focused>
                <InputLabel shrink={true}>School</InputLabel>
                <Select

                    size="small"
                    value={values.school}
                    label="School"
                    onChange={handleChange}
                    name="school"
                >
                    {schools?.map((school, index) => (
                        <MenuItem value={school._id} key={index} 
                        // PaperProps={{
                        //   style: {
                        //     maxHeight: 500,
                        //   },
                        // }}
                        >{school.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
          )}
          <TextField
            size="small"
            margin="normal"
            required fullWidth
            label="Learner Reference Number (LRN)"
            name="lrn"
            value={values.lrn}
            onChange={handleChange}
            error={touched.lrn && Boolean(errors.lrn)}
            helperText={touched.lrn && errors.lrn}
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
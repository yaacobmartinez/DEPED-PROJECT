import { CssBaseline, Grid, Toolbar, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useParams } from 'react-router'
import { AuthenticatedAppBar } from '../layout/CustomAppBar'
import CustomDrawer from '../layout/CustomDrawer'
import axios from '../../library/axios'
import * as Yup from 'yup';
import { useFormik } from 'formik';


function User() {
    const accountsAvailable = [
        {
            text: 'Faculty', 
            value: 2
        },
        {
            text: 'Administrator', 
            value: 2048
        },
        {
            text: 'Super Administrator', 
            value: 4096
        },
    ]
    const {id} = useParams()
    const [user, setUser] = React.useState(null)
    const [errorFetching, setErrorFetching] = React.useState(false)
    const getUser = React.useCallback(
        async () => {
            const res = await axios.get(`/users/${id}`)
            console.log(res.data)
            if (!res.data.success) return setErrorFetching(true)
            return setUser(res.data.user)
        },
        [id],
    )
    React.useEffect(() => {
        getUser()
    },[getUser])
    const {errors, handleChange, values, handleBlur, handleSubmit} = useFormik({
        initialValues: {
          firstName: '',
          lastName: '',
          email: '',
          confirmed: true, 
          access_level: 2, 
          provisioned: true
        }, 
        validationSchema: Yup.object({
          firstName: Yup.string()
            .required('First Name is required.'),
          lastName: Yup.string()
            .required('Last Name is required.'),
          email: Yup.string()
            .email('We need a valid email address')
            .required('Email Address is required.'),
          access_level: Yup.number()
            .required('Access Level is required.')
            
        }), 
       
      })
    
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AuthenticatedAppBar />
            <CustomDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Typography variant="h6">Manage User Account</Typography>
    
                <Grid container spacing={3} xs={8}>
                    <Grid item xs={6}>
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
                    </Grid>
                    <Grid item xs={6}>
                    <TextField
                                size="small"
                                margin="normal"
                                required fullWidth
                                label="Last Name"
                                name="lastName"
                                autoFocus
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.lastName}
                                helperText={errors.lastName}
                            />
                    </Grid>
                    <Grid item xs={6}>
                    <TextField
                                size="small"
                                margin="normal"
                                required fullWidth
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={errors.email}
                                helperText={errors.email}
                            />
                    </Grid>
                    <Grid item xs={6} >
                        <FormControl fullWidth>
                            <InputLabel>User Level Access</InputLabel>
                            <Select
                                size="small"
                                value={values.access_level}
                                label="User Level Access"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="access_level"
                            >
                                {accountsAvailable.map((account) => (
                                    <MenuItem value={account.value}>{account.text}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                {errorFetching && 'The User you are looking for cannot be found. Try going back.'}
                {user && (
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                )}
            </Box>
        </Box>
    )
}

export default User

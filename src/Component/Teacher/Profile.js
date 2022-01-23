import { Close, History, Save } from '@mui/icons-material'
import { Backdrop, Button, CircularProgress, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Snackbar, TextField, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { fetchFromStorage, saveToStorage } from '../../library/utilities/Storage'
import { AuthenticatedAppBar } from '../layout/CustomAppBar'
import CustomDrawer, { facultyMenu } from '../layout/CustomDrawer'
import axiosInstance from '../../library/axios'
import CustomBottomBar from '../layout/CustomBottomBar'
import * as Yup from 'yup';

function Profile() {
    const user = fetchFromStorage('user')
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AuthenticatedAppBar />
            <CustomDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Typography variant="h6">My Information</Typography>
                <ProfileForm user={user} />

            </Box>
            <CustomBottomBar menu={facultyMenu} />
        </Box>
    )
}

const ProfileForm = ({user}) => {
    const {values, errors, handleBlur, handleChange, handleSubmit, isSubmitting} = useFormik({
        initialValues: user, 
        validationSchema: Yup.object({
            email: Yup.string().email().required('Email is required'), 
            firstName: Yup.string().required('First Name is required'), 
            lastName: Yup.string().required('Last Name is required'), 
            employeeId: Yup.string().required('Employee ID is required'), 
            gender: Yup.string().required('Gender is required'), 
        }), 
        onSubmit: async (values, {setErrors, setSubmitting}) => {
            setSubmitting(true)
            const {data} = await axiosInstance.post(`/users/employee/${user._id}`, values)
            console.log(data.user)
            saveToStorage('user', data.user)
            setSubmitting(false)
        }
    })

    return (
        <Grid container spacing={2} sx={{p: 2}} component="form" onSubmit={handleSubmit}> 
            <Backdrop open={isSubmitting} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <CircularProgress />
            </Backdrop>
            <Grid item xs={12}>
                <Divider />
            </Grid>

            <Grid item xs={12} sm={4}>
                <TextField 
                    fullWidth
                    size="small"
                    label="Employee ID" 
                    InputLabelProps={{
                        shrink: true
                    }}
                    error={Boolean(errors.employeeId)}
                    helperText={errors.employeeId}
                    name="employeeId"
                    value={values.employeeId}
                    onChange={handleChange}
                />
            </Grid> 
            <Grid item sm={8}/>
            <Grid item xs={12} sm={6}>
                <TextField 
                    fullWidth
                    size="small"
                    label="First Name" 
                    InputLabelProps={{
                        shrink: true
                    }}
                    error={Boolean(errors.firstName)}
                    helperText={errors.firstName}
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                />
            </Grid> 
            <Grid item xs={12} sm={6}>
                <TextField 
                    fullWidth
                    size="small"
                    label="Last Name" 
                    InputLabelProps={{
                        shrink: true
                    }}
                    error={Boolean(errors.lastName)}
                    helperText={errors.lastName}
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                />
            </Grid>  
            <Grid item xs={12} sm={6}>
                <TextField 
                    fullWidth
                    size="small"
                    label="Email" 
                    InputProps={{
                        readOnly: true
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                />
            </Grid> 
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                    <InputLabel shrink={true}>Gender</InputLabel>
                    <Select
                        size="small"
                        label="Gender"
                        name="gender"
                        value={values.gender}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        <MenuItem value={`Male`}>Male</MenuItem>
                        <MenuItem value={`Female`}>Female</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Divider />
            </Grid> 
            <Grid item xs={6}>
                <Button type="submit" variant="contained" size="small" color="primary"
                    startIcon={<Save />}
                >
                    Save Changes
                </Button> 
            </Grid> 
        </Grid>
    )
}



export default Profile

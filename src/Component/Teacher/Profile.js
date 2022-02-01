import { Close, History, Lock, Save } from '@mui/icons-material'
import { Avatar, Backdrop, Button, CircularProgress, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Snackbar, TextField, Toolbar, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useFormik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { fetchFromStorage, saveToStorage } from '../../library/utilities/Storage'
import { AuthenticatedAppBar } from '../layout/CustomAppBar'
import CustomDrawer, { facultyMenu } from '../layout/CustomDrawer'
import axiosInstance from '../../library/axios'
import CustomBottomBar from '../layout/CustomBottomBar'
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom'
import Lottie from 'lottie-react'
import loadingAnimation from './loading.json'


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
    console.log(user);
    const {push} = useHistory()
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
    const [profileImage, setProfileImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const getProfileImage = React.useCallback(async() => {
        if (user.avatar){
            const {data} = await axiosInstance.get(`/announcements/image?path=${user.avatar}`)
            setProfileImage(data.link)
        }
    }, [user])
    useEffect(() => {
        getProfileImage()
    }, [getProfileImage])
    const imageRef = useRef()
    const handleFileChange = async (e) =>{
         const form  = new FormData() 
         form.append('media', e.target.files[0])
         setLoading(true)
         const {data} = await axiosInstance.post(`/users/uploadavatar/${user._id}`, form)
         console.log(data)
         setProfileImage(data.link)
         const path = data.file.key
         const updatedUser = {...user, avatar: path}
         saveToStorage('user', updatedUser)
         setLoading(false)
    }
    const handleImageClick = () => {
        imageRef.current.click()
    }
    return (
        <Grid container spacing={2} sx={{p: 2}} component="form" onSubmit={handleSubmit}> 
            <Backdrop open={isSubmitting} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <CircularProgress />
            </Backdrop>
            <Grid item xs={12}>
                <Divider />
            </Grid>
            <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography variant="button">Basic Information</Typography>
                <Button size="small" color="primary" variant='contained' onClick={() => push('/faculty/change-password')} startIcon={<Lock />}>Change Password</Button>
            </Grid>
            <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginY: 2}}>
                <input 
                    accept="image/png, image/gif, image/jpeg"
                    type="file"
                    hidden={true}
                    name="profileImage"
                    id="profileImage"
                    ref={imageRef}
                    onChange={handleFileChange}
                />
                {profileImage ? (
                    <Tooltip title={
                        <div style={{padding: 5}}>
                            <Typography variant="caption">Change Image</Typography>
                        </div>
                    } arrow>
                        <Avatar alt="Profile Image" onClick={handleImageClick} src={profileImage} sx={{ width: 150, height: 150 }}/>
                    </Tooltip>
                    
                ): (
                    <Tooltip title={
                        <div style={{padding: 5}}>
                            <Typography variant="caption">Upload Image</Typography>
                        </div>
                    } arrow>
                        <Avatar sx={{ width: 150, height: 150 }}>
                            <Lottie animationData={loadingAnimation} onClick={handleImageClick} />
                        </Avatar>
                    </Tooltip>
                )}  
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

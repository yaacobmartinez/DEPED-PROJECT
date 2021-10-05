import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import { fetchFromStorage } from '../library/utilities/Storage'
import {useHistory} from 'react-router-dom'
import { Box } from '@mui/system'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from '../library/axios'

function ChangePassword() {
    const {push} = useHistory()
    const user = fetchFromStorage('user')
    if (!user) {
        push('/')
    }

    const {values, handleSubmit, handleChange, handleBlur, errors} = useFormik({
        initialValues: {
            old : '',
            new : '',
            confirm: ''
        },
        validationSchema: Yup.object({
            old: Yup.string()
              .required('Old Password is required.'),
            new: Yup.string()
              .required('Please Enter your password')
              .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
              ),
            confirm: Yup
              .string()
              .required('Passwords must match')
              .oneOf([Yup.ref("new"), null], "Passwords must match")
          }), 
          onSubmit : async (values, {setErrors}) => {
                const {data} = await axios.post(`/users/change-password/${user._id}`, {
                    old: values.old, 
                    new: values.new,                     
                })
                if (!data.success) {
                    setErrors({[data.field]: data.message.message})
                }
                push(`/`)
          }
    })
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
            <Paper>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx = {{ mt: 1, padding: 2, width: 500 }}>
                        <Typography variant="h6">Change Password</Typography>
                            <TextField
                                size="small"
                                margin="normal"
                                required fullWidth
                                label="Old Password"
                                name="old"
                                type="password"
                                value={values.old}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.old)}
                                helperText={errors.old}
                                autoFocus
                            />
                            <TextField
                                size="small"
                                margin="normal"
                                required fullWidth
                                label="New Password"
                                name="new"
                                type="password"
                                value={values.new}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.new)}
                                helperText={errors.new}
                            />
                            <TextField
                                size="small"
                                margin="normal"
                                required fullWidth
                                label="Confirm Password"
                                name="confirm"
                                type="password"
                                value={values.confirm}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={Boolean(errors.confirm)}
                                helperText={errors.confirm}
                            />
                            <Button type="submit" fullWidth variant="contained" sx= {{mt: 3, mb: 2}}>
                                Save Password
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default ChangePassword

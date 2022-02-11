import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React, {useState} from 'react'
import { fetchFromStorage } from '../library/utilities/Storage'
import {useHistory} from 'react-router-dom'
import { Box } from '@mui/system'
import { useFormik } from 'formik'
import * as Yup from 'yup';

import axios from '../library/axios'

function ChangePassword() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
            <Paper>
                <ChangePasswordForm />
            </Paper>

        </div>
    )
}

export const ChangePasswordForm = () => {
    const user = fetchFromStorage('user')
    const {goBack} = useHistory()
    const [success, setSuccess] = useState(false)

    const {values, handleSubmit, handleChange, handleBlur, errors} = useFormik({
        initialValues: {
            old : '',
            new : '',
            confirm: ''
        },
        validationSchema: Yup.object({
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
                const {data} = await axios.post(`/users/change-password/${user._id}`, values)
                console.log(data)
                if (data.success) {
                    return setSuccess(true)
                }
                return setErrors({[data.field] : data.message.message})
          }
    })
    return (
        
            <Grid container spacing={2}>
                    <Grid item xs={12}>
                        {!success ? (
                            <Box component="form" onSubmit={handleSubmit} noValidate sx = {{ mt: 1, padding: 2, width: 500 }}>
                                <Typography variant="h6">Change your Password</Typography>
                                <TextField
                                    size="small"
                                    margin="normal"
                                    required fullWidth
                                    label="Current Password"
                                    name="old"
                                    type="password"
                                    value={values.old}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(errors.old)}
                                    helperText={errors.old}
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
                        ) : (
                            <Box sx = {{ mt: 1, padding: 2, width: 500 }}>
                                <Typography variant="h6">Password Changed.</Typography>
                                <Typography variant='body2' onClick={() => goBack()}>Go Back.</Typography>
                            </Box>
                        )}
                </Grid>
                
            </Grid>
    )
}
export default ChangePassword

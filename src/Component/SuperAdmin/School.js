import { Button, CssBaseline, Grid, Paper, TextField, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useFormik } from 'formik'
import React from 'react'
import { useHistory, useParams } from 'react-router'
import axios from '../../library/axios'
import { AuthenticatedAppBar } from '../layout/CustomAppBar'
import CustomDrawer from '../layout/CustomDrawer'
import * as Yup from 'yup';

function School() {
    const {id} = useParams()

    const [school, setSchool] = React.useState(null)
    const [errorFetching, setErrorFetching] = React.useState(false)
    const getSchool = React.useCallback(
        async () => {
            const res = await axios.get(`/schools/${id}`)
            console.log(res.data)
            if (!res.data.success) return setErrorFetching(true)
            return setSchool(res.data.school)
        },
        [id],
    )
    React.useEffect(() => {
        getSchool()
    },[getSchool])
    
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AuthenticatedAppBar />
            <CustomDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Typography variant="h6">Manage School Info</Typography>
                <Paper sx={{background: '#edf1f7', p: 2}} elevation={0}>
                    <Typography variant="button" sx={{color: "#000"}}>School Information </Typography> 
                    {school && (
                        <SchoolDetails key={school._id} school={school} />
                    )}
                </Paper>
                {errorFetching && 'The Schoool you are looking for cannot be found. Try going back.'}
            </Box>
        </Box>
    )
}

const SchoolDetails = ({school}) => {
    const {push} = useHistory()
    const {errors, handleChange, values, handleBlur, handleSubmit} = useFormik({
        initialValues: school, 
        validationSchema: Yup.object({
            schoolId: Yup.number()
                .required('School ID is required.'),
            name: Yup.string()
                .required('School Name is required.'),
            region: Yup.string()
                .required('Region is required.'),
            division: Yup.string()
                .required('Division is required.')
        }), 
       onSubmit : async values => {
            const res = await axios.put(`/schools/${values._id}`, values)
            console.log(res.data)
            return push('/control-panel/schools')
       }
      })
    
    return (
    <Grid container spacing={1} xs={8} component="form" onSubmit={handleSubmit}>
        <Grid item xs={6}>
        <TextField
            size="small"
            margin="normal"
            required 
            fullWidth
            label="School ID"
            name="schoolId"
            autoFocus
            value={values.schoolId}
            onChange={handleChange}
            // onBlur={handleBlur}
            error={errors.schoolId}
            helperText={errors.schoolId}
        />
        </Grid>
        <Grid item xs={6}>
        <TextField
            size="small"
            margin="normal"
            required 
            fullWidth
            label="School Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            // onBlur={handleBlur}
            error={errors.name}
            helperText={errors.name}
        />
        </Grid>
        <Grid item xs={6}>
        <TextField
            size="small"
            margin="normal"
            required 
            fullWidth
            label="Division"
            name="division"
            value={values.division}
            onChange={handleChange}
            // onBlur={handleBlur}
            error={errors.division}
            helperText={errors.division}
        />
        </Grid>
        <Grid item xs={6}>
        <TextField
            size="small"
            margin="normal"
            required 
            fullWidth
            label="Region"
            name="region"
            value={values.region}
            onChange={handleChange}
            // onBlur={handleBlur}
            error={errors.region}
            helperText={errors.region}
        />
        </Grid>
        <Grid item xs={6}>
            <Button variant="contained" color="primary" size="small" type="submit">Save</Button>
        </Grid>
    </Grid>
    )
}

export default School

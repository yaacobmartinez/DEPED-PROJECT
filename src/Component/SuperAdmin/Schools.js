import { Add } from '@mui/icons-material'
import { CssBaseline, Toolbar, Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogContent, Grid, TextField, DialogActions } from '@mui/material'
import { Box } from '@mui/system'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { AuthenticatedAppBar } from '../layout/CustomAppBar'
import CustomDrawer from '../layout/CustomDrawer'
import axios from '../../library/axios'
import * as Yup from 'yup';
import { AlertDialog } from '../LandingPage'
import { useHistory } from 'react-router'

function Schools() {
    const [newSchool, setNewSchool] = useState(false)
    const [schools, setSchools] = useState(null)
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
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AuthenticatedAppBar />
            <CustomDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Typography variant="h6">Manage Schools</Typography>
                <NewSchoolModal open={newSchool} onClose={() => setNewSchool(false)} refreshList={getSchools} />
                <div style={{display: 'flex', justifyContent:"flex-end", alignItems: 'center', margin: "20px 0px"}}>
                    <Button 
                        onClick={() => setNewSchool(true)}
                        variant="contained" size="small" color="primary" startIcon={<Add /> }>Add new School</Button>
                </div>
                <TableContainer component={Paper}>
                    <Table  size="small" >
                        <TableHead>
                            <TableRow>
                                <TableCell>School ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Division</TableCell>
                                <TableCell>Region</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {schools?.map((school, index) => (
                                <SchoolRow school={school} key={index}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}

const SchoolRow = ({school}) => {
    const {push} = useHistory()
    return (
        <TableRow hover onClick={() => push(`/school/${school._id}`)}>
            <TableCell>{school.schoolId}</TableCell>
            <TableCell>{school.name}</TableCell>
            <TableCell>{school.division}</TableCell>
            <TableCell>{school.region}</TableCell>
        </TableRow>
    )
}

const NewSchoolModal = ({open, onClose, refreshList}) => {
    const [message, setMessage] = React.useState(null)
    const [success, setSuccess] = React.useState("error")
    const [loading, setLoading] = React.useState(false)
    const {errors, handleChange, values, handleBlur, handleSubmit} = useFormik({
        initialValues: {
          schoolId: '',
          name: '',
          region: '',
          division: '',
          status: 1, 
        }, 
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
        onSubmit:  async (values, {resetForm}) => {
            setLoading(true)
            const {data} = await axios.post('/schools',values)
            console.log(data)
            setLoading(false)
            setMessage(data.success 
                ? 'School Created.' 
                : data.message )
            setSuccess(data.success ? 'success' : 'error')
            resetForm()
            refreshList()
            onClose()
        }
      })
      return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth component="form" onSubmit={handleSubmit}>
            <AlertDialog callback={() => setMessage(null)} message={message} success={success}/>
            <DialogTitle>Add New User Account</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} xs={12}>
                    <Grid item xs={6}>
                        <TextField
                            size="small"
                            margin="normal"
                            required fullWidth
                            label="School ID"
                            name="schoolId"
                            autoFocus
                            value={values.schoolId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.schoolId}
                            helperText={errors.schoolId}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            size="small"
                            margin="normal"
                            required fullWidth
                            label="School Name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.name}
                            helperText={errors.name}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            size="small"
                            margin="normal"
                            required fullWidth
                            label="Region"
                            name="region"
                            value={values.region}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.region}
                            helperText={errors.region}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            size="small"
                            margin="normal"
                            required fullWidth
                            label="Division"
                            name="division"
                            value={values.division}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.division}
                            helperText={errors.division}
                        />
                    </Grid>
                    
                </Grid>   
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" size="small" disabled={loading} onClick={onClose}>Cancel</Button>
                <Button variant="contained" size="small" type="submit" disabled={loading} color="primary">Create School</Button>
            </DialogActions>
        </Dialog>
    )
}
export default Schools

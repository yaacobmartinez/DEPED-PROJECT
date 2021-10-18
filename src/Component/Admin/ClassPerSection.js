import { Add } from '@mui/icons-material';
import { Button, CssBaseline, Dialog, DialogActions, DialogContent, Grid, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import axiosInstance from '../../library/axios';
import { AuthenticatedAppBar } from '../layout/CustomAppBar';
import CustomBottomBar from '../layout/CustomBottomBar';
import CustomDrawer, { adminMenu } from '../layout/CustomDrawer';
import { useQuery } from './ClassPerGrade';

function ClassPerSection() {
    let query = useQuery();
    const grade = query.get('grade')
    const section = query.get('name')
    const [classes, setClasses] = useState([]) 
    const [newClass, setNewClass] = useState(false)

    const getClasses = React.useCallback( async () => {
        const {data} = await axiosInstance.get(`/classes/list/${grade}/${section}`)
        console.log(data)
        setClasses(data.classes)
    }, [grade, section])

    useEffect(() => {
        getClasses()
    }, [getClasses])
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AuthenticatedAppBar />
            <CustomDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {newClass && (
                    <NewClassDialog open={newClass} onClose={() => setNewClass(false)} grade={grade} section={section} />
                )}
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="h6" gutterBottom>Manage Grade {grade} Section {section} Classes</Typography>
                    <Button variant="contained" size="small" color="primary" startIcon={<Add />} onClick={() => setNewClass(true)}>Add a Class</Button>
                </div>
                <Grid container spacing={2}>
                    {classes.length < 1 && (
                        <Grid item xs={12}>
                            <Typography variant="body2">There are no classes here. Try adding one.</Typography>
                        </Grid>
                    )}
                </Grid>
            </Box>
            <CustomBottomBar menu={adminMenu} />
        </Box>   

    )
}

const NewClassDialog = ({grade, section, open, onClose, onChange}) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth component="form">
            <DialogContent>
                New Class Form Here
                Class Name, Teacher, start time end time
            </DialogContent>
            <DialogActions>
                <Button size="small" variant="outlined" onClick={onClose}>Cancel</Button>
                <Button size="small" variant="contained" type="submit">Save Class Details</Button>
            </DialogActions>
        </Dialog>
    )
}
export default ClassPerSection

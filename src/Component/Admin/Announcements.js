import { Add } from '@mui/icons-material'
import { Button, Card, CardActionArea, CardContent, CssBaseline, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useCallback, useEffect, useState } from 'react'
import axiosInstance from '../../library/axios'
import { AuthenticatedAppBar } from '../layout/CustomAppBar'
import CustomBottomBar from '../layout/CustomBottomBar'
import CustomDrawer, { adminMenu } from '../layout/CustomDrawer'
import * as Yup from 'yup';
import { fetchFromStorage } from '../../library/utilities/Storage'
import { useFormik } from 'formik'
import { formatDistanceToNowStrict } from 'date-fns'

function Announcements() {
    const user = fetchFromStorage('user')
    const [announcements, setAnnouncements] = useState([])
    const [newAnnouncement, setNewAnnouncement] = useState(false)

    const getAnnouncements = useCallback(async() => {
        const {data} = await axiosInstance.get(`/announcements?school=${user.school}`)
        setAnnouncements(data.announcements)
    }, [])

    useEffect(() => {
        getAnnouncements()
    },[getAnnouncements])

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AuthenticatedAppBar />
            <CustomDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                {newAnnouncement && (
                    <AnnouncementDialog 
                        open={newAnnouncement} 
                        onClose={() => setNewAnnouncement(false)} 
                        onChange={getAnnouncements}
                    />
                )}
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="h6" gutterBottom>Manage Announcements</Typography>
                    <Button variant="contained" size="small" color="primary" startIcon={<Add />} onClick={() => setNewAnnouncement(true)}>Add Announcement</Button>
                </div>
                    <Grid container spacing={2} style={{marginTop: 2}}>
                        {announcements.length < 1 && (
                            <Grid item xs={12}>
                                <Typography variant="body2">There are no announcements here. Try adding one.</Typography>
                            </Grid>
                        )}
                        {announcements?.map((ann, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <AnnouncementCard announcement={ann}/>
                            </Grid>
                        ))}
                    </Grid>
            </Box>
            <CustomBottomBar menu={adminMenu} />
        </Box>
    )
}

export const AnnouncementCard = ({announcement}) => {
    return (
        <CardActionArea>
            <Card elevation={5} sx={{borderRadius: 2}}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Announcement
                    </Typography>
                    <Typography variant="h5" component="div">
                        {announcement.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {formatDistanceToNowStrict(new Date(announcement.date_created), { addSuffix: true })}
                    </Typography>
                    <Typography sx={{marginTop: 2}} variant="body2">
                        {announcement.description}
                    </Typography>
                </CardContent>
            </Card>
        </CardActionArea>
    )
}

const AnnouncementDialog = ({open, onClose, onChange}) => {
    const user = fetchFromStorage('user')
    const {errors, handleChange, values, handleBlur, handleSubmit} = useFormik({
        initialValues: {
            school: user.school,
            title: '', 
            description: '',
            author: user._id,
        }, 
        validationSchema: Yup.object({
            title: Yup.string()
                .required('What is the announcement about?'),
            description: Yup.string()
                .required('Tell us something about the announcement')
        }), 
        onSubmit: async (values, {resetForm}) => {
            console.log(values)
            await axiosInstance.post(`/announcements`, values)
            resetForm()
            onChange()
            onClose()
        }
    })
    return(
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth component="form" onSubmit={handleSubmit}>
            <DialogTitle>New Announcement</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} >
                    <Grid item xs={12}>
                        <TextField 
                            style={{marginTop: 10}}
                            required
                            fullWidth 
                            label="Title" 
                            size="small" 
                            InputLabelProps={{shrink: true}}
                            name="title"
                            value={values.title}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(errors.title)}
                            helperText={errors.title}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            required
                            multiline
                            rows={5}
                            fullWidth 
                            label="Description" 
                            size="small" 
                            InputLabelProps={{shrink: true}}
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={Boolean(errors.description)}
                            helperText={errors.description}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="secondary" size="small" onClick={onClose}>Cancel</Button>
                <Button variant="contained" color="primary" size="small" type="submit">Save</Button>
            </DialogActions>
        </Dialog>
    )
}

export default Announcements

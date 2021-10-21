import { AccountCircle, Assignment, Female, Male } from '@mui/icons-material';
import { CssBaseline, Grid, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useEffect, useState } from 'react'
import axios from '../../library/axios';
import { AuthenticatedAppBar } from '../layout/CustomAppBar';
import CustomBottomBar from '../layout/CustomBottomBar';
import CustomDrawer, { adminMenu } from '../layout/CustomDrawer';
import { AnnouncementCard } from './Announcements';
import TotalCard from './cards/TotalCard';

function Dashboard() {
    const [school, setSchool] = useState(null)
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [announcements, setAnnouncements] = useState([])
    const getAnnouncements = useCallback(async() => {
        const {data} = await axios.get(`/announcements?school=${user.school}`)
        setAnnouncements(data.announcements)
    }, [])

    const getSchool = useCallback ( async () => {
        const response = await axios.get(`/schools/${user.school}`)
        console.log(response)
        setSchool(response.data.school)
    },[user.school])
    useEffect(() => {
        getSchool()
        getAnnouncements()
    }, [getSchool, getAnnouncements])
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AuthenticatedAppBar />
            <CustomDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3, mb: 10 }}>
                <Toolbar />
                <Typography variant="h4">{school?.name}</Typography>
                <Typography variant="caption" color="GrayText" gutterBottom>School ID: {school?.schoolId} / Region {school?.region} - {school?.division}</Typography>
                <Grid container spacing={2} sx={{marginTop: 1}}>
                    <Grid item xs={12} sm={6} md={6} lg={4}>
                        <TotalCard color="#48beff" total={6} title={`Total Enrolled Students`} icon={<AccountCircle />}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={4}>
                        <TotalCard color="#14453d" total={21} title={`Total Faculty`} icon={<Assignment />} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={2}>
                        <TotalCard color="#3e8989" total={3} title={`Male`} icon={<Male />} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} lg={2}>
                        <TotalCard color="#05f140" total={3} title={`Female`} icon={<Female />} />
                    </Grid>
                </Grid>
                <Grid container spacing={2} style={{marginTop: 2}}>
                    <Grid item md={12} lg={8} container spacing={2}>
                        {announcements?.map((announcement, index) => (
                            <>
                                <Grid item xs={12} sm={6}>
                                    <AnnouncementCard announcement={announcement}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <AnnouncementCard announcement={announcement}/>
                                </Grid>
                            </>
                        ))}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        Number of students per grade level
                    </Grid>
                </Grid>
            </Box>
            <CustomBottomBar menu={adminMenu} />
        </Box>
    )
}

export default Dashboard

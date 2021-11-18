import { AccountCircle, Assignment, Female, LibraryBooks, Male } from '@mui/icons-material';
import { Card, CardContent, CardHeader, CssBaseline, Grid, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
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
    const [schoolStats, setSchoolStats] = useState(null)

    const getSchool = useCallback ( async () => {
        const {data} = await axios.get(`/schools/stats/${user.school}`)
        setSchool(data.school_info)
        setAnnouncements(data.school_announcements)
        setSchoolStats(data.stats)
    },[user.school])
    useEffect(() => {
        getSchool()
    }, [getSchool])
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AuthenticatedAppBar />
            <CustomDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3, mb: 10 }}>
                <Toolbar />
                <Typography variant="h4">{school?.name}</Typography>
                <Typography variant="caption" color="GrayText" gutterBottom>School ID: {school?.schoolId} / Region {school?.region} - {school?.division}</Typography>
                {schoolStats && (
                    <Grid container spacing={2} sx={{marginTop: 1}}>
                        <Grid item xs={12} sm={6} md={6} lg={4}>
                            <TotalCard color="#48beff" total={schoolStats?.students} title={`Total Enrolled Students`} icon={<AccountCircle />}/>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={4}>
                            <TotalCard color="#14453d" total={schoolStats?.faculty} title={`Total Faculty`} icon={<Assignment />} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={2}>
                            <TotalCard color="#3e8989" total={schoolStats?.male} title={`Male`} icon={<Male />} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} lg={2}>
                            <TotalCard color="#05f140" total={schoolStats?.female} title={`Female`} icon={<Female />} />
                        </Grid>
                    </Grid>
                )}
                <Grid container spacing={2} style={{marginTop: 2}}>
                    <Grid item md={12} lg={8} container spacing={2}>
                        {announcements?.map((announcement, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <AnnouncementCard announcement={announcement}/>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid item xs={12} md={12} lg={4}>
                        <Card elevation={5} sx={{borderRadius: 2}}>
                            <CardHeader 
                                title="No. of Students"
                                titleTypographyProps={{
                                    fontSize: 18, 
                                }}    
                            />
                            <CardContent>
                                {schoolStats?.gradeLevelCounts?.map((grade, index) => (
                                    <ListItem
                                        key={index}
                                        secondaryAction={
                                            <Typography variant="body1">
                                                {grade.students} Students
                                            </Typography>
                                        }
                                        >
                                        <ListItemIcon>
                                            <LibraryBooks />
                                        </ListItemIcon>
                                        <ListItemText primary={`Grade ${grade.grade_level}`} />
                                    </ListItem>
                                ))}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
            <CustomBottomBar menu={adminMenu} />
        </Box>
    )
}

export default Dashboard

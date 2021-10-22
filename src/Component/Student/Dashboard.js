import { ExpandMore } from '@mui/icons-material';
import { Alert, CssBaseline, Toolbar, Typography, Grid, Card, CardMedia, CardContent,  Button, CardActionArea, Accordion, AccordionSummary, AccordionDetails, AccordionActions } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useEffect, useState } from 'react'
import { AuthenticatedAppBar } from '../layout/CustomAppBar';
import CustomBottomBar from '../layout/CustomBottomBar';
import CustomDrawer, { studentMenu } from '../layout/CustomDrawer';
import axiosInstance from '../../library/axios'
import { AnnouncementCard } from '../Admin/Announcements';
import { fetchFromStorage } from '../../library/utilities/Storage';
function Dashboard() {
    const yearNow = new Date().getFullYear()
    const user = fetchFromStorage('user')
    const student_record = fetchFromStorage('student_record')
    const [announcements, setAnnouncements] = useState([])
    const [classes, setClasses] = useState([])
    const getAnnouncements = useCallback(async() => {
        const {data} = await axiosInstance.get(`/announcements?school=${user.school}`)
        setAnnouncements(data.announcements)
        const res = await axiosInstance.get(`/classes?grade_level=${student_record.grade_level}&section=${student_record.section}&school=${user.school}`)
        setClasses(res.data.classes)
    },[user.school])

    useEffect(() =>{
        getAnnouncements()
    }, [getAnnouncements])

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AuthenticatedAppBar />
            <CustomDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Alert variant="filled" severity="info" action={
                    <Typography>{yearNow} - {yearNow + 1}</Typography>
                }>
                    Current School Year  
                </Alert>
                <Grid container spacing={2} sx={{p: 2}}>
                    <Grid item xs={12} md={12} lg={8}>
                        <Typography variant="h6">My Classes</Typography>
                        <Box sx={{p: 2, width: '100%'}}>
                            {classes?.map((c, index) => (
                                <ClassList key={index} c={c}  />
                            ))}
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={12} lg={4}>
                        <Typography variant="h6">Announcements</Typography>
                        <Grid container spacing={2}>
                            {announcements?.map((item, index) => (
                                <Grid item xs={12} key={index}>
                                    <AnnouncementCard announcement={item} />
                                </Grid>
                            ))}
                            
                        </Grid>
                    </Grid>
                </Grid>
                <CustomBottomBar menu={studentMenu} />
            </Box>
        </Box>
    )
}

const ClassList = ({c}) => {
    return (
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        {c.className}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="body2">
                       Mr./Ms. {c.teacher_info.firstName} {c.teacher_info.lastName}
                    </Typography>
                    <Typography variant="caption" color="GrayText">
                    {c.start_time} - {c.end_time}
                    </Typography>
                </AccordionDetails>
            </Accordion>
    )
}

export default Dashboard

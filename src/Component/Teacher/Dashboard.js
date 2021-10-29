import {  Book, ExpandMore, Home,  ListAlt,  Settings } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Alert, Avatar, Card, CardActionArea, CardContent, CssBaseline, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useEffect, useState } from 'react'
import { AuthenticatedAppBar } from '../layout/CustomAppBar';
import CustomDrawer, { facultyMenu } from '../layout/CustomDrawer';
import {fetchFromStorage } from '../../library/utilities/Storage'
import axiosInstance from '../../library/axios'
import CustomBottomBar from '../layout/CustomBottomBar';
import { AnnouncementCard } from '../Admin/Announcements';
import { Link } from 'react-router-dom';

function Dashboard() {
    const yearNow = new Date().getFullYear()
    const user = fetchFromStorage('user')
    const [classes, setClasses] = useState([])
    const [announcements, setAnnouncements] = useState([])
    const getClasses = useCallback(async () => {
        const {data} = await axiosInstance.get(`/classes?teacher=${user._id}`)
        setClasses(data.classes)
        const {data: a } = await axiosInstance.get(`/announcements?school=${user.school}&audience=teacher`)
        setAnnouncements(a.announcements)
    }, [user._id])
    useEffect(() => {
        getClasses()
    },[getClasses])
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AuthenticatedAppBar />
            <CustomDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Typography variant="h6">Welcome back, {user.firstName} {user.lastName} </Typography>
                <Grid container spacing={2} sx={{p: 2}}>
                    <Grid item xs={12} md={12} lg={8}>
                        <Typography variant="h6">My Classes</Typography>
                        <Box sx={{pt: 2, pb:2, width: '100%'}}>
                            {classes?.slice(0,5).map((c, index) => (
                                <ClassCard c={c} key={index} />
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
            </Box>
            <CustomBottomBar menu={facultyMenu} />
        </Box>
    )
}

export const ClassCard = ({c})=> {

    return (
        <CardActionArea component={Link} to={`/faculty-classes/${c._id}`}>
            <Card elevation={5} sx={{borderRadius: 2}}>
                <CardContent>
                    <Typography variant="h6">
                        {c.className}
                    </Typography>
                    <Typography variant="body2">
                         Grade {c.grade_level} - {c.section}
                    </Typography>
                    <Typography variant="caption" color="GrayText">
                        {c.start_time} - {c.end_time}
                    </Typography>
                </CardContent>
            </Card>
        </CardActionArea>
        // <Accordion>
        //     <AccordionSummary
        //         expandIcon={<ExpandMore />}
        //     >
        //         <Typography sx={{ width: '33%', flexShrink: 0 }}>
        //             {c.className}
        //         </Typography>
        //     </AccordionSummary>
        //     <AccordionDetails>
        //         <Typography variant="body2">
        //             Grade {c.grade_level} - {c.section}
        //         </Typography>
        //         <Typography variant="caption" color="GrayText">
        //         {c.start_time} - {c.end_time}
        //         </Typography>
        //     </AccordionDetails>
        // </Accordion>
    )
}
export default Dashboard

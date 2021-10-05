import { AccountCircle, Book, Home, Inbox, ListAlt, Mail, Settings } from '@mui/icons-material';
import { Avatar, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useEffect, useState } from 'react'
import axios from '../../library/axios';
import { AuthenticatedAppBar } from '../layout/CustomAppBar';
import CustomDrawer from '../layout/CustomDrawer';

function Dashboard() {
    const [school, setSchool] = useState(null)
    const user = JSON.parse(sessionStorage.getItem('user'))
    const getSchool = useCallback ( async () => {
        const response = await axios.get(`/schools/${user.school}`)
        console.log(response)
        setSchool(response.data.school)
    },[])
    useEffect(() => {
        getSchool()
    }, [getSchool])
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AuthenticatedAppBar />
            <CustomDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Typography variant="h4">{school?.name}</Typography>
                <Typography variant="caption" color="GrayText">School ID: {school?.schoolId} / Region {school?.region} - {school?.division}</Typography>
            </Box>
        </Box>
    )
}

export default Dashboard

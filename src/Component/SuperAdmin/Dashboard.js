
import { Add, Preview } from '@mui/icons-material';
import { Button, Container, CssBaseline, Paper, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { fetchFromStorage } from '../../library/utilities/Storage';
import { AuthenticatedAppBar } from '../layout/CustomAppBar';
import CustomBottomBar from '../layout/CustomBottomBar';
import CustomCarousel from '../layout/CustomCarousel';
import CustomDrawer, { superadminMenu } from '../layout/CustomDrawer';

function Dashboard() {
    const user = fetchFromStorage('user')
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AuthenticatedAppBar />
            <CustomDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Typography variant="h6" gutterBottom sx={{mb: 3}}>Welcome back, Super Admin {user.firstName} </Typography>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                    <Typography variant="h6">Your Announcements </Typography>
                    <div>
                        <Button size='small' variant='contained' color="primary" startIcon={<Add />} sx={{mr: 2}}>Add New Announcement</Button>
                        <Button size='small' variant='outlined' color="primary" startIcon={<Preview />}>Preview</Button>
                    </div>
                </div>
                
            </Box>
            <CustomBottomBar menu={superadminMenu} />
            </Box>
    )
}

export default Dashboard


import { CssBaseline, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { AuthenticatedAppBar } from '../layout/CustomAppBar';
import CustomDrawer from '../layout/CustomDrawer';

function Dashboard() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AuthenticatedAppBar />
            <CustomDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Typography variant="h6">Good day.</Typography>
            </Box>
            </Box>
    )
}

export default Dashboard

import { CssBaseline, Grid, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { AuthenticatedAppBar } from '../layout/CustomAppBar'
import CustomDrawer from '../layout/CustomDrawer'

function Forms() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AuthenticatedAppBar />
            <CustomDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Typography variant="h6">My School Forms</Typography>
                <Grid container spacing={2} sx={{p: 2}}>
                    <Grid item xs={12} md={6} lg={6}>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Forms

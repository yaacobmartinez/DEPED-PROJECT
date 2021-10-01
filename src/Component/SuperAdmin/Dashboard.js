import { AccountCircle, Book, Home, Inbox, ListAlt, Mail, Settings } from '@mui/icons-material';
import { Avatar, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { AuthenticatedAppBar } from '../layout/CustomAppBar';
import { green } from '@mui/material/colors';
import { useHistory } from 'react-router';
import CustomDrawer from '../layout/CustomDrawer';
const drawerWidth = 300;

function Dashboard() {
    const {push} = useHistory()
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

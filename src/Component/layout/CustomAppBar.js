import { AccountCircle, Notifications } from '@mui/icons-material'
import { AppBar, Badge, IconButton, Toolbar} from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

function CustomAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" style = {{background: '#034F8B', height: '10vh', display: 'flex', justifyContent: "center"}}>
                <Toolbar>
                    <img src = "./depedicon.png" alt="logo" style={{height: '8vh', }}/>
                </Toolbar>
            </AppBar>
        </Box>
    )
}


export const AuthenticatedAppBar = () => {
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} style = {{background: '#034F8B', height: '10vh', display: 'flex', justifyContent: "center"}}>
            <Toolbar>
                <img src = "./depedicon.png" alt="logo" style={{height: '8vh', }}/>
                <Box sx={{flexGrow: 1}} />
                <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                >
                <Badge badgeContent={17} color="error">
                    <Notifications />
                </Badge>
                </IconButton>
                <IconButton color="inherit">
                    <AccountCircle />
                </IconButton>
            </Toolbar>
        </AppBar> 
    )
}
export default CustomAppBar

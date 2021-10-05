import { AccountCircle, Logout, Notifications, Settings } from '@mui/icons-material'
import { AppBar, Badge, Divider, IconButton, ListItemIcon, Menu, MenuItem, MenuList, Toolbar} from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useHistory } from 'react-router'

function CustomAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" style = {{background: '#034F8B', height: '10vh', display: 'flex', justifyContent: "center"}}>
                <Toolbar>
                    <img src = "../depedicon.png" alt="logo" style={{height: '8vh'}}/>
                </Toolbar>
            </AppBar>
        </Box>
    )
}


export const AuthenticatedAppBar = () => {
    const {push} = useHistory()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logOut = () => {
        sessionStorage.clear()
        push('/')
    }
    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} style = {{background: '#034F8B'}}>
            <Toolbar>
                <img src = "../depedicon.png" alt="logo" style={{height: '50px', }}/>
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
                <IconButton color="inherit" onClick={handleClick}>
                    <AccountCircle />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuList dense sx={{width: 200}}>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <AccountCircle fontSize="small" />
                            </ListItemIcon>
                            Profile
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={logOut}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Toolbar>
        </AppBar> 
    )
}
export default CustomAppBar

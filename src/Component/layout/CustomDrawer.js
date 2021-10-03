import { AccountCircle, Book, Home, ListAlt, Settings } from '@mui/icons-material';
import { Avatar, Divider, Drawer, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system';
import SchoolIcon from '@mui/icons-material/School';
import React from 'react'
import { useHistory } from 'react-router';
const drawerWidth = 300;

const superadminMenu = [
    {
        name: 'Home', 
        icon: <Home />,
        link: '/control-panel'
    },
    {
        name: 'User Accounts', 
        icon: <AccountCircle />,
        link: '/control-panel/users'
    },
    {
        name: 'Schools', 
        icon: <SchoolIcon />,
        link: '/control-panel/schools'
    },
]

const facultyMenu = [
    {
        name: 'Home', 
        icon: <Home />,
        link: '/faculty'
    },
    {
        name: 'My Classes', 
        icon: <Book />,
        link: '/faculty/classes'
    },
    {
        name: 'Forms', 
        icon: <ListAlt />,
        link: '/faculty/forms'
    },
]

function CustomDrawer() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const {push} = useHistory()
    return (
        <Drawer
            variant="permanent"
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
            }}
        >
        <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
            <Divider />
            <List>
                {user.access_level === 4096 && superadminMenu.map((item, index) => (
                    <ListMenuItem item={item} callback={() => push(item.link)} key={index}/>
                ))}
                {user.access_level === 3 && facultyMenu.map((item, index) => (
                    <ListMenuItem item={item} callback={() => push(item.link)} key={index}/>
                ))}
                <div style={{position: 'fixed', bottom: 0, width: drawerWidth}}>
                    <Divider />
                    <ListItem secondaryAction={
                            <IconButton edge="end">
                                <Settings />
                            </IconButton>
                        }
                    >
                        <ListItemAvatar>
                            <Avatar src="/test.jpg"/>
                        </ListItemAvatar>
                        <ListItemText primary={<Typography variant="subtitle2">{user.firstName} {user.lastName}</Typography>} 
                        secondary={<Typography variant="caption" color="textSecondary">{user.email}</Typography>} />
                    </ListItem>
                </div>
            </List>
            </Box>
        </Drawer>
    )
}

const ListMenuItem = ({item, callback}) => {
    return (
        <ListItem button onClick={callback}>
            <ListItemIcon>
            {item.icon}
            </ListItemIcon>
            <ListItemText primary={<Typography variant="subtitle2">{item.name}</Typography>} />
        </ListItem>
    )
}
export default CustomDrawer

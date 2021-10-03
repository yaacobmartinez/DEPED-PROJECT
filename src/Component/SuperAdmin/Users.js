import { Add } from '@mui/icons-material';
import { Avatar, Button, CssBaseline, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputLabel, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, MenuItem, Paper, Select, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { AuthenticatedAppBar } from '../layout/CustomAppBar';
import { green } from '@mui/material/colors';
import { useHistory } from 'react-router';
import CustomDrawer from '../layout/CustomDrawer';
import axios from '../../library/axios'
import { returnAccessLevelString } from '../utils/functions';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AlertDialog } from '../LandingPage';
const drawerWidth = 300;


function Users() {
    const {push} = useHistory()
    const [users, setUsers] = React.useState([])
    const [newUser, setNewUser] = React.useState(false)
    const getUsers = React.useCallback(
        async () => {
            const res = await axios.get(`/users`)
            console.log(res.data)
            setUsers(res.data.users)
        },
    [])
    React.useEffect(() => {
        getUsers()
    }, [getUsers])

    
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AuthenticatedAppBar />
            <CustomDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Typography variant="h6">Manage Users Accounts</Typography>
                <NewUserModal open={newUser} onClose={() => setNewUser(false)} refreshList={getUsers} />
                <div style={{display: 'flex', justifyContent:"flex-end", alignItems: 'center', margin: "20px 0px"}}>
                    <Button 
                        onClick={() => setNewUser(true)}
                        variant="contained" size="small" color="primary" startIcon={<Add /> }>Add new User</Button>
                </div>
                <TableContainer component={Paper}>
                    <Table  size="small" >
                        <TableHead>
                            <TableRow>
                                <TableCell>Full Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell align="center">Access Allowed?</TableCell>
                                <TableCell>Access Level</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users?.map((user, index) => (
                                <UserRow user={user} key={index}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            </Box>
    )
}

const UserRow = ({user}) => {
    const [checked, setChecked] = React.useState(user.provisioned);
    const {push} = useHistory()
    const [provisionDialog, setProvisionDialog] = React.useState(false)

    const onChange = (state) => {
        setChecked(state)
    }
    return (
        <TableRow hover>
            <TableCell onClick={() => push(`/user/${user._id}`)}>{user.firstName} {user.lastName}</TableCell>
            <TableCell onClick={() => push(`/user/${user._id}`)}>{user.email}</TableCell>
            <TableCell align="center"><Switch readOnly checked={checked} onChange={() => setProvisionDialog(true)}/></TableCell>
            <TableCell>{returnAccessLevelString(user.access_level)}</TableCell>
            <ProvisionDialog 
                id={user._id} 
                user={user} 
                open={provisionDialog}
                onClose={() => setProvisionDialog(false)}
                onChange={onChange}
            />
        </TableRow>
    )
}

const ProvisionDialog = ({id, user, open, onClose, onChange}) => {
    const [loading, setLoading] = React.useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await axios.post(`/users/provision/${id}`, 
        {
            provision: !user.provisioned, 
            access_level: user.access_level
        })
        console.log(res.data)
        onChange(!user.provisioned)
        onClose()
    }
    return (
        <Dialog open={open} onClose={onClose} component="form" onSubmit={handleSubmit}>
            <DialogTitle>Allow Access?</DialogTitle>
            <DialogContent>
                {user.access_level !== 3
                    ?(
                        <p>Are you sure you want to {user.provisioned ? 'revoke' : 'give'} access to this user?</p>
                    ): (
                        <p>Please update the student record first before granting access to a Student account.</p>
                    )}
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" size="small" disabled={loading} onClick={onClose}>Cancel</Button>
                {
                    user.access_level !== 3 && (
                        <Button variant="contained" size="small" type="submit" disabled={loading} color="primary">Save</Button>
                    ) 
                }
            </DialogActions>
        </Dialog>
    )
}

const NewUserModal = ({open, onClose, refreshList}) => {
    const accountsAvailable = [
        {
            text: 'Faculty', 
            value: 2
        },
        {
            text: 'Administrator', 
            value: 2048
        },
        {
            text: 'Super Administrator', 
            value: 4096
        },
    ]
    const [message, setMessage] = React.useState(null)
    const [success, setSuccess] = React.useState("error")
    const [loading, setLoading] = React.useState(false)
    const now = new Date()
    const defaultPassword = "DEPED" + (now.getUTCMonth() + 1) + "" + now.getDate()  + "" + now.getFullYear()
    const {errors, handleChange, values, handleBlur, handleSubmit} = useFormik({
        initialValues: {
          firstName: '',
          lastName: '',
          email: '',
          password: defaultPassword,
          confirmed: true, 
          access_level: 2, 
          provisioned: true
        }, 
        validationSchema: Yup.object({
          firstName: Yup.string()
            .required('First Name is required.'),
          lastName: Yup.string()
            .required('Last Name is required.'),
          email: Yup.string()
            .email('We need a valid email address')
            .required('Email Address is required.'),
          access_level: Yup.number()
            .required('Access Level is required.')
            
        }), 
        onSubmit:  async (values, {resetForm}) => {
            setLoading(true)
            const {data} = await axios.post('/users',values)
            console.log(data)
            setLoading(false)
            setMessage(data.success 
                ? 'User Account Created.' 
                : data.message )
            setSuccess(data.success ? 'success' : 'error')
            resetForm()
            refreshList()
            onClose()
        }
      })
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth component="form" onSubmit={handleSubmit}>
            <AlertDialog callback={() => setMessage(null)} message={message} success={success}/>
            <DialogTitle>Add New User Account</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} xs={12}>
                    <Grid item xs={6}>
                        <TextField
                            size="small"
                            margin="normal"
                            required fullWidth
                            label="First Name"
                            name="firstName"
                            autoFocus
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.firstName}
                            helperText={errors.firstName}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            size="small"
                            margin="normal"
                            required fullWidth
                            label="Last Name"
                            name="lastName"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.lastName}
                            helperText={errors.lastName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            size="small"
                            margin="normal"
                            required fullWidth
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.email}
                            helperText={errors.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>User Level Access</InputLabel>
                            <Select
                                size="small"
                                value={values.access_level}
                                label="User Level Access"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="access_level"
                            >
                                {accountsAvailable.map((account) => (
                                    <MenuItem value={account.value}>{account.text}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>   
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" size="small" disabled={loading} onClick={onClose}>Cancel</Button>
                <Button variant="contained" size="small" type="submit" disabled={loading} color="primary">Create Account</Button>
            </DialogActions>
        </Dialog>
    )
}
export default Users

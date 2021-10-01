import { CssBaseline, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useParams } from 'react-router'
import { AuthenticatedAppBar } from '../layout/CustomAppBar'
import CustomDrawer from '../layout/CustomDrawer'
import axios from '../../library/axios'

function User() {
    const {id} = useParams()
    const [user, setUser] = React.useState(null)
    const [errorFetching, setErrorFetching] = React.useState(false)
    const getUser = React.useCallback(
        async () => {
            const res = await axios.get(`/users/${id}`)
            console.log(res.data)
            if (!res.data.success) return setErrorFetching(true)
            return setUser(res.data.user)
        },
        [id],
    )
    React.useEffect(() => {
        getUser()
    },[getUser])
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AuthenticatedAppBar />
            <CustomDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Typography variant="h6">Manage User Account</Typography>
                {errorFetching && 'The User you are looking for cannot be found. Try going back.'}
                {user && (
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                )}
            </Box>
        </Box>
    )
}

export default User

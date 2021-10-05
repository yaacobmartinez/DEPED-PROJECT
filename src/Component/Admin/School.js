import { Button, CssBaseline, Grid, TextField, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useFormik } from 'formik'
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import axiosInstance from '../../library/axios'
import { fetchFromStorage } from '../../library/utilities/Storage'
import { AuthenticatedAppBar } from '../layout/CustomAppBar'
import CustomDrawer from '../layout/CustomDrawer'
import * as Yup from 'yup';
import { SchoolDetails } from '../SuperAdmin/School'

function School() {
    const user = fetchFromStorage('user')
    const [school, setSchool] = useState(null)

    const getSchool = useCallback(
        async () => {
            const {data} = await axiosInstance.get(`/schools/${user.school}`)
            console.log(data)
            setSchool(data.school)
        },
        [user.school],
    )

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
                <Typography variant="h6">{`Manage School Information`}</Typography>
                {school && (
                    <SchoolDetails school={school} />
                )}
            </Box>
        </Box>
    )
}

export default School

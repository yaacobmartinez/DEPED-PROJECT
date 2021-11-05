import { Button, CssBaseline, Grid, Toolbar, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { formatDistanceToNowStrict } from 'date-fns'
import React, { useCallback, useEffect, useState } from 'react'
import axiosInstance from '../../library/axios'
import { fetchFromStorage } from '../../library/utilities/Storage'
import { AuthenticatedAppBar } from '../layout/CustomAppBar'
import CustomDrawer from '../layout/CustomDrawer'
import { formatBytes } from '../utils/functions'

function Forms() {
    const user = fetchFromStorage('user')
    const [forms, setForms] = useState([])
    const [pageSize, setPageSize] = React.useState(10);
    const getForms = useCallback(async() => {
        const {data} = await axiosInstance.get(`/forms/student/${user._id}`)
        console.log(data)
        setForms(data.forms)
    },[user._id])
    useEffect(() => {
        getForms()
    }, [getForms])
    const handleDownload = async (path) => {
        const {data} = await axiosInstance.get(`/modules/download?path=${path}`)
        console.log(data.link)
        window.open(data.link, '_blank')
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AuthenticatedAppBar />
            <CustomDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Typography variant="h6" style={{marginBottom: 20}}>My School Forms</Typography>
                    {forms && (
                        <DataGrid rows={forms} 
                            autoHeight 
                            rowHeight={35}
                            getRowId={(row) => row._id}
                            components={{
                                Toolbar: GridToolbar,
                            }}
                            columns={[
                                { 
                                    field: 'type', 
                                    headerName: 'Form Type',
                                    minWidth: 250,
                                    renderCell: cell => {
                                        return (
                                            <Typography variant="body2" color="black" >{cell.value}</Typography>
                                        )
                                    }
                                },
                                { 
                                    field: 'original_name', 
                                    headerName: 'File',
                                    minWidth: 250,
                                    renderCell: cell => {
                                        return (
                                            <Typography variant="body2" color="black" >{cell.value}</Typography>
                                        )
                                    }
                                },
                                { 
                                    field: 'title', 
                                    headerName: 'Title',
                                    minWidth: 200,
                                    renderCell: cell => {
                                        return (
                                            <Typography variant="body2" color="black" >{cell.value}</Typography>
                                        )
                                    }
                                },
                                { 
                                    field: 'size', 
                                    headerName: 'Size',
                                    minWidth: 50,
                                    renderCell: cell => {
                                        return (
                                            <Typography variant="body2" color="black" >{formatBytes(cell.value)}</Typography>
                                        )
                                    }
                                },
                                { 
                                    field: 'date_created', 
                                    headerName: 'Date Uploaded',
                                    width: 180,
                                    renderCell: cell => {
                                        return (
                                            <Typography variant="body2" color="black" >{formatDistanceToNowStrict(new Date(cell.value), { addSuffix: true })}</Typography>
                                        )
                                    }
                                },
                                { 
                                    field: 'file', 
                                    headerName: 'Action',
                                    minWidth: 250,
                                    renderCell: cell => {
                                        return (
                                            <Button size="small" variant="contained" onClick={() => handleDownload(cell.value)}>Download</Button>
                                        )
                                    }
                                },
                            ]}
                            rowsPerPageOptions={[5, 10, 20]}
                            pagination
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        />
                    )}
                
            </Box>
        </Box>
    )
}

export default Forms

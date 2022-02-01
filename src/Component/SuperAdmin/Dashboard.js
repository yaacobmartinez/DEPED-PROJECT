
import { Add, CloudDownload, Delete, FilePresent, Preview } from '@mui/icons-material';
import { Avatar, Button, Container, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, ListItem, ListItemAvatar, ListItemText, Paper, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import ImageViewer from 'react-simple-image-viewer';

import axiosInstance from '../../library/axios';
import { fetchFromStorage } from '../../library/utilities/Storage';
import { AuthenticatedAppBar } from '../layout/CustomAppBar';
import CustomBottomBar from '../layout/CustomBottomBar';
import CustomCarousel from '../layout/CustomCarousel';
import CustomDrawer, { superadminMenu } from '../layout/CustomDrawer';

function Dashboard() {
    const user = fetchFromStorage('user')
    const [newAnnouncement, setNewAnnouncement] = useState(false)
    const [announcements, setAnnouncements] = useState(null)
    const getAnnouncements = useCallback(async() => {
        const {data} = await axiosInstance.get(`/globals`)
        console.log(data)
        setAnnouncements(data.images)
    }, [])
    useEffect(() => {
        getAnnouncements()
    },[getAnnouncements])
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AuthenticatedAppBar />
            <CustomDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Typography variant="h6" gutterBottom sx={{mb: 3}}>Welcome back, Super Admin {user.firstName} </Typography>
                {newAnnouncement && (
                    <NewAnnouncementDialog open={newAnnouncement} onClose={()=> setNewAnnouncement(false)} onChange={getAnnouncements}/>
                )}
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 10}}>
                    <Typography variant="h6">Your Announcements </Typography>
                    <div>
                        <Button size='small' variant='contained' color="primary" startIcon={<Add />} sx={{mr: 2}} onClick={()=>setNewAnnouncement(true)}>Add New Announcement</Button>
                    </div>
                </div>
                <Grid container spacing={2} sx={{mt: 2}}>
                    {announcements?.map((a, index)=> (
                        <AnnouncementComponent a={a} key={index} onChange={getAnnouncements}/>
                    ))}
                </Grid>
                
                
            </Box>
            <CustomBottomBar menu={superadminMenu} />
            </Box>
    )
}

const AnnouncementComponent = ({a, onChange}) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [links, setLinks] = useState([a.link])
    const [remove, setRemove] = useState(false)

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
      }, []);

      const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
      };
    return (
        <>
            <Grid item xs={12} sm={4} style={{cursor: 'pointer'}}>
                <Box style={{background: '#eee', width:'200', height: 200, borderRadius: 10}} sx={{boxShadow: 5}} onClick={() => openImageViewer(0)}>
                    <img src={a.link} alt={a.image} style={{borderRadius: 10, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left'}} />
                </Box>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <IconButton size="small" color="secondary" onClick={() => setRemove(true)}>
                        <Delete fontSize="small" />
                    </IconButton>
                </div>
            </Grid>
            <RemoveAnnouncement open={remove} onClose={ () => setRemove(false)} id={a.image} onChange={onChange}/>
            {isViewerOpen && (
                <ImageViewer
                    src={links}
                    currentIndex={currentImage}
                    disableScroll={ false }
                    closeOnClickOutside={true}
                    backgroundStyle={{
                        backgroundColor: "rgba(0,0,0,0.7)"
                    }}
                    onClose={closeImageViewer}
                />
            )}
        </>
    )
}

const RemoveAnnouncement = ({id, open, onClose, onChange}) => {

    const handleRemove = async () => {
        const {data} = await axiosInstance.delete(`/globals?key=${id}`)
        console.log(data)
        onClose()
        onChange()
    }
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Announcement</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to remove this announcement? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="primary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="contained" color="error" onClick={handleRemove}>
                    Remove
                </Button>
            </DialogActions>
        </Dialog>
    )
}


const NewAnnouncementDialog = ({open, onClose, onChange}) => {
    const maxFiles = 1
    const [file, setFile] = useState(null)
    const [fileError, setFileError] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const {getRootProps, getInputProps} = useDropzone({
        maxFiles,
        accept: 'image/*,.pdf,.doc,.docx,.pptx,.ppt',
        onDrop: (acceptedFiles, rejectedFiles) => {
            if(rejectedFiles.length > 0) {
                return setFileError(true)
            }
            setFile(acceptedFiles[0])
            console.log('accepted => ',acceptedFiles)
            console.log('rejected =>', rejectedFiles)
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        if (!file) return 
        const form = new FormData()
        form.append('media', file)
        const {data} = await axiosInstance.post(`/globals/61f9005cec90d029bfdc9571`, form)
        console.log(data)
        onChange()
        onClose()
    }
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add New Announcement</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} component="form" sx={{mt: 2}} onSubmit={handleSubmit}>
                    <Grid item xs={12}>
                        {!file ? (
                            <section style={{minHeight: 120, 
                                    border: fileError ? 'dashed 1px red' : 'dashed 1px #8aa1b1', padding: 10, textAlign: 'center'}}>
                                <div {...getRootProps({ className: 'dropzone' })}>
                                    <input {...getInputProps()} />
                                    <Typography variant="body2" color="GrayText">
                                        Drag 'n' drop some files here, or click to select files <br />
                                        <em>(Only images, .doc, .docx, .pdf, .pptx, .ppt files will be accepted)</em>
                                    </Typography>
                                    <CloudDownload style={{fontSize: 50, color: '#8aa1b1'}} />          
                                    {fileError && (
                                        <Typography variant="subtitle2" color="red">
                                            Please upload only {maxFiles} file/s.
                                        </Typography>
                                    )}                      
                                </div>
                            </section>
                            ): (
                                <ListItem 
                                    secondaryAction={
                                        <IconButton size="small" onClick={() => setFile(null)}>
                                            <Delete fontSize="small"/>
                                        </IconButton>
                                    }>
                                    <ListItemAvatar>
                                        <Avatar style={{height: 30, width: 30}}>
                                            <FilePresent fontSize="small" />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={file.name} />
                                </ListItem>
                            )}
                    </Grid>
                    <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Button size="small" color="primary" variant="outlined" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button size="small" color="primary" variant="contained" disabled={!file || isSubmitting } type="submit">
                            Save Announcement
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}
export default Dashboard

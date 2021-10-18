import { ExpandMore } from '@mui/icons-material';
import { Alert, CssBaseline, Toolbar, Typography, Grid, Card, CardMedia, CardContent,  Button, CardActionArea, Accordion, AccordionSummary, AccordionDetails, AccordionActions } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { AuthenticatedAppBar } from '../layout/CustomAppBar';
import CustomBottomBar from '../layout/CustomBottomBar';
import CustomDrawer, { studentMenu } from '../layout/CustomDrawer';

function Dashboard() {
    const yearNow = new Date().getFullYear()
    
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AuthenticatedAppBar />
            <CustomDrawer />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Alert variant="filled" severity="info" action={
                    <Typography>{yearNow} - {yearNow + 1}</Typography>
                }>
                    Current School Year  
                </Alert>
                <Grid container spacing={2} sx={{p: 2}}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6">Announcements</Typography>
                        <Grid container spacing={2}>
                            {Array.from(new Array(5)).map((item, index) => (
                                <AnnouncementCard announcement={index} key={index} />
                            ))}
                            
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6">My Academic Records</Typography>
                        <Box sx={{p: 2, width: '100%'}}>
                            {Array.from(new Array(6)).map((el, index) => (
                                <AcademicGradeSummaryCard key={index} details={{grade_level: index + 1}} />
                            ))}
                            
                        </Box>
                    </Grid>
                </Grid>
                <CustomBottomBar menu={studentMenu} />
            </Box>
        </Box>
    )
}

const AnnouncementCard = ({announcement}) => {
    return (
    <Grid item xs={12}>
        <CardActionArea>
            <Card>
                <CardMedia
                    component="img"
                    height="200"
                    image="./Images/announcements/1.png"
                    alt="sample announcement"
                    />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                    Test Announcement {announcement}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        This is a test announcement.
                    </Typography>
                </CardContent>
            </Card>
        </CardActionArea>
    </Grid>
    )
}

const AcademicGradeSummaryCard = ({details}) => {
    return (
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Grade {details.grade_level}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>
                        {details.grade_level === 1 && 'Ongoing' }
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Passed: Yes; Final Average Grade: 76%
                    </Typography>
                </AccordionDetails>
                <AccordionActions>
                    <Button variant="outlined" color="primary" size="small">View Details</Button>
                </AccordionActions>
            </Accordion>
    )
}

export default Dashboard

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { CssBaseline, Grid, Link, Paper, TextField} from '@mui/material';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LockIcon from '@mui/icons-material/Lock';





export const LandingPage = () => {
    return(
      <div>
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"  style = {{background: '#C9C8C8'}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img src = "./Images/icon1.png" alt="logo" sx={{ flexGrow: 1 }} style = {{height: '35px'}}/>
          </Typography>
          <Button color="inherit"  style = {{color: '#034F8B'}} Link href="/register">Create Account</Button>
          <Button color="inherit" style = {{color: '#034F8B'}} >Help <HelpOutlineIcon/> </Button>

        </Toolbar>
      </AppBar>
    </Box>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style = {{background: '#034F8B'}}>
        <Toolbar>
          <img src = "./depedicon.png" alt="logo" sx={{ flexGrow: 1 }}/>
        </Toolbar>
      </AppBar>
    </Box>
    <Grid container sx = {{height: '60vh'}}>
      <CssBaseline />
      <Grid item xs= {false} sm={4} md={7} 

        sx={{
          backgroundImage: 'url(./Images/slide1.jpg)',
          backgroundRepeat: "norepeat",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>
        <Box sx={{
          my: 8, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
          <LockIcon />
          <Typography component='h1' variant="h5">
            Sign in to your account
          </Typography>
          <Box component="form" noValidate sx = {{ mt: 1 }}>
            <TextField
              margin="normal"
              required fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              />
            <TextField
              margin="normal"
              required fullWidth
              label="Password"
              name="password"
              type="password"
              autoComplete="password"
              autoFocus
              />
              <Button type="submit" fullWidth variant="contained" sx= {{mt: 3, mb: 2}}>
                Sign In
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="/fogot-password" variant="body2">
                    Forgot Password?
                  </Link>
                </Grid>
                <Grid item xs>
                  <Link href="/register" variant="body2">
                    Don't have an account? Sign Up.
                  </Link>
                </Grid>
              </Grid>  
          </Box>
        </Box>
      </Grid>
    </Grid>
      </div>
    )
  }
  
import {React, useState} from 'react'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container} from '@mui/material'
import { Link as RouterLink, useNavigate, useParams} from 'react-router-dom';
import axios from "axios";
import { ClassNames } from '@emotion/react';
const theme = createTheme();

function Home2Component() {
  let {name} = useParams();
  console.log(ClassNames)
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome {name}
          </Typography>
          
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Avatar 
            />
          
            {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Out
            </Button> */}
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link component={RouterLink} to="/" variant="body2">
                  {"Sign Out"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  )
}

export default Home2Component

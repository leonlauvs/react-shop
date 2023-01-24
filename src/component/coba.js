import {React, useState} from 'react'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container} from '@mui/material'
import { Link as RouterLink, useNavigate} from 'react-router-dom';
import axios from "axios";
const theme = createTheme();

function CobaComponent() {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [name, setName] = useState("");
    // const [angka, setAngka] = useState("");

    const [state, setState] = useState({
        nama:"",
        angka:0,
        desc: ""
    });

    const handleChange = (fieldName, value) => {
        let newState = {...state}
        newState[fieldName] = value
        setState(newState)
    }

    const navigate = useNavigate();

    // const numericOnly = (e) =>{
    //   const re = /^[0-9\b]+$/;
    //   if (e.target.value === '' || re.test(e.target.value)) {
    //     this.setState({value: e.target.value})
    //     setAngka(e.target.value)
    //   }
    // }

    // const prosesLogin = async (e) => {
    //   e.preventDefault();
    //   console.log('tombol Login ditekan');

    //   try{
    //       const url_api = "https://pleasant-long-underwear-toad.cyclic.app/users/login";
    //       const response = await axios.post(url_api,{
    //           email: email,
    //           password: password,
    //       });

    //       if(response){
    //           console.log('berhasil login');
    //           console.log(response.data);
    //           console.log(response.data.data.name);
    //          navigate(`/home/${response.data.data.name}`);
    //       }
    //       else{
    //           console.log('gagal login');
    //       }
    //   }
    //   catch(error){
    //       console.log(error);
    //   }
    // }
  
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
            <Typography component="h1" variant="h5">
            Coba
          </Typography>
        <input type="text" name="nama" onChange={(e) => handleChange("nama", e.target.value)} />
        <input type="text" name="angka" onChange={(e) => handleChange("angka", e.target.value)} />
        <input type="text" name="desc" onChange={(e) => handleChange("desc", e.target.value)} />
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          
          <Box component="form" noValidate sx={{ mt: 1 }}>
          {/* <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nama"
              name="name"
              autoComplete="name"              
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              input
              margin="normal"
              required
              fullWidth
              id="angka"
              label="Angka"
              name="angka"
              autoComplete="angka"              
              onChange={(e) => setAngka(e.target.value)}
            /> */}
            <Typography component="h1" variant="h5">
              {state.nama +" "+state.angka+" "+state.desc}
            </Typography>

            {/* <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  )
}

export default CobaComponent

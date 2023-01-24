import {React, useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container} from '@mui/material'
import { Link as RouterLink, useNavigate} from 'react-router-dom';
import { currencyFormat, backToPrevious } from "../../utils/functions";
import axios from "axios";
const theme = createTheme();

function UpdateProfileComponent() {
    const navigate = useNavigate();
    const params = useParams();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");  
    const [dataUser, setDataUser] = useState(null);

    const url_api = "http://localhost:3000";

    useEffect(() => {
        getDataUser();
      }, []);

    const getDataUser = async() =>{        
    
        const response = await axios.get(url_api + "/users/"+ params.id);
        if(response){
          //console.log("response", response);
          setDataUser(response.data.data)
        }
    }

    // const backToPrevious = async() =>{    
    //     window.history.back();
    // }

    const updateProfile = async (e) => {
        e.preventDefault();
      console.log('tombol Login ditekan');

      try{
          const response = await axios.put(url_api+ "/users/edit/"+params.id,{
              name: name,
              email: email
          });

          if(response){
              console.log('berhasil login');
              console.log(response.data);
              console.log(response.data.data.name);
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("userdata", JSON.stringify(response.data.data));
            //  navigate(`/home/${response.data.data.name}`);
            navigate(`/product`);
          }
          else{
              console.log(response);
          }
      }
      catch(error){
          console.log(error);
      }
    };
  
  return (
    <ThemeProvider theme={theme}>
    {dataUser &&
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
            <Avatar />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Profile
          </Typography>
          <Typography
              noWrap
              component="div"
              display="inline"
           >
            Current Name : {dataUser.name}
           </Typography>
           <Typography
              noWrap
              component="div"
              display="inline"
           >
            Current Email : {dataUser.email}
           </Typography>
          <Box component="form" method="post" onSubmit={updateProfile} noValidate sx={{ mt: 1 }}>
          
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="New Name"
              name="name"
              autoComplete="name"
              autoFocus
              
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="New Email Address"
              name="email"
              autoComplete="email"
              
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"             
              onClick={backToPrevious}
            >
              Back
            </Button>
          </Box>
        </Box>
        
      </Container>
    }
    </ThemeProvider>
  )
}

export default UpdateProfileComponent

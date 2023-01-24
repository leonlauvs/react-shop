import * as React from "react";
import {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from '@mui/material/Tooltip';
import { urlApi } from "../../utils/functions";
import Link from "@mui/material/Link";
import { Link as RouterLink} from 'react-router-dom';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function DefaultAppBar() {
  const userdata = JSON.parse(localStorage.getItem("userdata"));

  const [cartCount, setCartCount] = useState(null);

    const url_api = "http://localhost:3000";

    useEffect(() => {
        getCartCount();
      }, []);

    const getCartCount = async() =>{        
    
        const response = await axios.get(urlApi + "/carts/count");
        if(response){
          // console.log("response", response);
          setCartCount(response.data.data)
        }
    }

  // console.log('userdata', userdata)

  const navigate = useNavigate();

  const gotoCart = () => {
    navigate("/cart");
  };

  const gotoProduct = () => {
    navigate("/product");
  };

  const gotoHistory = () => {
    navigate("/history");
  };

  const gotoHome = () => {
    navigate("/product");
  };

  const gotoUpdateProfile = () => {
    navigate("/updateProfile/"+ userdata.id);
  };

  const gotoSignOut = () => {
    navigate("/");
  };

  const dummyMenuItems = [
    {
      title: "Update Profile",
      value: "UpdateProfile"
    },
    {
      title: "Sign Out",
      value: "SignOut"
    }
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = e => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = (itemVal) => {
    setAnchorEl(null);
    if(itemVal === 'SignOut')
    {
      gotoSignOut();
    }
    else if(itemVal === 'UpdateProfile')
    {
      gotoUpdateProfile();
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Toko Online
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onKeyPress={e => e.key === 'Enter' && gotoProduct()}
            />
          </Search>
          <Typography
              noWrap
              component="div"
              sx={{ cursor: 'pointer' }}
              display="inline"
              onClick={gotoHome}
            >Products</Typography> 
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Tooltip title="Cart">
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={gotoCart}
            >{cartCount &&
              <Badge badgeContent={cartCount.count} color="error">
                <ShoppingCartIcon />
              </Badge>}
            </IconButton>
          </Tooltip>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              // onClick={gotoHistory}
            >
              <Badge badgeContent={0} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Tooltip title="Profile Setting">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                onClick={handleClick}
              >
                <AccountCircle />
              <Typography
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" },  ml: 1 }}
                display="inline"
              >welcome,
                <Typography
                noWrap
                component="div"
                sx={{ textDecoration: 'underline' }}
                display="inline"
              >{userdata.name}</Typography> 
              </Typography>
              </IconButton>   
            </Tooltip>                 
            
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {dummyMenuItems.map(item => (
                <MenuItem onClick={() =>handleClose(item.value)} key={item.title} value={item.value}>
                  {item.title}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

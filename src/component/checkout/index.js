import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  Box
} from "@mui/material";
import { currencyFormat,urlApi } from "../../utils/functions";

export default function CheckoutComponent() {
  const navigate = useNavigate();
  const [dataCart, setDataCarts] = useState([]);
  const [totalBayar, setTotalBayar] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [total, setTotal] = useState(0);
  const [country, setCountry] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  //const [createdBy, setCreatedBy] = useState("");
  const userdata = JSON.parse(localStorage.getItem("userdata"));

  function selectProps(...props){
    return function(obj){
      const newObj = {};
      props.forEach(name =>{
        newObj[name] = obj[name];
      });
      
      return newObj;
    }
  }

  React.useEffect(() => {
    getCart();
  }, []);

  const getCart = () => {
    const cart = JSON.parse(localStorage.getItem("purchases"));
    const newItems = cart.map(selectProps("productId", "qty", "price", "subtotal", "createdBy"));
    console.log('newItems',newItems);

    selectedItems.splice(0, selectedItems.length, ...newItems);
    console.log('setSelectedItems',selectedItems);
    let total = 0;
    if (cart) {
      setDataCarts(cart);
      cart.map((val) => {
        total = total + val.price * val.qty;
      });
      setTotalBayar(total);
      setTotal(total);
      console.log('total',total)
      console.log('totalBayar',totalBayar)
    }
  };

  const prosesSimpan = async (e) => {
    e.preventDefault();
    console.log('tombol Simpan ditekan');

    try{        
        const response = await axios.post(urlApi+ "/checkouts/create/",{
            firstName: firstName,
            lastName: lastName,
            address1: address1,
            address2: address2,
            city: city,
            state: state,
            zip: zip,
            total: total,
            country: country,
            createdBy: userdata.name,
            purchases: selectedItems
        });

        if(response){
            console.log('berhasil simpan');
            alert('berhasil simpan');
            navigate('/product');
        }
        else{
            console.log('gagal simpan');
        }
    }
    catch(error){
        console.log(error);
    }

  }

  return (
    <Container component="main" sx={{ mb: 4 }}>
      <Paper sx={{ mt: 3 }}>
        {dataCart.map((val, i) => (
          <Card key={i} elevation={2} sx={{ my: 1 }}>
            <Grid container>
              <Grid item xs={2}>
                <img
                  src={val.image}
                  srcSet={val.image}
                  alt={val.name}
                  loading="lazy"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={8} sx={{ p: 1 }}>
                <Typography variant="h5">{val.name}</Typography>
                <Typography variant="h6" fontWeight={"bold"} sx={{ mt: 3 }}>
                  {currencyFormat(val.price)} X {val.qty}
                </Typography>
              </Grid>
              <Grid
                item
                xs={2}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: 1,
                }}
              >
                <Typography
                  sx={{
                    borderBottom: 1,
                    mx: 1,
                    textAlign: "center",
                    fontSize: 20,
                  }}
                  variant="subtitle2"
                >
                  {currencyFormat(val.qty * val.price)}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        ))}
        <Stack direction="row" sx={{ p: 1 }} justifyContent="space-between">
          <Typography variant="h5">TOTAL BAYAR : </Typography>
          <Typography variant="h5">{currencyFormat(total)}</Typography>
        </Stack>
      </Paper>
      <Box component="form" method="post" onSubmit={prosesSimpan} noValidate sx={{ mt: 1 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Typography variant="h6" gutterBottom>
          Shipping address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
              onChange={(e) => setAddress1(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
              onChange={(e) => setAddress2(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
              variant="standard"
              onChange={(e) => setState(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
              onChange={(e) => setZip(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
              onChange={(e) => setCountry(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox color="secondary" name="saveAddress" value="yes" />
              }
              label="Use this address for payment details"
            />
          </Grid>
        </Grid>

        <Stack direaction="row" alignItems={"flex-end"}>
          <Button type="submit" variant="contained" sx={{ width: 100 }}>
            Simpan
          </Button>
        </Stack>
      </Paper>
      </Box>
    </Container>
  );
}

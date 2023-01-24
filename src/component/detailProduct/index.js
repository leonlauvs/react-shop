import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import { headerAxios } from "../../utils/headersAxio";
import { Link as RouterLink, useNavigate} from 'react-router-dom';

//import { dataProducts } from "../../utils/static";
import { currencyFormat, backToPrevious } from "../../utils/functions";

export default function DetailProductComponent() {
  const navigate = useNavigate();
  const userdata = JSON.parse(localStorage.getItem("userdata"));
  const url_api = "http://localhost:3000";

  const params = useParams();
  const [qty, setQty] = useState(0);
  const [dataDetail, setDataDetail] = useState(null);
  const [dataCart, setDataCart] = useState(null);
  const [buttonText, setButtonText] = useState(null);

  // const dataDetail = dataProducts.filter(
  //   (val) => val.id === parseInt(params.id)
  // );

  useEffect(() => {
    getDataProduct();
    getCartProduct();
    //updateState();
  }, []);

  const getDataProduct = async() =>{
    // const token = localStorage.getItem("token");
    // const headers = {
    //   Authorization: "Bearer " + token,
    // };

    const response = await axios.get(url_api + "/products/"+ params.id, {headers:headerAxios});
    if(response){
      //console.log("response", response);
      setDataDetail(response.data.data)
    }
  }

  const getCartProduct = async() =>{
   

    const response = await axios.get(url_api + "/carts?productId="+ params.id);
    if(response){
      console.log("getCartProduct", response.data.data);
      setDataCart(response.data.data)
      if(response.data.data != null)
      {        
        setQty(response.data.data.qty);
      }
      
    }
  }

  const updateCartProduct = async() =>{

    try{
      const response = await axios.put(url_api+ "/carts/edit/"+dataCart.id,{
          qty: qty,
          updatedBy: userdata.name
      });

      if(response){
          console.log('updateCartProduct');
          console.log(response.data);
          console.log(response.data.data.name);
          alert("Berhasil update Cart");
        //  navigate(`/home/${response.data.data.name}`);
        //localStorage.setItem("userdata", JSON.stringify(userdata));
        navigate(`/product`);
      }
      else{
          console.log(response);
      }
    }
    catch(error){
        console.log(error);
    }

    
  }

  const deleteCartProduct = async() =>{

    try{
      const response = await axios.delete(url_api+ "/carts/delete/"+dataCart.id);

      if(response){
          console.log('deleteCartProduct');
          alert("Berhasil delete Cart");
        //localStorage.setItem("userdata", JSON.stringify(userdata));
        navigate(`/product`);
      }
      else{
          console.log(response);
      }
    }
    catch(error){
        console.log(error);
    }
    
  }

  const insertCartProduct = async() =>{
    try{      
      const response = await axios.post(url_api+ "/carts/create",{
        productId : parseInt(params.id),
        qty: qty,
        createdBy: userdata.name
      });

      if(response){
          console.log('insertCartProduct');
          console.log(response.data);
          console.log(response.data.data.name);
          alert("Berhasil tambah ke Cart");
        navigate(`/product`);
      }
      else{
          console.log('insertCartProduct fail',response);
      }
    }
    catch(error){
        console.log(error);
    }

    
  }

  // {dataCart && setQty(dataCart.qty);}

  // const updateState = () => {
  //   const cart = JSON.parse(localStorage.getItem("cart"));
  //   if (cart) {
  //     let newCart = cart.filter((val) => val.id == dataDetail.id);
  //     if (newCart.length > 0) {
  //       setQty(newCart.qty);
  //     }
  //   }
  // };

  const checkSetButton = (quan) => {

    if(dataCart != null){
      if(quan !== parseInt(dataCart.qty)){
        if(quan !== 0){
          setButtonText('Update Cart')
        }
        else
        {
          setButtonText('Delete from Cart')
        }
      }
      else
      {
        setButtonText('Cancel')
      }
      
    }
    else{
      setButtonText('Insert to Cart')
    }

   
  }

  const qtyChange = (type) => {
    let newQty = qty;
    if (type === "min") {
      newQty--;
    } else {
      newQty++;
    }   

    if (newQty < 0) {
      newQty = 0;
    }
    else if (newQty > dataDetail.qty){
      newQty = dataDetail.qty;      
    }
    checkSetButton(newQty);
    setQty(newQty);
    
  };

  const updateCart = () => {
    if(dataCart != null){
      if(qty !== parseInt(dataCart.qty)){
        if(qty !== 0){
          updateCartProduct();
        }
        else
        {
          deleteCartProduct();
        }
      }
      else
      {
        backToPrevious();
      }
      
    }
    else{
      insertCartProduct();
    }
    
    // let cart = JSON.parse(localStorage.getItem("cart"));
    // let newDataDetail = {};
    // if (!cart) {
    //   cart = [];
    //   newDataDetail = dataDetail;
    // } else {
    //   let newCart = cart.filter((val) => val.id == dataDetail.id);
    //   if (newCart.length > 0) {
    //     newDataDetail = newCart;
    //   } else {
    //     newDataDetail = dataDetail;
    //   }
    // }
    // newDataDetail.qty = qty;
    // let allCart = cart.filter((val) => val.id != dataDetail.id);
    // allCart.push(newDataDetail);

    // localStorage.setItem("cart", JSON.stringify(allCart));
    // alert("Berhasil ditambahkan ke Cart");
  };

  return (
    <Container sx={{ mt: 2 }}>
      {dataDetail &&
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <img
            src={dataDetail.image}
            srcSet={dataDetail.image}
            alt={dataDetail.name}
            loading="lazy"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardHeader title={dataDetail.name} />
            <CardContent>
              <Typography variant="subtitle2">{dataDetail.desc}</Typography>
              <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
                {currencyFormat(dataDetail.price)}
              </Typography>
              <Typography variant="subtitle2">stok: 
                <Typography variant="subtitle2" display="inline">{dataDetail.qty}
                </Typography>
              </Typography>
              <Stack direction={"row"} alignItems="center" sx={{ mt: 3 }}>
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={() => qtyChange("min")}
                >
                  <RemoveIcon fontSize="small" />
                </Button>
                <Typography
                  sx={{
                    borderBottom: 1,
                    width: 50,
                    mx: 1,
                    textAlign: "center",
                    fontSize: 20,
                  }}
                  variant="subtitle2"
                >
                  {qty}
                </Typography>
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={() => qtyChange("plus")}
                >
                  <AddIcon fontSize="small" />
                </Button>
              </Stack>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button variant="contained" color="inherit" onClick={backToPrevious}>
                Cancel
              </Button>
              {buttonText != null && buttonText != 'Cancel' ?
              <Button variant="contained" color="error" id="btnUpdate" onClick={updateCart}>
                
                {buttonText}
              </Button> : ''
              }
            </CardActions>
           
          </Card>
        </Grid>
        
      </Grid>
       }
    </Container>
  );
}

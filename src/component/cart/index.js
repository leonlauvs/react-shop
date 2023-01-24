import {
    Card,
    Grid,
    Container,
    Typography,
    Stack,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import AddIcon from "@mui/icons-material/Add";
  import RemoveIcon from "@mui/icons-material/Remove";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";
  import { currencyFormat, urlApi } from "../../utils/functions";
  
  export default function CartComponent() {
    const navigate = useNavigate();
    const [dataCart, setDataCarts] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [cartId, setCartId] = React.useState(0);
    const [totalSelected, setTotalSelected] = React.useState(0);
    const [totalQty, setTotalQty] = React.useState(0);
    const [totalPrice, setTotalPrice] = React.useState(0);
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    const [order, setOrder] = useState({});
    const [selectedCheckBox, setSelectedCheckBox] = useState([]);

    const removeByAttr = function(arr, attr, value){
      let i = arr.length;
      while(i--){
         if( arr[i] 
             && arr[i].hasOwnProperty(attr) 
             && (arguments.length > 2 && arr[i][attr] === value ) ){ 
  
             arr.splice(i,1);
  
         }
      }
      return arr;
    }

    const sumField = function(items, prop){
      return items.reduce( function(a, b){
          return a + b[prop];
      }, 0);
    };

    let arrObjCart = [];
    let objCart = {};
    // let itemSelected = 0;
    // let qtySelected = 0;
    // let totalPrice = 0;

    const handleCheckbox = (event, productId, name, image, qty, price, subtotal) =>{
     
      if(event.target.checked){
        console.log("value - ", event.target.value, subtotal );
        objCart = {};
        objCart.id = event.target.value;
        objCart.productId = productId;
        objCart.name = name;
        objCart.image = image;
        objCart.qty = qty;
        objCart.price = price;
        objCart.subtotal = subtotal;
        objCart.createdBy= userdata.name;
        //arrObjCart.push(objCart);
        selectedCheckBox.push(objCart);
      }
      else{
        removeByAttr(selectedCheckBox, 'id', event.target.value);   
      }
      //setSelectedCheckBox(arrObjCart);
      console.log('arrObjCart',arrObjCart);
      setTotalPrice(sumField(selectedCheckBox, 'subtotal'));
      setTotalSelected(selectedCheckBox.length);
      setTotalQty(sumField(selectedCheckBox, 'qty'));
      console.log('setSelectedCheckBox',selectedCheckBox);

      localStorage.setItem("purchases", JSON.stringify(selectedCheckBox));
  

      order.orderCode = 'O123';
      order.orderAddress = 'Jalan asd';
      order.details = selectedCheckBox;
      console.log('order',order);
    }

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const gotoCart = () => {
      window.location.reload(); 
    };

    const handleConfirmDelete = async () => {
      try{
        const response = await axios.delete(urlApi+ "/carts/delete/"+cartId);
  
        if(response){
            console.log('deleteCartProduct');
            alert("Berhasil delete Cart");
        }
        else{
            console.log(response);
        }
      }
      catch(error){
          console.log(error);
      }

      gotoCart();
    };
  
    useEffect(() => {
      getCart();
    }, []);
  
    const getCart = async () => {
      try{      
        const response = await axios.get(urlApi+ "/carts/subtotal");
  
        if(response){
            console.log('getCart success');
            console.log(response.data);
            setDataCarts(response.data.data);
        }
        else{
            console.log('getCart fail',response);
        }
      }
      catch(error){
          console.log(error);
      }
  

      // const cart = JSON.parse(localStorage.getItem("cart"));
      
      // if (cart) {
        
      // }
    };
  
    const gotoCheckout = () => {
      navigate("/checkout");
      //handleClickOpen();
    };
  
    const updateCart = async (id, qty, type) => {
      // let cart = dataCart;
      // for (var i in cart) {
      //   if (cart[i].id == id) {
      //     let newQty = cart[i].qty;
      //     if (type == "min") {
      //       newQty--;
      //     } else {
      //       newQty++;
      //     }
  
      //     if (newQty < 0) {
      //       newQty = 0;
      //     }
      //     //cart[i].qty = newQty;
      //     console.log("newQty", newQty);
      //   }
      // }

      let newQty = qty;
          if (type == "min") {
            newQty--;
          } else {
            newQty++;
          }
  
          if (newQty < 1) {
            newQty = 1;
            setCartId(id);
            handleClickOpen();           
          }
          else
          {
            try{
              const response = await axios.put(urlApi+ "/carts/edit/"+id,{
                  qty: newQty,
                  updatedBy: userdata.name
              });
        
              if(response){
                  console.log('updateCartProduct');
                  console.log(response.data);
                  alert("Cart berhasil di update");
              }
              else{
                  console.log(response);
              }
            }
            catch(error){
                console.log(error);
            }
          }
          //cart[i].qty = newQty;
          console.log("newQty", newQty);
  
      //localStorage.setItem("cart", JSON.stringify(cart));
  
      gotoCart();
      // alert("Cart berhasil di update");
    };
  
    return (
      <Container sx={{ mt: 2 }}>
        {dataCart.map((val, i) => (
          <Card key={i} elevation={2} sx={{ my: 1 }}>
            <Grid container>
              <Grid
                item
                xs={1}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Checkbox name="is_checkout" value={val.id} 
                onChange={(event) => handleCheckbox(event, val.productId, val.name, val.image, val.qty, val.price, val.subtotal)} />
              </Grid>
              <Grid item xs={2}>
                <img
                  src={val.image}
                  srcSet={val.image}
                  alt={val.name}
                  loading="lazy"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={7} sx={{ p: 1 }}>
                <Typography variant="h5">{val.name}</Typography>
                <Typography variant="h6" fontWeight={"bold"} sx={{ mt: 3 }}>
                  {currencyFormat(val.price)}
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
                <Typography variant="h5">Subtotal</Typography>
                <Typography variant="h6" fontWeight={"bold"} sx={{ mb: 3 }}>
                  {currencyFormat(val.subtotal)}
                </Typography>
                <Stack direction={"row"} alignItems="center">
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    onClick={() => updateCart(val.id, val.qty, "min")}
                  >
                    <RemoveIcon />
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
                    {val.qty}
                  </Typography>
                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    onClick={() => updateCart(val.id, val.qty, "plus")}
                  >
                    <AddIcon />
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Card>
        ))}
          {/* <Typography
            sx={{
              width: 50,
              mx: 1,
              textAlign: "center",
              fontSize: 20,
              }}
              variant="subtitle2"
              display="inline"
          >
            Selected: {totalSelected}
          </Typography>
          <Typography
            sx={{
              width: 50,
              mx: 1,
              textAlign: "center",
              fontSize: 20,
              }}
              variant="subtitle2"
              display="inline"
          >
            Qty: {totalQty}
          </Typography>
          <Typography
            sx={{
              borderBottom: 1,
              width: 50,
              mx: 1,
              textAlign: "center",
              fontSize: 20,
              }}
              variant="subtitle2"
              display="inline"
          >
            Total Price: {currencyFormat(totalPrice)}
          </Typography> */}
        <Stack direction="row" sx={{ p: 1 }} justifyContent="space-between">
          <Typography variant="h5">Selected: {totalSelected}</Typography>
          
          <Typography variant="h5">Qty: {totalQty}</Typography>
          
          <Typography variant="h5">Total Price : {currencyFormat(totalPrice)}</Typography>
          
        </Stack>
        <Stack direaction="row" alignItems={"flex-end"} sx={{ mb: 3 }}>
          <Button
            variant="contained"
            color="error"
            sx={{ width: 100 }}
            onClick={gotoCheckout}
          >
            Checkout
          </Button>
        </Stack>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm delete item"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to remove this item from cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      </Container>
    );
  }
  
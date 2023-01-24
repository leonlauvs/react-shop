import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import RegisterComponent from './component/register';
import LoginComponent from './component/login';
import Home2Component from './component/home';
import CobaComponent from './component/coba';
// import HomeComponent from './component/home/';
// import DetailProductComponent from './component/detailProduct/';
import Home from "./routes/Home";
import UpdateProfile from "./routes/UpdateProfile";
import DetailProduct from "./routes/DetailProduct";
import Cart from "./routes/Cart";
import Checkout from "./routes/Checkout";
import History from "./routes/History";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginComponent />
  },
  {
    path: "/product/:id",
    element: <DetailProduct />
  },
  {
    path: "/product",
    element: <Home />
  },
  {
    path: "/register",
    element: <RegisterComponent />
  },
  {
    path: "/home/:name",
    element: <Home2Component/>
  },
  {
    path: "/updateProfile/:id",
    element: <UpdateProfile />
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/history",
    element: <History />,
  },
  {
    path: "/coba",
    element: <CobaComponent/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

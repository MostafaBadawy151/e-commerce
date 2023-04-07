import './App.css';
import { createBrowserRouter, RouterProvider, useParams } from 'react-router-dom';
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Cart from './Components/Cart/Cart'
import NotFound from './Components/NotFound/NotFound'
import  Products from './Components/Products/Products'
import Product from './Components/Product/Product';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import CartContextProvider from './Context/CartContext';

import  { Toaster } from 'react-hot-toast';
import Brands from './Components/Brands/Brands';
import WishList from './Components/WishList/WishList';
import WishContextProvider from './Context/WishListContext';
import CheckOut from './Components/CheckOut/CheckOut';
import AllOrders from './Components/AllOrders/AllOrders';


function App() {

  useEffect(()=>{
    if(localStorage.getItem('userToken') !== null){
      saveUserData();
    }
  },[])
const [userData, setuserData] = useState(null)
function saveUserData(){
  let encodedToken = localStorage.getItem('userToken')
  let decodedToken = jwtDecode(encodedToken)
  setuserData(decodedToken);
 }

 

 let routers=createBrowserRouter([
  {path:'', element:<Layout userData={userData} setuserData={setuserData}/>, children:[
    {index:true, element:<Home/>},
    {path:"login", element:<Login saveUserData={saveUserData}/>},
    {path:"products", element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:"register", element:<Register/>},
    {path:"cart", element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:"brands", element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:"wishlist", element:<ProtectedRoute><WishList/></ProtectedRoute>},
    {path:"checkout", element:<ProtectedRoute><CheckOut/></ProtectedRoute>},
    {path:"allorders", element:<ProtectedRoute><AllOrders/></ProtectedRoute>},
    {path:"products/:productId", element:<ProtectedRoute><Product/></ProtectedRoute>},
    {path:"*", element:<Home/>},
    
  ] }
])

  return <>
  
    <CartContextProvider>
      <WishContextProvider>
          <Toaster/>
        <RouterProvider router={routers}></RouterProvider>
      </WishContextProvider>
    </CartContextProvider>
  
  
  </>
}

export default App;

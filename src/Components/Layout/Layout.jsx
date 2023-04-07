import React from 'react'
import styles from'./Layout.module.css'
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'
import { Outlet, useNavigate } from 'react-router-dom'
import { Offline, Online } from "react-detect-offline";


export default function Layout({userData, setuserData}) {
  let navigate = useNavigate()
  function logOut() {
    localStorage.removeItem('userToken');
    setuserData(null);
    navigate('/login')
    
 }
  return <>
    <Navbar userData={userData} logOut={logOut}></Navbar>
    <Outlet></Outlet>
    {/* <Online><div className='network'>You are Online</div></Online> */}
    <Offline><div className='network'>You are offline <i className='fas fa-wifi'></i></div></Offline>
    <Footer></Footer>
    
  </>
  
} 

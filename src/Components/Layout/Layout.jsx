import React from 'react'
import styles from'./Layout.module.css'
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'
import { Outlet, useNavigate } from 'react-router-dom'

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
    <Footer></Footer>
  </>
  
} 

import React, { useContext } from 'react'
import styles from'./Navbar.module.css'
import { Link } from 'react-router-dom'
import logo from'../../assets/freshcart-logo.svg'

export default function Navbar({userData, logOut}) {


  return <>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"><img src={logo} alt="" width={90} /></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      {userData !==null ? <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        
        <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        {/* <li class="nav-item">
          <Link class="nav-link" to="products">Products</Link>
        </li> */}
        <li class="nav-item">
        
          <Link class="nav-link" to="cart">Cart</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="brands">Brands</Link> 
        </li>
        {/* <li class="nav-item">
          <Link class="nav-link" to="categories">Categories</Link>
        </li> */}
        <li class="nav-item">
          <Link  className="nav-link" to="wishlist">WishList <i className='fas fa-heart'></i></Link>
        </li>
        
      </ul>: null}
      
      <ul className="navbar-nav  ms-auto mb-2 mb-lg-0 d-flex align-items-center">
        <li className="nav-item">
          <i className='fab fa-facebook mx-2'></i>
          <i className='fab fa-youtube mx-2'></i>
          <i className='fab fa-github mx-2'></i>
          <i className='fab fa-twitter mx-2'></i>
          <i className='fab fa-instagram mx-2'></i>
          <i className='fab fa-linkedin mx-2'></i>
        </li>
        {userData == null? <>
          <li className="nav-item">
          <Link className="nav-link" to="login">Login</Link>
        </li>
        <li class="nav-item">
          <Link className="nav-link" to="register">Register</Link>
        </li>
        </>:<li class="nav-item">
          <span className="nav-link cursor-pointer" onClick={logOut}>Logout</span>
        </li>}
        
        
      </ul>
     
    </div>
  </div>
</nav>
  
  </>
  
}

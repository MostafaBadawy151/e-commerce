import React from 'react'
import styles from'./Footer.module.css'
import appStore from '../../assets/128x128.png'
import googleStore from '../../assets/googleplay.png'

export default function Footer() {
  return <>
   <div className="container-fluid bg-main-light p-5 mt-4">
    <div className="row p-4 ">
      <h3>Get the Fresh cart App</h3>
      <p className='text-black-50'>We will send you a link, open it on your phone to download the app</p>
    </div>
    <div className="row">
      <div className="col-md-9">
        <input type="email" className='form-control' placeholder='Email ..'/>
      </div>
      <div className="col-md-3">
        <button className='btn btn-success bg-main'>Share App Link</button>
      </div>
    </div>
    <div className='d-flex justify-content-between align-items-center'>
      <h6>Payment Partnert <i class="fa-brands fa-amazon-pay mx-2"></i><i class="fa-brands fa-cc-paypal mx-2"></i><i class="fa-brands fa-cc-mastercard mx-2"></i></h6>
      <div>
        <span>Get delivires with FreshCart</span>
        <img src={appStore} alt="" className='mx-2'/>
        <img src={googleStore} alt="" />
      </div>
    </div>
   </div>
  
  </>
  
}

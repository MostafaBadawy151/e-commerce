import React, { useContext, useState } from 'react'
import styles from'./CheckOut.module.css'
import { useFormik } from 'formik'
import { CartContext } from '../../Context/CartContext';

export default function CheckOut() {
  let {onlinePayment} =useContext(CartContext)  
  async function handleSubmit(values) {
    let response = await onlinePayment(localStorage.getItem('cartId'),values)
    if (response?.data?.status=== 'success') {
      // console.log(response);
      window.location.href=response.data.session.url 
    }
  }

  let formik = useFormik({
    initialValues:{
      details:'',
      city:'',
      phone:'',
    },
    onSubmit:handleSubmit
  })
  return <>
    <div className="w-50 py-5 mx-auto">
      <form onSubmit={formik.handleSubmit}>

        <label htmlFor="details">details: </label>
        <input type="text" className='form-control' value={formik.values.details} onChange={formik.handleChange} name='details' id='details'/>

        <label htmlFor="phone">phone: </label>
        <input type="text" className='form-control' value={formik.values.phone} onChange={formik.handleChange} name='phone' id='phone'/>

        <label htmlFor="city">city: </label>
        <input type="text" className='form-control' value={formik.values.city} onChange={formik.handleChange} name='city' id='city'/>
        <button type='submit' className='btn w-100 border-main my-5'>PAY</button>
      </form>
    </div>
  
  </>
  
}

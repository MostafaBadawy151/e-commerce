import React, { useContext, useEffect, useState } from 'react'
import styles from'./Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

export default function Cart() {
  const [cartDetails, setcartDetails] = useState(null)
let {getLoggedUserCart, updateProductCount,deleteCartItem, clearCart}=useContext(CartContext)
const [isloading, setisloading] = useState(false)


async function getCart() {
  setisloading(true)
  let response = await getLoggedUserCart();
  console.log(response.data);
  setisloading(false)

  // console.log(response?.data.data?.cartOwner);
  setcartDetails(response.data)

  localStorage.setItem('cartId',response?.data.data._id)
  localStorage.setItem('cartOwner',response?.data.data?.cartOwner)
}
async function updateCount(productId, count) {
  let response = await updateProductCount(productId, count);
  console.log(response);
  setcartDetails(response.data)
  
}
async function deleteItem(productId) {
  let response = await deleteCartItem(productId);
  console.log(response);
  setcartDetails(response.data)
}
async function clear() {
  let response = await clearCart();
  console.log(response);
  setcartDetails(null)
}
useEffect(()=>{
  getCart();
}, [])


  return <>
  <Helmet>
    <title>Shop Cart</title>
  </Helmet>
  {isloading?<div className='loading'><i className='fas fa-spinner fa-spin text-main fa-3x'></i></div>:<>
  <div className='bg-main-light p-4 my-4 w-75 mx-auto position-relative'>
    <h5>Shop Cart</h5>
    <h6 className='text-main'>Total Price : {cartDetails?.data.totalCartPrice} EGP</h6>
    <button onClick={()=>clear()} className='btn btn-danger btn-sm clear'>Clear Cart</button>
    {cartDetails?.data.products.map((product, index)=> <div key={index} className='row border-bottom my-2'>
      <div className="col-md-1">
        <img src={product.product.imageCover} alt="" className='w-100'/>
      </div>
      <div className="col-md-11 d-flex justify-content-between align-items-center">
          <div>
            <h6 className='fw-bolder'>{product.product.title}</h6>
            <h6 className='text-main'>{product.price} EGP</h6>
            <button onClick={()=>deleteItem(product.product._id)} className='btn m-0 p-0'><i className='text-danger btn-sm font-sm fa-regular fa-trash-can'></i> remove</button>
          </div>
          <div>
            <button onClick={()=>updateCount(product.product._id, product.count+1)} className='btn border-main btn-sm'>+</button>
            <span className='d-inline-block mx-2'>{product.count}</span>
            <button onClick={()=>updateCount(product.product._id, product.count-1)} className='btn border-main btn-sm'>-</button>
          </div>
      </div>
    </div>)}
    <button className='btn bg-main '><Link className='text-white' to={'/CheckOut'}>CheckOut</Link></button>

  </div>
  </>}
  
    
  
  </>
  
}

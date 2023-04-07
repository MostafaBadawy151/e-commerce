import React, { useEffect, useState } from 'react'
import styles from'./AllOrders.module.css'
import axios from 'axios'

export default function AllOrders() {
const [orders, setorders] = useState(null)
  async function getOrders() {
    let response = await axios.get(`https://route-ecommerce.onrender.com/api/v1/orders/user/${localStorage.getItem('cartOwner')}`)
    console.log(response.data);
    setorders(response.data)
  }

  useEffect(()=>{
    getOrders();
  },[])
  return <>
      
        <div className='row p-5'>
        {orders?.map((order)=> <div className='col-md-3 paid '>
          <h6 className='text-danger text-center'>Order Created: {order.createdAt.split('-').slice(0,2).join('-')}</h6>
          <h6 className='text-success text-center'>Order Type: {order.paymentMethodType}</h6>
          <h6 className='text-black text-center'>Phone: {order.user.phone}</h6>
         {order.cartItems.map((item)=> <>
         
         <img src={item.product.imageCover} alt="" className='w-100'/>
         <div className='bg-secondary text-white my-3 py-2'>
            <h6 className=' text-center'>{item.price} EGP</h6>
            <h6 className=' text-center'>{item.product.title.split(' ').slice(0,2).join(" ")}</h6>
            <h6 className=' text-center'>Count: {item.count} </h6>

         </div>
          
         </>
        
         
         )} 
        </div>)}
     
 
        </div>
    
  
  </>
  
}


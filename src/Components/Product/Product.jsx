import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import styles from'./Product.module.css'
import Slider from 'react-slick';
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';


export default function Product() {
  let {addToCart} = useContext(CartContext)
const params = useParams();
const [Details, setDetails] = useState(null)
const [isloading, setisloading] = useState(false)
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3
};

async function addProductToCart(productId) {
  let response = await addToCart(productId);
  if(response.data.status == 'success'){
    toast.success(response.data.message, {duration:3000, className:'text-center border-success', position:'bottom-left'})
  }
  else{
    toast.error('Error')
  }
}

async function getProductDetails() {
  setisloading(true)
  let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${params.productId}`)
 setDetails(data.data)
 setisloading(false)
}

useEffect(() => {
  getProductDetails();
}, [])

  return <>
  <div className="container">
    {isloading?<div className='loading'><i className='fas fa-spinner fa-spin text-main fa-3x'></i></div>:<>
    <div className="row align-items-center">
      <div className="col-md-4"><img src={Details?.imageCover} alt="" className='w-100'/></div>
      <div className="col-md-8">
        <p>{Details?.title}</p>
        <p className='text-black-50'>{Details?.description}</p>
        <h6>{Details?.category.name}</h6> 
        <div className='d-flex justify-content-between'>
          <span>{Details?.price}EGP</span>
          <span><i class="fa-solid fa-star text-warning"></i>{Details?.ratingsAverage}</span>
        </div>
        <button onClick={()=>addProductToCart(Details?.id)} className='btn btn-success w-100 bg-main'>+ add to cart</button>
      </div>
    </div>
    <div className="row">
    <div>
        <h2>More Images</h2>
        <Slider {...settings} className={'cursor-pointer'}>
          {Details?.images.map((photo)=> <img src={photo} className={'w-100'}></img>)}
        </Slider>
      </div>
    </div>
    </>}
    
  </div>
  </>
  
}

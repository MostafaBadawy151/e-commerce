import React, { useState } from 'react'
import styles from'./Brands.module.css'
import axios from 'axios'
import { useEffect } from 'react';
import { Helmet } from 'react-helmet'


export default function Brands() {

  const [brands, setbrands] = useState(null)
  const [isloading, setisloading] = useState(false)


  async function getBrands() {
    setisloading(true)

   let {data}= await axios.get('https://route-ecommerce.onrender.com/api/v1/brands')
   setbrands(data.data)
   console.log(data.data);
   setisloading(false)


  }
  useEffect(()=>{
    getBrands();
  },[])

  return <>
   <Helmet>
    <title>Our Brands</title>
  </Helmet>
  <div className="container">
  <div className="row text-center">
    {isloading?<div className='loading'><i className='fas fa-spinner fa-spin text-main fa-3x'></i></div>:<>
    {brands?.map((brand, index)=>
        <div key={index} className="col-md-3 cursor-pointer">
         <img src={brand.image} alt="" className='w-100'/>
         <h5 className='text-main'>{brand.name}</h5>
        </div>
    )}
    </>}
    
  
    </div>
    
  </div>
    
  </>
  
}

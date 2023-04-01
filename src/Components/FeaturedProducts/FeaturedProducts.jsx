import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import styles from'./FeaturedProducts.module.css'

export default function FeaturedProducts() {
  const [Products, setProducts] = useState([]);
  async function getProducts() {
    let {data} = await axios.get('https://route-ecommerce.onrender.com/api/v1/products');
    setProducts(data.data);
  }

  useEffect(() => {
    getProducts();
  }, [])
  return <> 
  {Products.map((product)=>
    <div className="col-md-2  item">
    <Link class="nav-link" to={'products/'+product.id}>
   <img src={product.imageCover} alt="" className='w-100'/>
   <h2 className='h6'>{product.title.split(" ").slice(0,2).join(" ")}</h2>
    </Link>
      <small className='text-main'>{product.category.name}</small>
      <div className='d-flex justify-content-between'>
        <span>{product.price}EGP</span>
        <span><i class="fa-solid fa-star text-warning"></i>{product.ratingsAverage}</span>
      </div>
      <button className='productbtn btn bg-main text-white w-100 my-2'>+ Add</button>

    </div>

  )}
  </>
  
}
 
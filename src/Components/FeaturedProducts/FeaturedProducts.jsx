import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import styles from'./FeaturedProducts.module.css'
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';
import { WishContext } from '../../Context/WishListContext'



export default function FeaturedProducts() {
  let {addToCart} =useContext(CartContext);
  let {addToWishList} = useContext(WishContext)
  const [Products, setProducts] = useState([]);
  async function getProducts() {
    let {data} = await axios.get('https://route-ecommerce.onrender.com/api/v1/products');
    setProducts(data.data);
  }
  async function addWish(productId) {
    let response = await addToWishList(productId);
    if(response.data.status == 'success'){
      toast.success(response.data.message, {duration:3000, className:'text-center border-success', position:'bottom-left'})
    }
    else{
      toast.error('Error')
    }
  }
  

  
  useEffect(() => {
    getProducts();
  }, [])

  async function addProductToCart(productId) {
    let response = await addToCart(productId);
    if(response.data.status == 'success'){
      toast.success(response.data.message, {duration:3000, className:'text-center border-success', position:'bottom-left'})
    }
    else{
      toast.error('Error')
    }
  }
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
      <button className='btn text-center' onClick={()=>addWish(product.id)}><i className='fas fa-heart wish'></i></button>
      <button onClick={()=>addProductToCart(product.id)} className='productbtn btn bg-main text-white w-100 my-2'>+ Add</button>

    </div>

  )}
  </>
  
}
 
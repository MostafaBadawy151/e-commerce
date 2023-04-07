import React, { useContext, useEffect, useState } from 'react'
import styles from'./WishList.module.css'
import { WishContext } from '../../Context/WishListContext'
import { toast } from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
import Slider from 'react-slick'
import { Helmet } from 'react-helmet'



var settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

export default function WishList() {
  const [wishes, setwishes] = useState(null)
const [isloading, setisloading] = useState(false)
  let {getWishList, removeFromWishList } = useContext(WishContext)
  let {addToCart} = useContext(CartContext)

  async function addProductToCart(productId) {
    let response = await addToCart(productId);
    if(response.data.status == 'success'){
      toast.success(response.data.message, {duration:3000, className:'text-center border-success', position:'bottom-left'})
    }
    else{
      toast.error('Error')
    }
  }

  async function getWish() {
    setisloading(true)
    let response = await getWishList()
    console.log(response);
    setisloading(false)
    setwishes(response.data.data)
  }

  async function removeWish(productId) {
    let response =await removeFromWishList(productId);
    console.log(response);
    getWish();

  }

  useEffect(()=>{
    getWish();
  }, [])


  return <>
  <Helmet>
    <title>Wish List</title>
  </Helmet>
    {isloading?<div className='loading'><i className='fas fa-spinner fa-spin text-main fa-3x'></i></div>:<>
    <div className="container">
      {wishes?.map((wish)=> <div className='row border-main border-top-0 p-5'>
      <div className="col-md-1">
        <img src={wish.imageCover} alt=""  className='w-100'/>
      </div>
      <div className="col-md-11">
        <div>
          <h6 className='text-main'>{wish.title}</h6>
          <h6 className='text-danger'>{wish.brand.name}</h6>
          <p>{wish.price} EGP</p>
            {wish.priceAfterDiscount?<h6>Price after discount: {wish.priceAfterDiscount} EGP</h6>:<h6>No available discount now</h6>} 
          <button onClick={()=>removeWish((wish.id))} className='btn btn-danger btn-sm'>Remove from wishlist</button>
          <button onClick={()=>addProductToCart(wish.id)} className='btn btn-success bg-main mx-2 btn-sm'> Add to Cart</button>
        </div>
        <div className='p-5'>
        <Slider {...settings} className={'cursor-pointer'}>
          {wish.images.map((image, index)=> <img  key={index} src={`https://route-ecommerce.onrender.com/products/${image}`} alt="" className='w-100'/>)}

        </Slider>
      </div>
      </div>
    </div>)}
      </div>
    </>}
    
  
  

  
  </>
  
}

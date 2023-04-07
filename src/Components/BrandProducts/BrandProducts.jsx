import React from 'react'
import styles from'./BrandProducts.module.css'
import axios from 'axios'

// m4 laky api documentation bta3ha

export default function BrandProducts() {
  async function getBrandProducts(brandId) {
    axios.get(`https://route-ecommerce.onrender.com/api/v1/brands/${brandId}`)
  }
  return <>
    <h2>BrandProducts</h2>
  
  </>
  
} 

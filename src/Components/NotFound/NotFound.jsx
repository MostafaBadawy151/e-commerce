import React from 'react'
import styles from'./NotFound.module.css'
import notfound from '../../assets/404.jpg'

export default function NotFound() {
  return <>
    <div className="container">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <img src={notfound} alt="" className='w-100'/>
        </div>
      </div>
    </div>
  
  </>
  
}

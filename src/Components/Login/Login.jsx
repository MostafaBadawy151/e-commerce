import { useFormik } from 'formik'
import React, { useState } from 'react'
import styles from'./Login.module.css'
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'


export default function Login({saveUserData}) {
const [isloading, setisloading] = useState(false);
const [messageError, setmessageError] = useState('')
 let navigate = useNavigate()

 
  async function handleLogin(values) {
    setisloading(true);
    let {data} = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signin',values).catch((error)=>{
    setmessageError(`${error.response.data.errors.param}:${error.response.data.errors.msg}`)  
    setisloading(false);
       
    });
    if(data.message== 'success'){
      localStorage.setItem('userToken',data.token)
      saveUserData();
    setisloading(false);
      navigate('/');
    }
  }

  let validationSchema = Yup.object({
    email:Yup.string().required('email is required').email('Email is invalid'),
    password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,10}$/,'Password must start with uppercase letter'),
  })

  
  let formik = useFormik({
    initialValues:{
      email:'',
      password:'',
    },validationSchema,
    onSubmit:handleLogin
  })
  return <>
  <Helmet>
    <title>Login</title>
  </Helmet>
    <div className='w-75 mx-auto py-4'>
        <h3>Login Now</h3>
        {messageError?<div className="alert alert-danger">{messageError}</div>:null}
        <form onSubmit={formik.handleSubmit}>

          <label htmlFor="email">Email:</label>
          <input type="text" name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className={'form-control mb-2'}/>
          {formik.errors.email && formik.touched.email?<div className="alert alert-danger">{formik.errors.email}</div>:null}

          <label htmlFor="password">Password:</label>
          <input type="password" name='password' id='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className={'form-control mb-2'}/>
          {formik.errors.password && formik.touched.password?<div className="alert alert-danger">{formik.errors.password}</div>:null}
          
          {isloading?<button type='button' className='btn bg-main btn-success'><i className='fas fa-spinner fa-spin'></i></button> :<button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main btn-success' type='submit'>Login</button>}
        </form>

    </div>
  
  </>
  
}

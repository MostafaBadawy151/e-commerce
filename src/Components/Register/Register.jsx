import { useFormik } from 'formik'
import React, { useState } from 'react'
import styles from'./Register.module.css'
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet'


export default function Register() {
const [isloading, setisloading] = useState(false);
const [messageError, setmessageError] = useState('')
 let navigate = useNavigate()

  async function handleRegister(values) {
    setisloading(true);
    let {data} = await axios.post('https://route-ecommerce.onrender.com/api/v1/auth/signup',values).catch((error)=>{
    setmessageError(`${error.response.data.errors.param}:${error.response.data.errors.msg}`)  
    setisloading(false);
       
    });
    if(data.message== 'success'){
    setisloading(false);
      navigate('/login');
    }
  }

  let validationSchema = Yup.object({
    name:Yup.string().required('Name is required').min(3,'min length is 3').max(10,'max length is 10'),
    email:Yup.string().required('email is required').email('Email is invalid'),
    password:Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,10}$/,'Password must start with uppercase letter'),
    rePassword:Yup.string().required('rePassword is required').oneOf([Yup.ref('password')]),
    phone:Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/,'Invalid phone number')
  })

  // function validate(values) {
  //   let errors={};
  //   if (!values.name) {
  //     errors.name ='Name is required';
  //   }
  //   else if (values.name.length < 3) {
  //     errors.name ='min length is 3';
  //   }
  //   else if (values.name.length > 10) {
  //     errors.name ='max length is 10';
  //   }
  //   if (!values.email) {
  //     errors.email ='Email is required';
  //   }
  //   else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
  //     errors.email ='Invalid email address';
  //   }
  //   if (!values.password) {
  //     errors.password ='Password is required';
  //   }
  //   else if (!/^[A-Z][a-z0-9]{5,10}$/.test(values.email)) {
  //     errors.password ='Password must start with upper case letter....';
  //   }
  //   if (!values.rePassword) {
  //     errors.rePassword ='rePassword is required';
  //   }
  //   else if (errors.password !== errors.rePassword) {
  //     errors.rePassword ='Password does not match';
  //   }
  //   if (!values.phone) {
  //     errors.phone ='phone is required';
  //   }
  //   else if (!/^01[0125][0-9]{8}$/.test(values.phone)) {
  //     errors.rePassword ='Phone  not correct';
  //   }
  //   return errors;
  // }
  let formik = useFormik({
    initialValues:{
      name:'',
      phone:'',
      email:'',
      password:'',
      rePassword:''
    },validationSchema,
    onSubmit:handleRegister
  })
  return <>
  <Helmet>
    <title>Register</title>
  </Helmet>
    <div className='w-75 mx-auto py-4'>
        <h3>Register Now</h3>
        {messageError?<div className="alert alert-danger">{messageError}</div>:null}
        <form onSubmit={formik.handleSubmit}>

          <label htmlFor="name">Name:</label>
          <input type="text" name='name' id='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className={'form-control mb-2'}/>
          {formik.errors.name && formik.touched.name?<div className="alert alert-danger">{formik.errors.name}</div>:null}
         
          <label htmlFor="email">Email:</label>
          <input type="text" name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className={'form-control mb-2'}/>
          {formik.errors.email && formik.touched.email?<div className="alert alert-danger">{formik.errors.email}</div>:null}

          <label htmlFor="password">Password:</label>
          <input type="password" name='password' id='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className={'form-control mb-2'}/>
          {formik.errors.password && formik.touched.password?<div className="alert alert-danger">{formik.errors.password}</div>:null}

          <label htmlFor="rePassword">rePassword:</label>
          <input type="password" name='rePassword' id='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className={'form-control mb-2'}/>
          {formik.errors.rePassword && formik.touched.rePassword?<div className="alert alert-danger">{formik.errors.rePassword}</div>:null}

          <label htmlFor="phone">Phone:</label>
          <input type="tel" name='phone' id='phone' value={formik.values.phone} onChange={formik.handleChange}  onBlur={formik.handleBlur} className={'form-control mb-2'}/>
          {formik.errors.phone && formik.touched.phone?<div className="alert alert-danger">{formik.errors.phone}</div>:null}
          
          {isloading?<button type='button' className='btn bg-main btn-success'><i className='fas fa-spinner fa-spin'></i></button> :<button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main btn-success' type='submit'>Register</button>}
        </form>

    </div>
  
  </>
  
}

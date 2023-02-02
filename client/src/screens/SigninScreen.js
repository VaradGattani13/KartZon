import React, { useContext, useState,useEffect } from 'react'
import Container from 'react-bootstrap/esm/Container'
// import { Form } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import { Helmet } from 'react-helmet-async'
import { useLocation, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/esm/Button'
import axios from 'axios'
import { Store } from '../Store'
import { toast } from 'react-toastify'
import { getError } from '../utils'
// import data from '../../../backend/data.js'

const SigninScreen = () => {
  const {search}=useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';


const navigate=useNavigate();


// Setting the email
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const {state,dispatch:ctxDispatch}=useContext(Store);
const {userInfo}=state;
        




  const submitHandler=async(e)=>{
    e.preventDefault();
    try{
      const {data}=await axios.post('api/users/signin',{
        email,
        password,

  }
  )
  ctxDispatch({type:'USER_SIGNIN',payload:data}) 

  // Store Data in Localstorage
  localStorage.setItem('userInfo',JSON.stringify(data));
  navigate(redirect || '/');


  // console.log(data);

}

    catch(err){

// Database i error
toast.error(getError(err));



      // isse apna msg jaega
      // toast.error('Invalid Credentials')
      // alert('Invalid Credentials');

    }

  }

  // Signout krne ke baad vaapis se signin automatically hora to uska solution yaha pe use effect se
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);


  





  return (
    <Container className='small-container'>
    <Helmet>
      <title>Sign In/Login</title>
    </Helmet>
    <h1 className='my-3'>Login</h1>
    <Form onClick={submitHandler} >
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Enter Email </Form.Label>
          <Form.Control type="email" required onChange={(e)=>setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Enter Password</Form.Label>
          <Form.Control type="password" required onChange={(e)=>setPassword(e.target.value)} />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign In</Button>
           
        </div>
        <div className="mb-3">
          New customer?{' '}
          <Link to={`/signout?redirect=${redirect}`}>Create your account</Link>
        </div>
        </Form>

    </Container>
  )
} 

export default SigninScreen
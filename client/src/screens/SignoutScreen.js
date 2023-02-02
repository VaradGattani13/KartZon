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

const SignoutScreen = () => {
  const {search}=useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';


const navigate=useNavigate();


// Setting the email

const [name,setName]=useState('');
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const [confirmpassword,setConfirmPassword]=useState('');
const {state,dispatch:ctxDispatch}=useContext(Store);
const {userInfo}=state;
        




  const submitHandler=async(e)=>{
    e.preventDefault();
    if (password !== confirmpassword) {
      toast.error('Passwords do not match');
      return;
    }
    try{
      const {data}=await axios.post('api/users/signout',{
        name,
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
      <title>Sign Up</title>
    </Helmet>
    <h1 className='my-3'>Login</h1>
    <Form onClick={submitHandler} >
    <Form.Group className="mb-3" controlId="name">
          <Form.Label>Enter Name</Form.Label>
          <Form.Control type="name" required onChange={(e)=>setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Enter Email </Form.Label>
          <Form.Control type="email" required onChange={(e)=>setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Enter Password</Form.Label>
          <Form.Control type="password" required onChange={(e)=>setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="cnfpassword">
          <Form.Label>Confirm Your Password</Form.Label>
          <Form.Control type="password" required onChange={(e)=>setConfirmPassword(e.target.value)} />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign Out</Button>
           
        </div>
        <div className="mb-3">
          Already Have account{' '}
          <Link to={`/signin?redirect=${redirect}`}>Login</Link>
        </div>
        </Form>

    </Container>
  )
}

export default SignoutScreen
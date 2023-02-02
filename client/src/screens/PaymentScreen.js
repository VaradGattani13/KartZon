import React, { useState } from 'react'
import CheckoutStp from '../components/CheckoutStp'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import { Store } from '../Store'
import Button from 'react-bootstrap/esm/Button'


const PaymentScreen = () => {

    const navigate=useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    
    const {
        cart: { shippingAddress, paymentMethod },
      } = state;

    const [paymentMethodname,setPaymentMethod]=useState('paymentMethod' || 'Cash On Delivery' );
    
      useEffect(() => {
        if (!shippingAddress.address) {
          navigate('/shipping');
        }
      }, [shippingAddress, navigate]);


      const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodname });
        localStorage.setItem('paymentMethod', paymentMethodname);
        navigate('/placeorder');
      };




  return (
   <div>
    <CheckoutStp step1 step2 step3></CheckoutStp>
    <div className='container small-container'>
    <Helmet>
          <title>Mode Of Payment</title>
        </Helmet>
        <h1 className="my-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="PayPal"
              label="PayPal"
              value="PayPal"
              checked={paymentMethodname === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodname === 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="COD"
              label="Cash On Delievery"
              value="COD"
              checked={paymentMethodname === 'COD'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>


    </div>
   </div>

  )
}

export default PaymentScreen
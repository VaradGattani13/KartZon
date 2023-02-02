import React, { useContext, useState,useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
// Iimport Button
import Form from  'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button'
import { useNavigate } from 'react-router'
import { Store } from '../Store'
import CheckoutStp from '../components/CheckoutStp'





const ShippingAdd = () => {

// Depedencies
const navigate=useNavigate();
const { state, dispatch: ctxDispatch } = useContext(Store);

const {
    userInfo,
    cart: { shippingAddress },
  } = state;



//   State and hooks and save the data in local storage
  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [phone,setPhone]=useState(shippingAddress.phone || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );


//   Signin hone pe hat jaega yeh
  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [userInfo, navigate]);
  const [country, setCountry] = useState(shippingAddress.country || '');






    // State function and hooks inse data store nahi hoga upar wale se localstorage mai bhi save hojaega
    // const [fullName,setFullName]=useState('');
    // const [address,setAddress]=useState('');
    // const [city,setCity]=useState('');
    // const [phone,setPhone]=useState('');
    // const [postalCode,setPostalCode]=useState('');
    // const [country,setCountry]=useState('');




// Handler Functions
const submitHandler=(e)=>{
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address,
        phone,
        city,
        postalCode,
        country,
      },
    });
    localStorage.setItem(
        'shippingAddress',
        JSON.stringify({
          fullName,
          address,
          phone,
          city,
          postalCode,
          country,
        })
      );
      navigate('/payment');

}







  return (
    <div>
    <Helmet>
    <title>Shiping Details</title>
    </Helmet>
    {/* Step 1 step 2 aayi kha se samjhna padega */}


    {/* Yeh step 1 step 2 are props jo upar ki orange patti ko active rakhte hai check the file */}
    <CheckoutStp step1 step2   ></CheckoutStp>
    <h1 className="my-3">Shipping Address</h1>
    <div className="container small-container">
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="mobile">
            <Form.Label>Contact</Form.Label>
            <Form.Control
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
        </div>
        </div>
  )
}

export default ShippingAdd
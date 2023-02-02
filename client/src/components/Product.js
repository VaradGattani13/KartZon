import React from 'react'
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

const Product = (props) => {
    const {product}=props;
    // const { data } = await axios.get(`/api/products/${product._id}`);
    
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {cart:{cartItems}}=state;
    const addtoCartHandler = async (item) => {
      
    const existItem=cartItems.find((x)=>x._id===product.
    _id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

      // const { data } = await axios.get(/api/product/${item._id});
      const { data } = await axios.get(`/api/products/${item._id}`);
      if (data.countInStock < quantity) {
        window.alert('Sorry. Product is out of stock');
        return;
      }
      ctxDispatch({
        type: 'CART_ADD_ITEM',
        payload: { ...item, quantity },
      });
    
    };

  return (
    
    <Card  className="product">
    <Link to={`/products/${product.slug}`}>
      <img src={product.image} alt={product.name} className='card-img-top'/>
      </Link>
      <Card.Body>
      <div className="product-info">  
      <Link to={`/products/${product.slug}`}>
      <Card.Title>{product.name}</Card.Title>
      </Link>
      <Link to={`/products/${product.slug}`}>
      <Card.Text>{product.price}</Card.Text>
      </Link>
      <Rating rating={product.rating} numReviews={product.numReviews}/>
      {product.countInStock===0? <Button disabled variant='light'>Out Of Stock!</Button>
      :
      <Button onClick={()=>addtoCartHandler(product)}>Add to Cart</Button>
      
      
      }
      </div>
      </Card.Body>

    </Card>
   
  )
}

export default Product
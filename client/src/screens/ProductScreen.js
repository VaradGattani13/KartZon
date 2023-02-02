import React, { useContext, useReducer } from 'react'
import { useEffect } from 'react'
// inport useReducer
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import ListGroup from 'react-bootstrap/ListGroup'
import Rating from '../components/Rating'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/esm/Button'
import { Helmet } from 'react-helmet-async'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { getError } from '../utils'
import { Store } from '../Store'


const reducer=(state,action)=>{
  switch(action.type){
    case 'FETCH_REQUEST':
      return {...state,loading:true};
    case 'FETCH_SUCCESS':
      return {...state,product:action.payload,loading:false};
    case 'FETCH_FAIL':
      return {...state,loading:false,error:action.payload};
    default:
      return state;
  }
}
 

const ProductScreen = () => {
       
    // To Get Slug we use Use Params Hook
    const params=useParams();
    const {slug}=params;
    const [{loading,error,product},dispatch]=useReducer(reducer,{
      product:[],
  
      loading:true,
      error:'',
  
    })
      // const [products,setProducts]=useState([]);
      useEffect(()=>{
              const fetchData=async()=>{
                dispatch({type:'FETCH_REQUEST'});
                try{
                  const result=await axios.get(`/api/products/slug/${slug}`);
                  dispatch({type:'FETCH_SUCCESS',payload:result.data})
  
                }catch(err){
                  dispatch({type:'FETCH_FAIL',payload:getError(err)});
  
                }
                  
                  // setProducts(result.data)
              };
              fetchData();
  
  
      },[slug])

        const {state,dispatch:ctxDispatch}=useContext(Store);
        const {cart}=state;
        const navigate=useNavigate();

      const addToCartHandler=async()=>{
        const existItem=cart.cartItems.find((x)=>x._id===product.
        _id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${product._id}`);
        if (data.countInStock < quantity) {
          window.alert('Sorry. Product is out of stock');
          return;
        }
        
        ctxDispatch({type:'CART_ADD_ITEM',payload:{...product
        ,quantity}})
          navigate('/cart');
      }
    
  return (
    loading?(<LoadingBox/>
    ):
    error?(
      <MessageBox  variant="danger">{error}</MessageBox>
    ):

(
  <div>
  <Row>
    <Col md={6}>
      {/* Displaying Image */}
      <img src={product.image} className='img-large' alt={product.name}/>
    </Col>
    <Col md={3}>
    <ListGroup variant="flush">
      <ListGroup.Item>
      <Helmet>
        <title>{product.name}</title>
        </Helmet>
        <h1>{product.name}</h1>
      </ListGroup.Item>
    </ListGroup>
    <ListGroup.Item>
      <Rating
      rating={product.rating} numReviews={product.numReviews}>

      </Rating>
    </ListGroup.Item>
    <ListGroup.Item>Price: {product.price}</ListGroup.Item>
    <ListGroup.Item>
      Description:
      <p>{product.desription}</p>
    </ListGroup.Item>


      
    </Col>

    {/* Card Creation */}
    <Col md={3}>
      <Card>
        <Card.Body>
        <ListGroup variantt="flush">
        <ListGroup.Item>
        <Row>
          <Col>Price:</Col>
          <Col>{product.price}</Col>
        </Row>
        </ListGroup.Item>
        <ListGroup.Item>
        <Row>
          <Col>Stauts:</Col>
          <Col>{product.countInStock>0?
          <Badge bg="success"> In Stock</Badge>
          :
          <Badge bg="danger">Out Of Stock</Badge>
          }</Col>

        </Row>
        </ListGroup.Item>
        {product.countInStock>0 &&(
          <ListGroup.Item>
          <div className='d-grid'>
            <Button  onClick={addToCartHandler} variant="primary">
            Add To Cart
            </Button>
          </div>
          </ListGroup.Item>
        )}

        </ListGroup>
        </Card.Body>
      </Card>
    </Col>
  </Row>
</div>


)

// :<div>{product.name}</div>


  )
}

export default ProductScreen



//Begin with 1.54
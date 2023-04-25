import './App.css';
// import data from './data'
import {BrowserRouter,Routes,Route, Link} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import  Container  from 'react-bootstrap/Container'
import  Navbar  from 'react-bootstrap/Navbar';
import {LinkContainer} from 'react-router-bootstrap'
import Badge from 'react-bootstrap/esm/Badge';
import Nav from 'react-bootstrap/esm/Nav'
import { Store } from './Store';
import { useContext, useState } from 'react';
import CartScreen from './screens/CartScreen';

import SigninScreen from './screens/SigninScreen';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShippingAdd from './screens/ShippingAdd';
import SignoutScreen from './screens/SignoutScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import UserProfileScreen from './screens/UserProfileScreen';
// import { Store } from './Store';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    

    // Signout krne pe hatadega
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  };




const [sidebarIsOpen,setsidebarIsOpen]=useState(false)














  return (  
    <BrowserRouter >
    <div
        className={
          sidebarIsOpen
            ? 'd-flex flex-column site-container active-cont'
            : 'd-flex flex-column site-container'
        }
      >
    <ToastContainer position="bottom-center" limit={1} />
      <header>
      {/* Setting up react bootstarp Nabvar */}
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>KartZon</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='me-auto w-100  justify-content-end'>
              <Link to="/cart" className='nav-link'>
                Cart
                {
                  cart.cartItems.length>0 && (
                        <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                        {/* {cart.cartItems.length} */}

                        </Badge>

                  )
                 }
              </Link>

{/* User Info */}
{userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}


            </Nav>
            </Navbar.Collapse>
          
        </Container>
      </Navbar>
        {/* <Link to='/' >Amazon</Link> */}
      </header>
      <main>
      <Container className='mt-4'>
        <Routes>
        <Route path='/products/:slug' element={<ProductScreen/>} />
          <Route path='/' element={<HomeScreen/>} />
          <Route path='/cart' element={<CartScreen/>} />
          {/* Sign In Route */}
          <Route path='/signin' element={<SigninScreen/>}/>
              {/* RSignOut Route */}

              <Route path='/signout' element={<SignoutScreen/>}/>         
               {/* Shipping Route */}


          <Route path='/shipping' element={<ShippingAdd/>}/>
{/* Payment Route */}
          <Route path='/payment' element={<PaymentScreen/>}/>

          {/* Place order Route */}
          <Route path='/placeorder' element={<PlaceOrderScreen/>} />

                {/* Orderr Screen Route */}
            <Route path='/order/:id' element={<OrderScreen/>}/>
        
        {/* OrderHistory Router */}
              <Route path='/orderhistory' element={<OrderHistoryScreen/>} />
        
      
      
      
      {/* User Profile Router */}
      <Route path='/profile' element={<UserProfileScreen/>}/>
      
        </Routes>
      </Container>
       
      </main>
      <footer>
        <div className='text-center'>All Rights Reserved VG</div>
      </footer>

    </div>
    </BrowserRouter>
  );
} 

export default App;

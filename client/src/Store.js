import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState={
  userInfo: localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null,
  cart:{

  
    // Local Storgar mai save kne ke liye array 
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},

      paymentMethod: localStorage.getItem('paymentMethod')
      ? localStorage.getItem('paymentMethod')
      : '',

    
    // Local Storgar mai save kne ke liye array should not be empty
    // cartItems:[],
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],


  },
};
 
function reducer(state,action){
  switch(action.type){
    // adding to cart
    case 'CART_ADD_ITEM':

      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      return { ...state, cart: { ...state.cart, cartItems } };
      

      
 localStorage.setItem('cartItems', JSON.stringify(cartItems));

      //LocalStorage mai save krne ke liye verna refresh krne pe gyab hojata


      //Remove Item  
      case 'CART_REMOVE_ITEM': {
        const cartItems = state.cart.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        return { ...state, cart: { ...state.cart, cartItems } };
      }


      case 'CART_CLEAR':
        return { ...state, cart: { ...state.cart, cartItems: [] } };
  




      case 'USER_SIGNIN':
        return { ...state, userInfo: action.payload };



      case 'USER_SIGNOUT':
        return {
          ...state,
          userInfo: null,
          cart:{
            cartItems:[],shippingAddress:{},
            paymentMethod:''
          }
        };



      // return {...state,
      //   cart:{...state.cart,
      //     cartItems:[...state.cart.cartItems,action.payload],
      //   }
      // }


      case 'SAVE_SHIPPING_ADDRESS':
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };
      case 'SAVE_PAYMENT_METHOD':
        return {
          ...state,
          cart: {
            ...state.cart,
            paymentMethod: action.payload,
          },
        };
          







    default:
      return state;
  }
}


export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = {state, dispatch};
  return <Store.Provider value={value}>{props.children} </Store.Provider>;
}













// const initialState = {
// fullBox: false,
  //   userInfo: localStorage.getItem('userInfo')
  //     ? JSON.parse(localStorage.getItem('userInfo'))
  //     : null,
  
    // cart: {
      // shippingAddress: localStorage.getItem('shippingAddress')
      //   ? JSON.parse(localStorage.getItem('shippingAddress'))
      //   : { location: {} },
      // paymentMethod: localStorage.getItem('paymentMethod')
      //   ? localStorage.getItem('paymentMethod')
      //   : '',
      // cartItems: localStorage.getItem('cartItems')
      //   ? JSON.parse(localStorage.getItem('cartItems'))
  //       cartItems: [],
  //   },
  // };
  // function reducer(state, action) {
  //   switch (action.type) {
      // case 'SET_FULLBOX_ON':
      //   return { ...state, fullBox: true };
      // case 'SET_FULLBOX_OFF':
      //   return { ...state, fullBox: false };
  
      // case 'CART_ADD_ITEM':
        // add to cart  
      //   const newItem = action.payload;
      
      //   const existItem = state.cart.cartItems.find(
      //     (item) => item._id === newItem._id
      //   );
      //   const cartItems = existItem
      //     ? state.cart.cartItems.map((item) =>
      //         item._id === existItem._id ? newItem : item
      //       )
      //     : [...state.cart.cartItems, newItem];
      //   localStorage.setItem('cartItems', JSON.stringify(cartItems));
      //   return { ...state, cart: { ...state.cart, cartItems } };
      //   return { ...state, 
      //     cart: { ...state.cart,
      //          cartItems:[...state.cart.cartItems,action.payload] ,
              
      // } };
     
      // case 'CART_REMOVE_ITEM': {
      //   const cartItems = state.cart.cartItems.filter(
      //     (item) => item._id !== action.payload._id
      //   );
      //   localStorage.setItem('cartItems', JSON.stringify(cartItems));
      //   return { ...state, cart: { ...state.cart, cartItems } };
      // }
      // case 'CART_CLEAR':
      //   return { ...state, cart: { ...state.cart, cartItems: [] } };
  
      // case 'USER_SIGNIN':
      //   return { ...state, userInfo: action.payload };
      // case 'USER_SIGNOUT':
      //   return {
      //     ...state,
      //     userInfo: null,
      //     cart: {
      //       cartItems: [],
      //       shippingAddress: {},
      //       paymentMethod: '',
      //     },
      //   };
      // case 'SAVE_SHIPPING_ADDRESS':
      //   return {
      //     ...state,
      //     cart: {
      //       ...state.cart,
      //       shippingAddress: action.payload,
      //     },
      //   };
      // case 'SAVE_SHIPPING_ADDRESS_MAP_LOCATION':
      //   return {
      //     ...state,
      //     cart: {
      //       ...state.cart,
      //       shippingAddress: {
      //         ...state.cart.shippingAddress,
      //         location: action.payload,
      //       },
      //     },
      //   };
  
      // case 'SAVE_PAYMENT_METHOD':
      //   return {
      //     ...state,
      //     cart: { ...state.cart, paymentMethod: action.payload },
      //   };
  //     default:
  //       return state;
  //   }
  // }
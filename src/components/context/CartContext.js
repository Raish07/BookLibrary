// CartContext.js
import React, { createContext,  useReducer  } from 'react';

export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
        const isItemInCart = state.item.some((cartItem) => cartItem.id === action.payload.id);
  
        if (isItemInCart) {
          // If the item is already in the cart, increment its quantity
          return {
            ...state,
            item: state.item.map((cartItem) => {
              if (cartItem.id === action.payload.id) {
                return { ...cartItem, quantity: cartItem.quantity + 1 };
              }
              // alert('Item Added')
              return cartItem;
            }),
            isDuplicate: true,
          
          };
        } else {
         
          return {
            ...state,
            item: [...state.item, { ...action.payload, quantity: 1 }],
            isDuplicate: false,
          };
        }
        case 'DECREMENT':
          const itemInCart = state.item.some((cartItem) => cartItem.id === action.payload.id);
          if (itemInCart){
            return {
              ...state,
              item: state.item.map((cartItem) => {
                if (cartItem.id === action.payload.id && cartItem.quantity>0) {
               
                  return { ...cartItem, quantity: cartItem.quantity - 1 };
                }
              
                return cartItem;
              }),
              isDuplicate: true,
            
            };

          }
          else {
         
            return {
              ...state,
              item: [...state.item, { ...action.payload, quantity: 1 }],
              isDuplicate: false,
            };
          }

      case 'REMOVE':
        const updateItem = state.item.filter((book)=> book.id !==  action.payload.id)
        return{...state, item:updateItem,isDuplicate:false}

      case 'REMOVE_ALL':
        return{...state, item:[]}
    default:
      return state; 
  }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { item: [], isDuplicate: false });
  
    const addToCart = (item) => {
        dispatch({type:'ADD_TO_CART', payload:item})
    };
    const removeFromCart=(item)=>{
        dispatch({type:'REMOVE', payload:item })
    }
    const removeAll = (item) =>{
      dispatch({type:'REMOVE_ALL',payload:item})
    }
    const decrement = (item) =>{
      dispatch({type:'DECREMENT',payload:item})
    }
  
    return (
      <CartContext.Provider value={{ item: state.item, isDuplicate: state.isDuplicate,decrement, addToCart,removeAll ,removeFromCart}}>
        {children}
      </CartContext.Provider>
    );
  };
  
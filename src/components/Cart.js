import React, { useContext } from 'react';
import {CartContext} from './context/CartContext';
import { useAuth0 } from "@auth0/auth0-react";


const Cart = () => {
  const { item,isDuplicate,removeFromCart,addToCart,removeAll ,decrement} = useContext(CartContext)
  const { isAuthenticated} = useAuth0();
  const total_item = item.length
  
  const incrementQuantity = (book) =>{
    addToCart(book)
  }
  const decrementQuantity = (book) =>{
    decrement(book)
  }
  return (
    <>
    {isAuthenticated ? 
    <div>
      
    
      {isDuplicate && <p>This item is already in your cart.</p>}  
      {item.map((book) => (
        <div key={book.id}>
          {book.volumeInfo&&
          ( 
            <div>
            <ul className='book-items'>
            <li key={book.id} className='book-list'>
          <h3 className="book-heading">{book.volumeInfo.title}</h3>
            <p className='description'>{book.volumeInfo.description.substring(0,200)}</p>
            <img className = 'book-image'src={book.volumeInfo.imageLinks.thumbnail} alt='cover'/> 
         
          <button className="remove-btn" onClick={()=> removeFromCart(book)}>Remove</button>
          <p>Quantity: {book.quantity}</p>
          <button  className = 'btn-add'onClick={() => incrementQuantity(book)}>+1</button>
          <button  className = 'btn-add'onClick={() => decrementQuantity(book)}>-1</button>
          </li>
          </ul>

            </div> 
          )}
          
         
          </div>
      ))} {
       total_item>0?
      <button onClick={removeAll}>Remove All</button>: ""
      }
        
      

 
    </div>
: <p>Kindly Login</p>} 
    </>
  );

  
      }

      export default Cart;
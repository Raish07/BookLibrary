import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import {CartContext} from './context/CartContext';
import { useContext } from 'react';


function Navbar (){
 
  const{item} = useContext(CartContext)
  const total_item = item.length
 const { loginWithRedirect,isAuthenticated,logout ,user} = useAuth0();
  
  return(
    <>
    <div className='navbar'> 
    <nav>
      <ul className='nav-list'>
        {/* <li className='nav-link'>
          <Link className='link-to' to= '/'>Home </Link>
        </li> */}
        <li className='nav-link'>
          <Link className='link-to' to= '/shop'>Shop </Link>
        </li>
        {/* <li className='nav-link'>
          <Link className='link-to' to= '/Genre'>Genre </Link>
        </li> */}
        {/* <li className='nav-link'>
          <Link className='link-to' to= '/Filter'>Filter </Link>
        </li> */}
        <li className='nav-link'>
          <Link className='link-to' to= '/cart'>Cart {total_item}</Link>
        </li>
        {isAuthenticated &&(
          
            <div>
              
              <p>{user.name}</p>
              
            </div>
        )}
        {isAuthenticated ?
        <li>  <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Log Out
      </button></li>:
        <li className='nav-link'>
        <button onClick={() => loginWithRedirect()}>Log In</button>
        </li>
       }
      </ul>
        
    </nav>
    </div>
    </>
  )
}

export default Navbar;
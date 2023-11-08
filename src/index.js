import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-0dk320gjfrg8n1aj.us.auth0.com"
    clientId="meup1KFJVirNedF2xrRFtsmIFUJUdR4Y"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  > <App />

    </Auth0Provider>,
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

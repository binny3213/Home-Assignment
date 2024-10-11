import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App';
import './index.css';
import { FronteggProvider } from '@frontegg/react';


export const contextOptions = {
  baseUrl: 'https://app-jbvx0euswa57.frontegg.com',
  clientId: 'aaa44e39-f15e-4cd7-a7a5-6450e1078668',
  appId: '26e4292d-9daa-4309-8af0-c3ba3ee685e4'
};

const container = document.getElementById('root'); 

const root = ReactDOM.createRoot(container); 
root.render(
  <React.StrictMode>
    <FronteggProvider 
      contextOptions={contextOptions} 
      hostedLoginBox={false}
    >
      <App />
    </FronteggProvider>
  </React.StrictMode>
);



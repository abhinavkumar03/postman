import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />

    {/* <script src='/socket.io/socket.io.js'></script>
    <script>
      const socket = io();
    </script> */}

  </React.StrictMode>
);


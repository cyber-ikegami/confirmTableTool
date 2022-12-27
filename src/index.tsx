import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const REACT_APP_AUTH0_DOMAIN = 'dev-a0p0m4lr.us.auth0.com';
const REACT_APP_AUTH0_CLIENT_ID = 'ABaWpYVBZwTr3tkyxhq1kWh2YwT4epew';

ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

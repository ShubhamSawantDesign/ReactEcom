import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from "axios";

// axios.defaults.baseURL = 'https://data.artaux.io/';
axios.defaults.baseURL = 'https://data.artaux.io/';
axios.defaults.headers = { "Access-Control-Allow-Origin": "*" };

ReactDOM.render( 
    <React.StrictMode>
    <App/>
    </React.StrictMode>,
    document.getElementById('root')
);
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Tu CSS global
import './index.css'

// Bootstrap CSS + JS
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
    <App />
  </BrowserRouter>
)

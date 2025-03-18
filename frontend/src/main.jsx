import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
const stripePromise = loadStripe("pk_test_51QzzQaPqGqik9MxauRyYvOQG3N1E1Rxo6GuGLvzRpNKLCN6HJgwwdzIRlUx6Fs5c5cZ5vQIqQhKCCT611wudGVCn00EJYX0sPF");


createRoot(document.getElementById('root')).render(
  
  <Elements stripe={stripePromise}>
  <BrowserRouter>
    <App />
  </BrowserRouter>,
</Elements>
  
)

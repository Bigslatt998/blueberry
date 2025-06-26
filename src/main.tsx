import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './blueBerryComponents/CartContext.tsx'
import { WishlistProvider } from './blueBerryComponents/FavoriteContect.tsx'
import { BrowserRouter } from 'react-router-dom'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/blueberry/">
    <CartProvider>
    <WishlistProvider>
    <App />
    </WishlistProvider>
    </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)

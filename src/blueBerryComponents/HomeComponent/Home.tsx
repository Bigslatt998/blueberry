import React,{useState} from 'react'
import './Home.css'
import FlatOffer from '../HeaderComponent/FlatOfferComponent/FlatOffer'
import Header from '../HeaderComponent/Header.tsx/Header'
import Nav from '../HeaderComponent/NavComponet/Nav'
import Main from '../HomeComponent/MainComponent/Main.tsx'
import Cart from '../CartComponent/Cart.tsx'

// type Props = {}




const Home = () => {
    const [isKeywords, setisKeywords] = useState<boolean>(false)
    const [isCart, setIsCart] =useState<boolean>(false)
    
  return (
    <div className='OpenPageContainer'>
        <FlatOffer/>
        <Header isCart={isCart} setIsCart={setIsCart} isKeywords={isKeywords} setisKeywords={setisKeywords}/>
        <Nav isKeywords={isKeywords} setisKeywords={setisKeywords}/>
        <Main  isCart={isCart} setIsCart={setIsCart}/>
        <Cart isCart={isCart} setIsCart={setIsCart}/>
              
    </div>

  )
}

export default Home;
import Navbar from "./Components/Navbar/Navbar"
import {useState} from 'react'
import { Routes, Route } from 'react-router-dom'
import Cart from "./Pages/Cart/Cart"
import Home from "./Pages/Home/Home"
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder"
import Footer from "./Components/Footer/Footer"
import LoginPopup from "./Components/LoginPopup/LoginPopup"
import Verify from "./Pages/Verify/Verify"
function App() {

  const[showlogin,setShowLogin]=useState(false)

  return (
    <>
    {showlogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify/>} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App

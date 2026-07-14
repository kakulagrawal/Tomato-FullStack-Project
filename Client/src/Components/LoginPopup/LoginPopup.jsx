import React ,{useState}from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'

const LoginPopup = ({setShowLogin}) => {
    const[currstate,setCurrState]=useState("Sign Up")
  return (
    <div className='login-popup'>
      <form action="" className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currstate}</h2>
            <img onClick={()=>setShowLogin(false)}
            src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
            {currstate==="Login" ? <></>:<input type="text" placeholder='Your name' required/>}
            
            <input type="email" placeholder='Your email' required />
            <input type="password" placeholder='Password' required />
        </div>
        <button>{currstate==="Sign Up"?"Create Account":"Login"}</button>
        <div className='login-popup-condition'>
            <input type="checkbox" required />
            <p> I agree to terms of use and privacy policy.</p>
        </div>
        {currstate=="Login" ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}> Click Here</span></p>:
        <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login Here</span></p>}
      </form>

    </div>
  )
}

export default LoginPopup

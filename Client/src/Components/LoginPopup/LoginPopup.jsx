import React ,{useState}from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext.jsx'
import axios from 'axios'


const LoginPopup = ({setShowLogin}) => {

    const{url,setToken,token}=useContext(StoreContext);
    const[currstate,setCurrState]=useState("Sign Up")
    const[data,setData]=useState({
      name:"",
      email:"",
      password:""
    })
    const onChangeHandler=(event)=>{
      const name=event.target.name;
      const value=event.target.value;
      setData(data=>({...data,[name]:value}))
    }

    const onLogin=async(event)=>{
      event.preventDefault();
      let newUrl=url;
      if(currstate==="Login"){
        newUrl+="/api/user/login"
      }
      else{
        newUrl+='/api/user/register'
      }
      const response=await axios.post(newUrl,data);
      if(response.data.success){
        setToken(response.data.token)
        localStorage.setItem("token",response.data.token);
        setShowLogin(false)
      }
      else{
        alert(response.data.message)
      }
    }


    // useEffect(()=>{
    //   console.log(data)
    // },[data])

  return (
    <div className='login-popup'>
      <form  onSubmit={onLogin}
      action="" className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currstate}</h2>
            <img onClick={()=>setShowLogin(false)}
            src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-input">
            {currstate==="Login" ? <></>:<input name='name' onChange={onChangeHandler}
             value={data.name} type="text" placeholder='Your name' required/>}
            
            <input name='email' onChange={onChangeHandler} value={data.email}
            type="email" placeholder='Your email' required />
            <input name='password' onChange={onChangeHandler} value={data.password}
            type="password" placeholder='Password' required />
        </div>
        <button type='submit'
        >{currstate==="Sign Up"?"Create Account":"Login"}</button>
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

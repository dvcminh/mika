import React, { useState } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {

  const[state,setSate] = useState("Login");
  const [formData, setFormData] = useState({
    username:"",
    password:"",
    email:""
  })

  const changeHandler = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  const login = async () => {
    console.log("Login Function Excecuted", formData);
    let responseData;
    // await fetch('http://localhost:4000/login', {
    //   method:'POST',
    //   headers:{
    //     Accept:'application/form-data',
    //     'Content-Type':'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // }).then((response) => response.json()).then((data) => responseData = data)
    
    // if(responseData.success){
    //   localStorage.setItem('auth-token', responseData.token);
    //   window.location.replace("/");
    // }
    // else{
    //   alert(responseData.errors);
    // }
    alert("Login Function Excecuted")
  }

  const sign_up = async () => {
    console.log("Sign Up Function Excecuted", formData);
    let responseData;
    // await fetch('http://localhost:4000/signup', {
    //   method:'POST',
    //   headers:{
    //     Accept:'application/form-data',
    //     'Content-Type':'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // }).then((response) => response.json()).then((data) => responseData = data)
    
    // if(responseData.success){
    //   localStorage.setItem('auth-token', responseData.token);
    //   window.location.replace("/");
    // }
    // else{
    //   alert(responseData.errors);
    // }
    alert("Sign Up Function Excecuted")
  }

  return (
    <div className='loginsignup zoomed'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up"?<input name ='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name'/>:<></>}
          <input name = 'email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' required/>
          <input name = 'password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' required/>
        </div>
        <button onClick={() => {
            if(formData.email && formData.password) {
              state === "Login" ? login() : sign_up()
            } else {
              alert("Please fill in all fields.");
            }
          }}>Continue</button>
        {state === "Sign Up" ? <p className="loginsignup-login">Already have an account? <span onClick = {() => {setSate("Login")}}>Login here</span></p>:<p className="loginsignup-login">Create an account? <span onClick = {() => {setSate("Sign Up")}}>Click here</span></p>}
        
        {state === "Sign Up"? <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div> : <></>}
      </div>
    </div>
  )
}

export default LoginSignup

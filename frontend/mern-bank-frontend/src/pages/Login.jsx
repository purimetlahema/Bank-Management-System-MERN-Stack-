import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate("")

  function handleLogin(e){
    e.preventDefault()
    const data = {email,password}
    axios.post("http://localhost:5000/api/auth/login",data)
    .then((res)=>{
      console.log(data)
      localStorage.setItem("token",res.data.token)
      alert("Login success")
      navigate("/dashboard")
    })
    .catch(err=>console.log(err))
  }
  return (
    <>
      <form className="form-box" onSubmit={handleLogin}>
        <h2 className="form-title">Login</h2>
        <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)} } required placeholder='Enter Email' /> <br />

        <input type="text" value={password} onChange={(e)=>{setPassword(e.target.value)}} required placeholder='Enter password' /> <br />

        <button>Login</button>
      </form>
    </>
  )
}

export default Login
import axios from 'axios'
import React, { useState } from 'react'

const Signup = () => {
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [msg,setMsg] = useState("")

  function handleSignup(e){
        
          e.preventDefault()
          const data = {name,email,password}
          axios.post("http://localhost:5000/api/auth/signup",data)
          .then(()=>{
            setName("")
          setEmail("")
          setPassword("")
          alert("Signup success")
          })
          .catch(err=>console.log(err))
        
  }
  return (
    <>
      

      <form className="form-box" onSubmit={handleSignup}>
         <h2 className="form-title">Signup</h2>
        <input type="text" value={name} placeholder='Enter name' required onChange={(e)=>{setName(e.target.value)}} /> <br />

        <input type="text" value={email} placeholder='Enter Email' required onChange={(e)=>{setEmail(e.target.value)}} /> <br />

        <input type="text" value={password} placeholder='Enter Password' required onChange={(e)=>{setPassword(e.target.value)}} /> <br />

        <button>Signup</button>
      </form>
    </>
  )
}

export default Signup
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })

  let history = useNavigate();
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = credentials;

    const response = await fetch("http://localhost:8000/api/auth/createuser", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin":"*"
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json()
    console.log(json);
    if(json.success){
      // save the auth token
      localStorage.setItem('token', json.authtoken)
      history("/")
      props.showAlert("Account Created Successfully","Success")
    }
    else{
      props.showAlert("Invalid Details","danger")
    }
  



  }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input name='name' value={credentials.name} type="text" onChange={onChange} className="form-control" required id="name" aria-describedby="emailHelp" />

        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input name='email' value={credentials.email} type="email" onChange={onChange} className="form-control" required id="email" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" value={credentials.password} className="form-label">Password</label>
          <input name='password' minLength={5} required type="password" onChange={onChange} className="form-control" id="password" />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" value={credentials.password} className="form-label">Confirm Password</label>
          <input name='cpassword' minLength={5} required type="password" onChange={onChange} className="form-control" id="cpassword" />
        </div>
        <button type="submit" className="btn btn-primary" >Sign up</button>
      </form>
    </div>
  )
}

export default Signup

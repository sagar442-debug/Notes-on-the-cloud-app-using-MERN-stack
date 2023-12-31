import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    let history = useNavigate();

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8000/api/auth/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json()
        console.log(json)
        if (json.success) {
            // save the auth token
            localStorage.setItem('token', json.authtoken)
            history("/")
            props.showAlert("Logged In Successfully", "Success")
        }
        else {
            props.showAlert("Invalid credentials", "Danger")
        }
    }
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input name='email' value={credentials.email} type="email" onChange={onChange} className="form-control" id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" value={credentials.password} className="form-label">Password</label>
                    <input name='password' type="password" onChange={onChange} className="form-control" id="password" />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login

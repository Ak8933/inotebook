import React, { useState} from 'react'
import {useNavigate} from 'react-router-dom'


const Login = (props) => {

    const [credentials,setCredentials] = useState({email:"",password:""})
    let navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
         //API call
         const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:credentials.email, password:credentials.password})
        })
        const json = await response.json();
        console.log(json);
        if(json.login_success){
            //save the auth token and redirect
            localStorage.setItem('token',json.authtoken);
            navigate("/");
            props.showAlert("Logged In Successfully!","success")

        }
        else{
            props.showAlert("Invalid Details","warning")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} required/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} minLength={5} required/>
                </div>
               
                <button type="submit" className="btn btn-info">Submit</button>
            </form>
        </div>
    )
}

export default Login

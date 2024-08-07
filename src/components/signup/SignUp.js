import React, { useState } from 'react'
import './SignUp.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const SignUp = () => {
    const history = useNavigate()
    const [inputs,setInputs] = useState({
        email:"",
        username: "",
        password: "",
    })
    const change = (e)=>{
        const {name,value} = e.target;
        setInputs({...inputs, [name]:value})
    }
    const submit = async(e) => {
        e.preventDefault();
        axios.post(`${window.location.origin}/api/v1/register`, inputs).then((response)=>{
            if(response.data.message === "User Already Exists"){
                alert(response.data.message)
            }else{
                alert(response.data.message)
                setInputs({
                    email:"",
                    username: "",
                    password: "",
                })
                history("/login")
            }          
            
        })
        
        
    }
  return (
    <div className='signup'>
        <div className='container'>
            <div className='row'>
                <div className='col-lg-8 column d-flex justify-content-center align-items-center'>
                    <div className='d-flex flex-column w-100 p-3'>
                        <label>Email :</label>
                        <input className='p-2 my-3 input-signup'
                        onChange={change} value={inputs.email} name='email' type='email' placeholder='Enter Your Email'/>
                        <label>User Name :</label>
                        <input className='p-2 my-3 input-signup'
                        onChange={change} value={inputs.username} name='username' type='username' placeholder='Enter Username'/>
                        <label>Password :</label>
                        <input className='p-2 my-3 input-signup'
                        onChange={change} value={inputs.password} name='password' type='password' placeholder='Enter Your Password'/>
                        <div><button className='btn-signup p-2' onClick={submit}>Sign Up</button></div>
                    </div>
                </div>
                <div className='col-lg-4 column col-left d-lg-flex justify-content-center align-items-center d-none '>
                    <h1 className='text-center sign-up-heading'>Sign <br/> Up</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignUp
import React, { useState } from 'react'
import './SignUp.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { authActions } from '../../store'
const LogIn = () => {
    const dispatch = useDispatch()
    const history = useNavigate()
    const [inputs,setInputs] = useState({
        email:"",
        password: "",
    })
    const change = (e)=>{
        const {name,value} = e.target;
        setInputs({...inputs, [name]:value})
    }
    const submit = async(e) => {
        e.preventDefault();
        await axios.post(`${window.location.origin}/api/v1/login`, inputs)
        .then((response)=>{
            sessionStorage.setItem("id",response.data.others._id)    
            dispatch(authActions.login())
            history("/todo")
        })
    }
  return (
    // ${window.location.origin}
    <div>
        <div className='container'>
            <div className='row'>
                <div className='col-lg-4 column d-none d-lg-flex justify-content-center align-items-center'>
                    <h1 className='text-center sign-up-heading'>Sign <br/> In</h1>
                </div>
                <div className='col-lg-8 column col-left d-flex justify-content-center align-items-center'>
                    <div className='d-flex flex-column w-100 p-3'>
                        <label>Email:</label>
                        <input className='p-2 my-3 input-signup' onChange={change} value={inputs.email} name='email' type='email' placeholder='Enter Your Email'/>
                        <label>Password:</label>
                        <input className='p-2 my-3 input-signup' onChange={change} value={inputs.password} name='password' type='password' placeholder='Enter Your Password'/>
                        <div><button className='btn-signup p-2' onClick={submit}>Sign In</button></div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default LogIn
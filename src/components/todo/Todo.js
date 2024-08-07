import React, { useEffect, useState } from 'react'
import './Todo.css'
import TodoCards from './TodoCards'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './Update';
import axios from 'axios';

let id = sessionStorage.getItem("id")
let toUpdateArray =[]

const Todo = () => {
    const [inputs, setInputs] = useState({title: "",body: ""})
    const [array, setArray] = useState([])

    const show=()=>{
        document.getElementById("textarea").style.display = 'block';
    }
    const change=(e)=>{
        const {name, value} = e.target;
        setInputs({...inputs, [name]: value})
    }
    const submit = async()=>{
        if(inputs.title === "" || inputs.body === ""){
            toast.error("Title or Body Should Not Be Empty")
        }else{
            if(id){
                await axios.post(`${window.location.origin}/api/v2/todos`, {
                    title:inputs.title, body:inputs.body,id:id,
                }).then((response)=>{console.log(response)})
                
                setInputs({title:"", body:""})
                toast.success("Your Task Is Added")
                
            }
            else{
                setArray([...array,inputs])
                setInputs({title:"", body:""})
                toast.success("Your Task Is Added")
                toast.error("Your Task Is Not Saved ! Please SignUp")
            }
            
        }
        
    }
    const del = async(Cardid) =>{
        if(id){
            await axios.delete(`${window.location.origin}/api/v2/todos/${Cardid}`,{
                data:{id:id},
            })
            .then((response)=>{
                toast.success("Your Task Is Deleted")
            })
        } else{
            toast.error("Please SignUp First")
        }
        
    }
    const dis = (value)=>{
        document.getElementById("todo-update").style.display = value;
    }
    const update = (value)=>{
        toUpdateArray = array[value]
    }

    useEffect(()=>{
        if(id){
            const fetch = async()=>{
                await axios.get(`${window.location.origin}/api/v2/todos/${id}`)
                .then((Response)=>{
                    setArray(Response.data.list)
                })
            }
            fetch()
        }
        
    },[submit])

  return (
    <>
    <div className='todo'>
        <ToastContainer/>
        <div className='todo-main container d-flex flex-column justify-content-center align-items-center my-4'>
            <div className='d-flex flex-column todo-input-div w-100 p-1'>
                <input type='text' placeholder='TITLE' className='my-2 p-2 todo-inputs' 
                onChange={change}
                name='title'
                value={inputs.title}
                onClick={show}/>
                <textarea id='textarea' type="text" placeholder='BODY' name='body' className='p-2 todo-inputs'
                value={inputs.body} onChange={change}/>
            </div>
            <div className='w-lg-50 w-100 d-flex justify-content-end my-3'>
            <button className='home-btn px-2 py-1' onClick={submit}>Add</button>
            </div>
            
        </div>
        <div className='todo-body'>
            <div className='container-fluid'>
                <div className='row'>
                    {array && array.map((item,index)=> (<div className='col-lg-3 col-11 mx-lg-5 mx-3 my-2' key={index}>
                        <TodoCards title={item.title}
                         body={item.body}
                          id={item._id} 
                          delid={del} 
                          display={dis}
                          updateId={index}
                          toBeUpdate={update} />
                        </div>))}
                    
                </div>
                
            </div>
        </div>
    </div>
    <div className='todo-update' id='todo-update'>
        <div className='container update'><Update display={dis} update={toUpdateArray}/></div>
    </div>
    </>
  )
}

export default Todo
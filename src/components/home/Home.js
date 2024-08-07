import React from 'react'
import "./Home.css"
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className='bg-container home d-flex justify-content-center align-items-center'>
        <div className='container'>
            <h1>Organize your <br/> work and life, finally.</h1>
            <p>Become focused, organized, and calm with <br/>
            todo app. The World's #1 task manager app.</p>
            
            <button className='home-btn p-2'><Link className='toto-link active' to="todo">Make Todo List</Link></button>
        </div>
    </div>
  )
}

export default Home
import React, {useRef, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'
import { useAuth } from '../../context/authContext'
export default function Login(){
const navigate = useNavigate()
  const { loginUser } = useAuth()
  const name = useRef()
  const email = useRef()
  const password = useRef()

  async function handleLoginUser(e){
    e.preventDefault()
    await loginUser(email.current.value, password.current.value)
  }

  
  useEffect(() => {
    if(localStorage.getItem('accessToken') !== null) {
      navigate(`/tasks/${localStorage.getItem('userUid')}`)
    }
  },[])
  return(
    <>
    <div className="container-singIn">
      <div className="sing-in-login">
        <form  onSubmit={handleLoginUser}>
         <h1>Sing in</h1>
          <label htmlFor='name'>Name:</label>
          <input
           id='name'
           placeholder='name' 
           ref={name} type="text" 
           autoComplete='off' 
           required={true}/>
          
          <label htmlFor='email'>E-mail:</label>
          <input id='email' 
          placeholder='e-mail' 
          ref={email} 
          type="text" 
          autoComplete='off'  
          required={true}/>

          <label htmlFor='password'>Password:</label>
          <input 
          id='password'  
          ref={password} 
          type="password" 
          placeholder='password' 
          required={true}/>

          <button type='submit'>Sing-in</button>
      </form>
      </div>
      <div className="sing-up-login">
      <div className='aside-sing-up-login'>
      <h2>
        Welcome Back!
      </h2>
      <p>if you already have an account, sing-in here</p>
      <button onClick={() => {navigate('/singup')}}>Sing up </button>
      </div>
      </div>
    </div>
    </>
  )
}
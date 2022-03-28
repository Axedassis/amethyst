import React, {useRef, useEffect} from 'react'

import './style.css'

import { useNavigate } from 'react-router-dom'

import { useAuth } from '../../context/authContext'

import toast from 'react-hot-toast'

export default function Login(){ 
  const name = useRef()
  const email = useRef()
  const password = useRef()

  const { loginUser } = useAuth()

  const navigate = useNavigate()

  async function handleLoginUser(e){ 
    e.preventDefault()

    if(name.current.value.length < 3){
      toast('the name should contain at least 3 characters',{
        icon: '❌',
        style: {
          borderRadius: '10px',
          background: '#333',
          fontSize: '1.7rem',
          fontFamily: 'Nunito', 
          color: '#fff',
        }
      })
      return;
    }

    if(password.current.value.length < 6){
      toast('the password should contain at least 6 characters',{
        icon: '❌',
        style: {
          borderRadius: '10px',
          background: '#333',
          fontSize: '1.7rem',
          fontFamily: 'Nunito', 
          color: '#fff',
        }
      })
      return;
    }

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
           placeholder='Name' 
           ref={name} type="text" 
           autoComplete='off' 
           required={true}
           />
          
        <label htmlFor='email'>E-mail:</label>
          <input id='email' 
            placeholder='Email' 
            ref={email} 
            type="text" 
            autoComplete='off'  
            required={true}
          />

       <label htmlFor='password'>Password:</label>
          <input 
           id='password'  
           ref={password} 
           type="password" 
           placeholder='Password' 
           required={true}/>
  
          <button type='submit'>Sing-in</button>
    </form>
  </div>

  <div className="sing-up-login">
    <div className='aside-sing-up-login'>
      <h2> Welcome Back! </h2>
        <p>if you already have an account, sing-in here</p>
      <button onClick={() => {navigate('/singup')}}>Sing up </button>
    </div>
  </div>
</div>
    </>
  )
}
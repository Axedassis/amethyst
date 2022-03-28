import React, {useRef, useEffect} from 'react';

import './style.css'

import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

export default function SingUp(){

  const name = useRef()
  const email = useRef()
  const password = useRef()
  const confirmPassword = useRef()

  const { createUser, setCurrentUser, createStruct } = useAuth()

 const navigate = useNavigate()

  async function handleCreateUser(e){
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

    if(password.current.value !== confirmPassword.current.value){
      toast('passwords do not match ',{
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

    await createUser(email.current.value, password.current.value)
    .then(async (userCredential) => {

    setCurrentUser(userCredential)
    await createStruct(userCredential, name)

    navigate(`/tasks/${userCredential.user.uid}`)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    if(localStorage.getItem('accessToken') !== null) {
      navigate(`/tasks/${localStorage.getItem('userUid')}`)
    }
  },[])

  return(
    <>
<div className='container'>
  <div className='sing-in'>
      <aside>
        <h2>Welcome Back!</h2>
        <p>if you already have an account, sing-in here</p>
        <button onClick={() => { navigate('/login') }}>Sing in</button>
      </aside>
    </div>
       <form className='sing-up' onSubmit={handleCreateUser}>
         <h1>Sing up</h1>
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
          required={true}
          />
          
          <label htmlFor='confirmPassword'>Confirm Password:</label>
          <input 
          id='confirmPassword'  
          ref={confirmPassword} 
          type="password"  
          placeholder='Password'  
          required={true}
          />

          <button type='submit'>Sing-up</button>
      </form>
</div>
    </>
  )
}
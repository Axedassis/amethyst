import React, {useRef, useEffect} from 'react';
import './style.css'
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
export default function SingUp(){
  const navigate = useNavigate()
  const name = useRef()
  const email = useRef()
  const password = useRef()
  const confirmPassword = useRef()
  const { createUser, setCurrentUser, createStruct } = useAuth()

  async function handleCreateUser(e){
    e.preventDefault()

    if(password.current.value.length < 6){
      alert('passwords mucho pequeno')
      return;
    }

    if(password.current.value !== confirmPassword.current.value){
      alert('passwords do not match')
      return;
    }

    await createUser(email.current.value, password.current.value)
    .then((userCredential) => {
      setCurrentUser(userCredential)
      createStruct(userCredential, name)
    localStorage.setItem('userUid', userCredential.user.uid)
    localStorage.setItem('userUrl', `/tasks/${userCredential.user.uid}`)
    localStorage.setItem('accessToken', userCredential.user.accessToken)
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
      <h2>
        Welcome Back!
      </h2>
      <p>if you already have an account, sing-in here</p>
      <button onClick={() => {navigate('/login')}}>Sing in</button>
      </aside>
    </div>
        <form className='sing-up' onSubmit={handleCreateUser}>
         <h1>Sing up</h1>
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

          
          <label htmlFor='confirmPassword'>Confirm Password:</label>
          <input 
          id='confirmPassword'  
          ref={confirmPassword} 
          type="password"  
          placeholder='password'  
          required={true}/>
          <button type='submit'>Sing-up</button>
      </form>
    </div>
    </>
  )
}
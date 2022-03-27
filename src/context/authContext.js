import React, { createContext, useContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { auth } from '../services/FirebaseConfig'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {  collection, setDoc, doc, addDoc, getDocs} from 'firebase/firestore/lite';
import { db } from '../services/FirebaseConfig'
const path = collection(db, 'users')

const AuhtContext = createContext()

export function useAuth(){
  return useContext(AuhtContext)
}

export function AuthProvider(prosp){
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
     const unsubcriber =  auth.onAuthStateChanged((user) => {
      if(user){
         setCurrentUser(user)
      }
      return unsubcriber;
    })
  }, [])
  
  async  function createUser(email, password){
    return await createUserWithEmailAndPassword(auth, email, password)
  }

  async function createStruct(userCredential, name){
    await setDoc(doc(path, userCredential.user.uid),{
      nameUser: name.current.value,
    })

    await addDoc(collection(db, 'users', userCredential.user.uid, 'tasks'),{
     
    })
  }

  async function updateValuesTasks(collectionRef, setTasks){
    const getTasks = async () => {
      const data = await getDocs(collectionRef)
      setTasks(data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }
      )))
    }
    getTasks()
  }

  async function loginUser(email, password){

    await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      setCurrentUser(userCredential)
      localStorage.setItem('userUid', userCredential.user.uid)
      localStorage.setItem('userUrl', `/tasks/${userCredential.user.uid}`)
      localStorage.setItem('accessToken', userCredential.user.accessToken)

      navigate(`/tasks/${userCredential.user.uid}`)
    }).catch((err) => {
      toast('the credentials are invalid or user not found or do not exist ',{
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
    })
  }

async function handleLogOff(){
 await  setCurrentUser('')
  localStorage.clear()
 navigate('/login')
}
  const value = {
    createUser,
    setCurrentUser,
    updateValuesTasks,
    currentUser,
    createStruct,
    loginUser,
    handleLogOff
  }

  return(
    <>
    <AuhtContext.Provider value={value}>
      {prosp.children}
    </AuhtContext.Provider>
    </>
  )
}
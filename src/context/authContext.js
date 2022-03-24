import React, { createContext, useContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../services/FirebaseConfig'

import {  collection, setDoc, doc, addDoc, } from 'firebase/firestore/lite';
import { db } from '../services/FirebaseConfig'
const path = collection(db, 'users')

const AuhtContext = createContext()

export function useAuth(){
  return useContext(AuhtContext)
}

export function AuthProvider(prosp){
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
     const unsubcriber =  auth.onAuthStateChanged((user) => {
      if(user){
         setCurrentUser(user)
      }
      return unsubcriber;
    })
  }, [])
  function createUser(email, password){
    return createUserWithEmailAndPassword(auth, email, password)
  }

  async function createStruct(userCredential, name){
    await setDoc(doc(path, userCredential.user.uid),{
      nameUser: name.current.value,
    })

    await addDoc(collection(db, 'users', userCredential.user.uid, 'tasks'),{
      teste: 'okay',
    })
  }
  const value = {
    createUser,
    setCurrentUser,
    currentUser,
    createStruct
  }

  return(
    <>
    <AuhtContext.Provider value={value}>
      {prosp.children}
    </AuhtContext.Provider>
    </>
  )
}
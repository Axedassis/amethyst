import React, {useRef, useEffect, useState} from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore/lite';
import { db } from '../../services/FirebaseConfig';
import { useAuth } from '../../context/authContext';

export default function Tasks(){

 const { currentUser } = useAuth()
 const taskName = useRef()
 const [tasks, setTasks] = useState([])
  const collectionRef = collection(db, 'users', localStorage.getItem('userUid'), 'tasks')

  async function handleCreateNewTask(e){
    e.preventDefault()
    await addDoc(collectionRef, {
      content: taskName.current.value
    })
    taskName.current.value = ''
  }

  useEffect(() => {
    const getTasks = async () => {
      const data = await getDocs(collectionRef)
      setTasks(data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }
      )))
    }
    getTasks()
    console.log('aaaaa')
  }, [])
  
  function atualizar(){
    console.log('teste')
    return;
  }
  return(
    <>
    <form onSubmit={handleCreateNewTask}>
    <input 
    type="text"
    ref={taskName}
    required={true}
    />
    <button type='submit' onClick={atualizar()}>Add</button>
    </form>
    {tasks.map((task) => (
      <p key={task.id}>{task.content}</p>
    ))}
    </>
  )
}
import React, { useRef, useEffect, useState } from 'react';

import './style.css'

import { collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore/lite';

import { db } from '../../services/FirebaseConfig';

import { useAuth } from '../../context/authContext';

import {useParams, useNavigate}  from "react-router-dom"

export default function Tasks(){
  const { updateValuesTasks, handleLogOff } = useAuth()

  const taskName = useRef()
  const [tasks, setTasks] = useState([])
  const [ buttonDisable, setButtonDisable ] = useState(false)

  const collectionRef = collection(db, 'users', localStorage.getItem('userUid'), 'tasks')
  const params = useParams('/tasks/uid')
 
  const navigate = useNavigate()

  async function handleCreateNewTask(){
    setButtonDisable(true)
      await addDoc(collectionRef, {
        content: taskName.current.value,
        completed: false,
        createAt: new Date()
      })
      taskName.current.value = ''
      updateValuesTasks(collectionRef, setTasks)
    setButtonDisable(false)
  }

  async function handleCompletedTask(id, taskCompleted){
    const ref = doc(db, 'users', localStorage.getItem('userUid'), 'tasks', id)
    if(taskCompleted){
      await updateDoc(ref, {
            completed: false,
          })
    }else{
    await updateDoc(ref, {
        completed: true,
      })
    }
   
    updateValuesTasks(collectionRef, setTasks)
  }

  async function handleLogOfffunction(){
    handleLogOff()
  }

  async function handleDeleteTask(id){
     const ref = doc(db, 'users', localStorage.getItem('userUid'), 'tasks', id)
    await deleteDoc(ref)

    updateValuesTasks(collectionRef, setTasks)
   }

  useEffect(() => {
    if(params !== localStorage.getItem('userUrl')){
      navigate(`/tasks/${localStorage.getItem('userUid')}`)
    }
    
    updateValuesTasks(collectionRef, setTasks)
  }, [])
  
  return(
    <> 
    <div className='banner'></div>
<div className='body'>
  <div className='log-off'>
      <button onClick={handleLogOfffunction}>Log-off</button>
  </div>
    
  <div className='all-tasks'>
    <div className='tasks'>
      <h1>T O D O</h1>
      <div className='task-input'>
        <button
        type='submit' 
        disabled={buttonDisable}
        className='add'
        onClick={() => {handleCreateNewTask()}}>+</button>

        <input 
         type="text"  
         placeholder="create a new to do..."
         ref={taskName}
         required={true} />
      </div>
      <div className='tasks-content'>
        {tasks.map((task) => (
          <>
          <div className={task.completed ? 'task-unique completedTask' :'task-unique' } key={task.id}>
            <div className='task-unique-content'>
              <button onClick={() => { 
              handleCompletedTask(task.id, task.completed)}} 
              className={task.completed ? 'completed true lala' : 'completed'} id={task.id}>
              </button>

              <p>{task.content}</p>
            </div>
              <div className='container-btn'>
              <button
                onClick={() => {handleDeleteTask(task.id)}}
                className="dell" ><strong>x</strong></button>
              </div>
          </div>
          </>))}
      </div>
    </div>
  </div>
</div>
    </>
  )
}
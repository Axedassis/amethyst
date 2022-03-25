import React, {useRef, useEffect, useState} from 'react';
import { collection, addDoc, deleteDoc, doc, updateDoc, where } from 'firebase/firestore/lite';
import { db } from '../../services/FirebaseConfig';
import { useAuth } from '../../context/authContext';
import {useParams, useNavigate}  from "react-router-dom"
import './style.css'
export default function Tasks(){
 const { currentUser, updateValuesTasks } = useAuth()
 const taskName = useRef()
 const [tasks, setTasks] = useState([])
const collectionRef = collection(db, 'users', localStorage.getItem('userUid'), 'tasks')
const params = useParams('/tasks/uid')
const navigate = useNavigate()
  async function handleCreateNewTask(){

    await addDoc(collectionRef, {
      content: taskName.current.value,
      completed: false,
      createAt: new Date()
    })
    taskName.current.value = ''
    updateValuesTasks(collectionRef, setTasks)

  }

  async function handleCompletedTask(id){
    const ref = doc(db, 'users', localStorage.getItem('userUid'), 'tasks', id)
    await updateDoc(ref, {
      completed: true,
    })
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
    console.log(currentUser)
  }, [])
  
  return(
    <> 
  
  <div className='body'>
    <div className='banner'>

    </div>
    
    <div className='all-tasks'>
    <div className='tasks'>
    <h1>T O D O</h1>
    <div className='task-input'>
    <button
     type='submit' 
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
      <div className='task-unique' key={task.id}>
        <div className='task-unique-content' >
         <button onClick={() => {handleCompletedTask(task.id)}} className="completed" ></button>
          <p>{task.content}</p>
          </div>
          <div className='manga'>
          <button
           onClick={() => {handleDeleteTask(task.id)}}
            className="dell" ><strong>X</strong></button>
          </div>
      </div>
      </>
      ))}
    </div>
    </div>
    </div>
</div>











{/* 

    <div className='all'>
    <div className='container-task'>
      <h1>Amethyst</h1>
      <br />
      <div className='item-container'>
      <form onSubmit={handleCreateNewTask}>
        <input  type="text"  ref={taskName} required={true} />
        <button type='submit' className='add'>+</button>
      </form>


      {tasks.map((task) => (
      <div className='task' key={task.id}>
        <p>{task.content}</p>
        <button onClick={() => {handleDeleteTask(task.id)}} className="dell" >x</button>
      </div>
      ))}
      
      </div>
    </div>
    </div> */}
    </>
  )
}
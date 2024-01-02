// useEffect is used if you want something to happen when the page loads
// useState changes the state of the current/default value of a component
import { useState , useEffect} from 'react'
import Header from "./components/Header";
import React from 'react'
import Tasks from "./components/Tasks";
import NoTask from './components/NoTask';
import AddTask from './components/AddTask';
import Footer from './components/Footer';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import About from './components/About';
const App = () => {

   // if we want to change any part of the state we call setTasks
  // because state is immutable
  // we added it here instead of tasks so it can be 
  // accessed globally
  const [task, setTasks]= useState([
  ])
  const [showAddTask, setShowAddTask]= useState(false)
  useEffect(()=>{
    const getData=async ()=>{
      const dataFromServer= await fetchData()
      setTasks(dataFromServer)
    }

    getData()
    
  }, []) // if present [] it will only call useEffect when a change/effect occurs

// GetData
  const fetchData= async ()=>{
    const res= await fetch("http://localhost:8000/tasks")
    const data= await res.json()
    return data
  }

  //Fetch a single Task

  const fetchTask = async (id)=> {
    const res = await fetch(`http://localhost:8000/tasks/${id}`)
    const task= await res.json()
    return task
  }

  // Update Data

  const updateData= async (id, updatedTask)=>{
     await fetch(`http://localhost:8000/tasks/${id}`, {
      method: 'PATCH',
      headers : {
        'Content-type' : 'application/json',
      },
    body : JSON.stringify(updatedTask),

  })
    
  }

  // Add Task 
  const addTask= async (taskObject)=>{
    const res= await fetch('http://localhost:8000/tasks', {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json',
      },
      body : JSON.stringify(taskObject),
    })
    const data= await res.json()
    

    // const id = Math.floor(Math.random()* 1000) + 1
    // const newTask={id, ...taskObject} // getting the id and adding the task that's passed in
     setTasks([...task, data]) // copying the task array and adding the newTask to it
  
  }

  // Delete Task
  const deleteTask =async (id)=> {
    await fetch(`http://localhost:8000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(task.filter((task)=> task.id !== id))
  }


  // ToggleReminder

  const ToggleReminder=  async (id)=>{

    const taskToToggle= await fetchTask(id)
    const updatedTask= {...taskToToggle, reminder : !taskToToggle.reminder} // this tells it to spread the task object, find the reminder and change to the opposite
    await updateData(id, updatedTask)
   setTasks(task.map((task)=> 
    task.id === id ? {...task , reminder : !task.reminder} : task //// this tells it to spread the task object, find the reminder and change to the opposite
   ))
  }
  return (
    <Router>
 <div className="container">
      <Header title= 'TaskTracker' onAdd={()=>setShowAddTask(!showAddTask)} showAddTask= {showAddTask}/>
     
       <Routes>
       <Route
    path='/'
    exact
    element={
      <div>
        {showAddTask && <AddTask onAdd={addTask} />}
        {task.length > 0 ? (
          <Tasks task={task} onDelete={deleteTask} onToggle={ToggleReminder} />
        ) : (
          <NoTask title='there are no more tasks' />
        )}
      </div>
    }
  />


        <Route path='/about' Component={About}/>
        </Routes>
      
      <Footer/>
    </div>
    </Router>
   
  )
}
// using a route to make things more structured
// it will show the about and everything else in the app.js file since it's embedded


export default App
   //you can pass props as arguments suchas Header title ="Hello"
          // and then you can go to your Header.Js file and write 
          // Header = props.title
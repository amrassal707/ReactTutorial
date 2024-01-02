import React from 'react'
import { useState } from 'react'

// we use the value = {text} from the state so when you type in the input, it fires the onchange as a controlled component 
const AddTask = ({onAdd}) => {
    const [text, setText]= useState('')
    const [day, setDay]= useState('')
    const [reminder, setReminder]= useState(false)
    const onSubmit= (e)=> {
        e.preventDefault()
        if(!text || !day){
            alert('please add a Task/Day')
            return
        }
        onAdd({text, day, reminder})
        setText('')
        setDay('')
        setReminder(false)
    }
  return (
    <form className='add-form' onSubmit={onSubmit}>
        <div className='form-control'>
            <label >Task</label>
            <input type='text' placeholder='Add Task' value = {text} onChange={(e)=> setText(e.target.value)} />
        </div>
        <div className='form-control'>
            <label>Day & Time</label>
            <input type='text' placeholder='Add Date' value={day} onChange={(e)=> setDay(e.target.value)}/>
        </div>
        <div className='form-control-check'>
            <label>Reminder</label>
            <input type='checkbox' checked={reminder} value={reminder} onChange={(e)=> setReminder(e.currentTarget.checked)}/>
        </div>

    <input type='submit'  className = 'btn btn-block' value={'save Task'}/>
    </form>
  )
}

export default AddTask

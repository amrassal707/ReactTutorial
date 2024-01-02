//import React from 'react' 
import PropTypes from 'prop-types'
import Button from './Button'
import { useLocation } from 'react-router-dom'
const Header = ({title, onAdd, showAdd}) => {
const location = useLocation()
  
  return (
    <header className='header'>
        <h1>{title}</h1>
       
        {location.pathname === '/' && <Button color = {showAdd ? 'red' : 'green'} text = {showAdd ? 'close' : 'AddTask' } onClick={onAdd}/>}
    </header>
  )
}

Header.propTypes= {
    title: PropTypes.string.isRequired, // to identify better robust strong typing
}

const styleHeading= {
    color : 'red',
} // CSS in JS , h1 style= {styleHeading}
export default Header

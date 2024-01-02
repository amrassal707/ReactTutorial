import PropTypes from 'prop-types'

const Button = ({color, text , onClick}) => {
    // const onClick = ()=>{
    //     console.log("helllo");
    // }
  return (
    <div>
       <button className='btn' style = {{backgroundColor: color}} onClick={onClick}>{text}</button>
    </div>
  )
}

Button.defaultProps= {
    color : 'steelblue',
}
Button.propTypes = {
    text : PropTypes.string,
    color : PropTypes.string,
}
export default Button

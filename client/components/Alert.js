import React from 'react'
import ReactDOM from 'react-dom'

const Alert = (props) => {
  const classNames = props.error ? "alert alert-error" : "alert";
  const text = props.error ? "An error occurred" : "Not a valid URL";
  return(
    <div className={classNames} role="alert">
      { text }
    </div>
  )
}

export default Alert;

import React from 'react'
import './Buttons.css'

function SubmitButton({contentText}) {
  return (
    <input type="submit" className='btn btn-default' value={contentText} />
  )
}

export default SubmitButton
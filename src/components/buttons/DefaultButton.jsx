import React from 'react'
import './Buttons.css'

function DefaultButton({contentText, setValideCart}) {
  if (setValideCart) {
    return (
      <button onClick={() => { setValideCart(true); }} className='btn btn-default'>{contentText}</button>
    )
  }
  return (
    <button  className='btn btn-default'>{contentText}</button>
  )
}

export default DefaultButton
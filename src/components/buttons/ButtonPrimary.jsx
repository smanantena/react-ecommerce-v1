import React from 'react'

function ButtonPrimary({contentText, onClickFunc}) {
  return (
    <button onClick={() => {onClickFunc()}} className='btn btn-default'>{contentText}</button>
  )
}

export default ButtonPrimary
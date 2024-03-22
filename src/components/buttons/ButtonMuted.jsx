import React from 'react'

function ButtonMuted( { contentText, onClickEvent } ) {
  return (
    <button onClick={onClickEvent} className='btn btn-muted'>{ contentText }</button>
  )
}

export default ButtonMuted
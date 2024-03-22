import React from 'react'
import { BiSolidMessageAltError } from "react-icons/bi"
import './css/NotFound.css'

function NotFound() {
  return (
    <main>
      <div className='container'>
        <section className='error-section'>
          <BiSolidMessageAltError className='error-icon'/>
          <h1 className='text-danger'>Error</h1>
          <p>This ressource does not exist !</p>
        </section>
      </div>
    </main>
  )
}

export default NotFound
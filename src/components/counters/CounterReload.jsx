import React from 'react'

function CounterReload({ counter }) {
  return (
    <div style={{ fontSize: '1rem', textAlign: 'center' }}>
       <p>Automatic refresh after</p>
       <p style={{ fontWeight: '700' }}> { counter } second.</p>
    </div>
  )
}

export default CounterReload
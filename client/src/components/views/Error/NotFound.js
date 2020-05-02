import React from 'react'

export const NotFound = () => {
  return (
    <div className='app'>
      <span style={{ fontSize: '5rem' }}>404 Not Found</span>
      <span style={{ fontSize: '2rem' }}>We're sorry, this resource is not found</span>
      <span style={{ fontSize: '2rem' }}><a href="/login" className="btn">Go Login</a></span>
    </div>
  )
}

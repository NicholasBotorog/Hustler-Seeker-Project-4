import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => { 
  return (
    <div className="hero text-center">
      <div className="hero-container text-light">
        <div style={ { marginTop: '100px' } }>
          <h1 className='display-2'> Welcome to hustler paradise !</h1>
          <Link to='/register' className='btn btn-danger'>Register</Link>
        </div>
        <div style={ { marginTop: '100px' } }>
          <p className='lead'>Do you already have an account ?</p>
          <Link to='/login' className='btn btn-danger'>Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Home
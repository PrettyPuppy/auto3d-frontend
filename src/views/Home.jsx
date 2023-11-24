import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

  console.log('Home View here');

  return (
    <div className='welcome-wrapper'>
      <div className="background-image-div">
        <Link to={'/register'} style={{marginLeft: '80%'}}>Sign up</Link>
        <Link to={'/login'} style={{marginLeft: '30px'}}>Sign In</Link>
      </div>
    </div>
  )
}

export default Home
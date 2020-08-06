import React from 'react'
import { useAppContext } from '../libs/contextLib'

const Home = () => {
  const { isAuthenticated } = useAppContext()
  
  return (
    <div>
      <h1>{isAuthenticated ? 'Welcome!' : 'Hi!'}</h1>
    </div>
  )
}

export default Home

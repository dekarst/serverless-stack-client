import React from 'react'
import { useAppContext } from '../libs/context'

const Home = () => {
  const { user } = useAppContext()
  
  return (
    <div>
      <h1>{user ? 'Welcome!' : 'Hi!'}</h1>
    </div>
  )
}

export default Home

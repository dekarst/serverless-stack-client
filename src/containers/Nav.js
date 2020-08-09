import React from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { useAppContext } from '../libs/context'

const Container = styled.div`
  position: absolute;
  top: 1em;
  & * {
    padding: 0 2em;
    text-decoration: none;
    color: chartreuse;
  }
`

const Nav = () => {
  const { user, setUser } = useAppContext()
  const history = useHistory()
  
  const handleLogout = async () =>  {
    await Auth.signOut()
    setUser(false)
    history.push('/login')
  }

  return (
    <Container>
      {user
        ? <>
            <Link to='/'>{user.toString().split('@')[0]}</Link>
            <Link to='/notes'>Notes</Link>
            <Link to='/notes/new'>New</Link>
            <Link to="/pay">Pay</Link>
            <Link onClick={handleLogout} to='/'>Logout</Link>
          </>
        : <>
            <Link to='/'>Home</Link>
            <Link to='/login'>Log In</Link>
            <Link to='/signup'>Sign Up</Link>
          </>
      }
    </Container>
  )
}

export default Nav

import React from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { useAppContext } from '../libs/contextLib'

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
  const { isAuthenticated, userHasAuthenticated } = useAppContext()
  const history = useHistory()
  
  const handleLogout = async () =>  {
    await Auth.signOut()
    userHasAuthenticated(false)
    history.push('/login')
  }

  return (
    <Container>
      {isAuthenticated
        ? <Link onClick={handleLogout} to='/'>Logout</Link>
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

import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Container = styled.div`
  position: absolute;
  top: 1em;
  & * {
    padding: 0 2em;
    text-decoration: none;
    color: chartreuse;
  }
`

const Nav = () => (
  <Container>
    <Link to='/'>Home</Link>
    <Link to='/login'>Log In</Link>
    <Link to='/signup'>Sign Up</Link>
  </Container>
)

export default Nav

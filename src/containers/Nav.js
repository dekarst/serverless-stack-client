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
    <Link to='/login'>Login</Link>
    <Link to='/signup'>Signup</Link>
  </Container>
)

export default Nav

import React from 'react'
import styled, { keyframes } from 'styled-components'
import logo from './logo.svg'
import Routes from './Routes'
import Nav from './containers/Nav'

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  background-color: #101010;
  color: chartreuse;
  text-align: center;
`

const Content = styled.div`
  padding: 1em;
  background: green;
  border-radius: 50%;
  border-bottom: 12em double red;
`

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Logo = styled.img`
  height: 25vmin;
  animation: ${spin} infinite .4s linear;
  cursor: pointer;
`

const App = () => (
  <Container>
    <Nav />
    <Content>
      <Logo src={logo} className='logo' alt='logo' />
      <Logo src={logo} className='logo' alt='logo' />
      <Routes />
    </Content>
  </Container>
)

export default App

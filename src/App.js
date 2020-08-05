import React from 'react'
import styled, { keyframes } from 'styled-components'
import logo from './logo.svg'
import Routes from './Routes'
import Nav from './containers/Nav'
import useMousePosition from './hooks/useMousePosition'

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  background: linear-gradient(black, darkgreen);
  color: chartreuse;
  text-align: center;
`

const Content = styled.div`
  padding: 1em;
  background: green;
  border-radius: 50%;
  border-left: ${props => `${400*(.2*props.w-props.x)/props.w}px solid darkgreen`};
  border-right: ${props => `${1200*(props.x-.8*props.w)/props.w}px solid darkgreen`}; 
  border-bottom: ${props => `${(1-props.y/props.h)*15-5}em double red`};
  background-clip: content-box; 
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

const App = () => {
  const { x, y } = useMousePosition();

  return (
    <Container>
      <Nav />
      <Content 
        h={window.innerHeight} 
        w={window.innerWidth} 
        x={x} 
        y={y}
      >
        <Logo src={logo} className='logo' alt='logo' />
        <Logo src={logo} className='logo' alt='logo' />
        <Routes />
      </Content>
    </Container>
  )
}

export default App

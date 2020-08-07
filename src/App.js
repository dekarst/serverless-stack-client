import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Auth } from 'aws-amplify'
import { AppContext } from './libs/context'
import Nav from './containers/Nav'
import Eyes from './containers/Eyes'
import Routes from './Routes'
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
  border-bottom: ${props => `${(1-props.y/props.h)*15-7}em double red`};
  background-clip: content-box; 
`

const App = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(true)
  const [isAuthenticated, userHasAuthenticated] = useState(false)
  const { x, y } = useMousePosition()

  useEffect(() => {
    onLoad()
  }, []);
  
  const onLoad = async () => {
    try {
      await Auth.currentSession()
      userHasAuthenticated(true)
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
    setIsAuthenticating(false)
  }

  return (
    !isAuthenticating &&
    <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
      <Container>
        <Nav />
        <Content 
          h={window.innerHeight} 
          w={window.innerWidth} 
          x={x} 
          y={y}
        >
          <Eyes />
          <Routes />
        </Content>
      </Container>
    </AppContext.Provider>
  )
}

export default App

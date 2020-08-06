import React from 'react'
import styled, { keyframes } from 'styled-components'
import logo from '../svg/logo.svg'

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

const Eyes = () => (
  <div>
    <Logo src={logo} alt='logo' />
    <Logo src={logo} alt='logo' />
  </div>
)

export default Eyes

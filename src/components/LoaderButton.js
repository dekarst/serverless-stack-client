import React from "react";
import styled, { keyframes } from 'styled-components'
import loader from '../svg/loader.svg' 	

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Loader = styled.img`
  margin-right: 5px;
  animation: ${spin} 1s infinite linear;
`

const LoaderButton = ({ isLoading, disabled = false, ...props }) => {
  return (
    <button disabled={isLoading || disabled} {...props} >
      {isLoading && <Loader src={loader} />}
      {props.children}
    </button>
  )
}

export default LoaderButton

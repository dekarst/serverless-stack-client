import React, { useState } from 'react'
import styled from 'styled-components'
import { Auth } from 'aws-amplify'
import { useAppContext } from '../libs/contextLib'
import { useHistory } from 'react-router-dom'
import LoaderButton from '../components/LoaderButton'
import { onError } from '../libs/errorLib'

const Form = styled.form`
  width: 50%;
  margin: 1em auto;
  display: flex;
  flex-direction: column;
  & div {
    display: flex;
    justify-content: space-between;
  }
  & button {
    text-align: center;
    font-size: 1em;
  }
`

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { userHasAuthenticated } = useAppContext()
  const history = useHistory()

  const validateForm = () => email.length > 0 && password.length > 0

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      await Auth.signIn(email, password)
      userHasAuthenticated(true)
      history.push('/')
    } catch (e) {
      onError(e)
      setIsLoading(false)
    }
  }
  
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            autoFocus
            type='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Pass</label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type='password'
          />
        </div>
        <LoaderButton isLoading={isLoading} disabled={!validateForm()} type='submit'>
          Login
        </LoaderButton>
      </Form>
    </div>
  )
}

export default Login


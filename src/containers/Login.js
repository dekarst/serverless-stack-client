import React, { useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { useAppContext } from '../libs/context'
import { onError } from '../libs/error'
import useFormFields from '../hooks/useFormFields'
import LoaderButton from '../components/LoaderButton'

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
  const history = useHistory()
  const { userHasAuthenticated } = useAppContext()

  const [isLoading, setIsLoading] = useState(false)
  const [fields, setFields] = useFormFields({
    email: '',
    password: ''
  });


  const validateForm = () => fields.email.length > 0 && fields.password.length > 0

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      await Auth.signIn(fields.email, fields.password)
      userHasAuthenticated(fields.email)
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
            id='email'
            value={fields.email}
            onChange={setFields}
          />
        </div>
        <div>
          <label>Pass</label>
          <input
            type='password'
            id='password'
            value={fields.password}
            onChange={setFields}
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


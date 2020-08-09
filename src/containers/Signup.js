import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
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

const Signup = () => {
  const history = useHistory()
  const { setUser } = useAppContext()

  const [isLoading, setIsLoading] = useState(false)
  const [fields, setFields] = useFormFields({
    email: '',
    password: '',
    confirmPassword: '',
    confirmationCode: '',
  })
  const [newUser, setNewUser] = useState(null)

  const validateForm = () => (
    fields.email.length > 0 &&
    fields.password.length > 0 &&
    fields.password === fields.confirmPassword
  )

  const validateConfirmationForm = () => fields.confirmationCode.length > 0

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password
      })
      setIsLoading(false)
      setNewUser(newUser)
    } catch (e) {
      onError(e)
      setIsLoading(false)
    }
  }

  const handleConfirmationSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode)
      await Auth.signIn(fields.email, fields.password)
      setUser(true)
      history.push('/')
    } catch (e) {
      onError(e)
      setIsLoading(false)
    }
  }

  const renderConfirmationForm = () => (
    <Form onSubmit={handleConfirmationSubmit}>
      <p>Check your email for the confirmation code.</p>
      <div>
        <label>Code</label>
        <input
          autoFocus
          type='tel'
          id='confirmationCode'
          value={fields.confirmationCode}
          onChange={setFields}
        />
      </div>
      <LoaderButton
        type='submit'
        isLoading={isLoading}
        disabled={!validateConfirmationForm()}
      >
        Verify
      </LoaderButton>
    </Form>
  )

  const renderForm = () => (
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
      <div>
        <label>Pass</label>
        <input
          type='password'
          id='confirmPassword'
          onChange={setFields}
          value={fields.confirmPassword}
        />
      </div>
      <LoaderButton
        type='submit'
        isLoading={isLoading}
        disabled={!validateForm()}
      >
        Signup
      </LoaderButton>
    </Form>
  )

  return (
    <div className='Signup'>
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  )
}

export default Signup

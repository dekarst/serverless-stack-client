import React, { useState } from 'react'
import styled from 'styled-components'

const Form = styled.form`
  width: 55%;
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
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }
  
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Pass</label>
          <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <button disabled={!validateForm()} type="submit">
          Login
        </button>
      </Form>
    </div>
  )
}

export default Login


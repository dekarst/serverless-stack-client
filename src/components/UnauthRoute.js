import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAppContext } from '../libs/context'

const UnauthRoute = ({ children, ...rest }) => {
  const { user } = useAppContext()
  return (
    <Route {...rest}>
      {!user ? (
        children
      ) : (
        <Redirect to='/' />
      )}
    </Route>
  )
}

export default UnauthRoute

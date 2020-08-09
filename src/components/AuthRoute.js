import React from 'react'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { useAppContext } from '../libs/context'

const AuthRoute = ({ children, ...rest }) => {
  const { pathname, search } = useLocation()
  const { user } = useAppContext()
  return (
    <Route {...rest}>
      {user ? (
        children
      ) : (
        <Redirect to={
          `/login?redirect=${pathname}${search}`
        } />
      )}
    </Route>
  )
}

export default AuthRoute

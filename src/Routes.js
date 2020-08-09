import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './containers/Home'
import Login from './containers/Login'
import Signup from './containers/Signup'
import NewNote from './containers/NewNote'
import Notes from './containers/Notes'
import Note from './containers/Note'
import Pay from './containers/Pay'
import NotFound from './containers/NotFound'
import AuthRoute from './components/AuthRoute'
import UnauthRoute from './components/UnauthRoute'

const Routes = () => (
  <Switch>
    <Route exact path='/'>
      <Home />
    </Route>
    <UnauthRoute path='/login'>
      <Login />
    </UnauthRoute>
    <UnauthRoute path='/signup'>
      <Signup />
    </UnauthRoute>
    <AuthRoute exact path='/notes/new'>
      <NewNote />
    </AuthRoute>
    <AuthRoute exact path='/notes/:id'>
      <Note />
    </AuthRoute>
    <AuthRoute path='/notes'>
      <Notes />
    </AuthRoute>
    <AuthRoute exact path='/Pay'>
      <Pay />
    </AuthRoute>
    <Route>
      <NotFound />
    </Route>
  </Switch>
)

export default Routes

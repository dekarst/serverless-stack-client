import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './containers/Home'
import Login from './containers/Login'
import Signup from './containers/Signup'
import NewNote from './containers/NewNote';
import Notes from './containers/Notes';
import Note from './containers/Note';
import NotFound from './containers/NotFound'

const Routes = () => (
  <Switch>
    <Route exact path='/'>
      <Home />
    </Route>
    <Route path='/login'>
      <Login />
    </Route>
    <Route path='/signup'>
      <Signup />
    </Route>
    <Route exact path='/notes/new'>
      <NewNote />
    </Route>
    <Route exact path='/notes'>
      <Notes />
    </Route>
    <Route exact path='/notes/:id'>
      <Note />
    </Route>
    <Route>
      <NotFound />
    </Route>
  </Switch>
)

export default Routes

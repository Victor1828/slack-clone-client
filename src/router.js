import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import RegisterForm from './components/RegisterForm'

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={RegisterForm} />
    </Switch>
  </BrowserRouter>
)

export default Router

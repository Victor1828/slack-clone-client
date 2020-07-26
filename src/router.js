import React from 'react'
import jwtDecode from 'jwt-decode'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Home from './components/Home'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import TeamForm from './components/TeamForm'

const isAuthenticated = () => {
  const token = localStorage.getItem('token')
  const refreshToken = localStorage.getItem('refreshToken')

  try {
    jwtDecode(token)
    jwtDecode(refreshToken)
  } catch (error) {
    return false
  }

  return true
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated() ? <Component {...props} /> : (
        <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )}
    />
  )
}

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={RegisterForm} />
      <Route path="/login" exact component={LoginForm} />
      <PrivateRoute path="/create_team" exact component={TeamForm} />
    </Switch>
  </BrowserRouter>
)

export default Router

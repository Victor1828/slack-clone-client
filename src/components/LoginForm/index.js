import React, { useState } from 'react'
import { Container, Header, Form, Input, Button } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'

const { Field } = Form

const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`

const LoginForm = () => {
  const [formInputValues, setFormInputValues] = useState({})
  const [login] = useMutation(LOGIN)

  const handleOnChange = event => {
    const { name, value } = event.target
    setFormInputValues({ ...formInputValues, [name]: value })
  }

  const handleSubmit = async () => {
    try {
      const { data } = await login({ variables: formInputValues })
      const { login: { token, refreshToken, success } } = data

      if (!success) return

      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', refreshToken)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container style={{ marginTop: '20px' }}>
      <Header as="h2">Login</Header>
      <Form onSubmit={handleSubmit}>
        <Field
          control={Input}
          icon="mail"
          iconPosition="left"
          label="Email"
          placeholder="Email"
          name="email"
          onChange={handleOnChange}
        />
        <Field
          control={Input}
          icon="lock"
          iconPosition="left"
          type="password"
          label="Password"
          placeholder="Password"
          name="password"
          onChange={handleOnChange}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  )
}

export default LoginForm

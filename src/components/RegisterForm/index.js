import React, { useState } from 'react'
import { Button, Form, Container, Header, Input } from 'semantic-ui-react'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { useHistory } from 'react-router-dom'

const { Field } = Form

const REGISTER_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password) {
      success
      user {
        id
        username
        email
      }
      errors {
        path
        message
      }
    }
  }
`

const RegisterForm = () => {
  const [formInputValues, setFormInputValues] = useState({})
  const [formErrors, setFormErrors] = useState({})
  const [registerUser] = useMutation(REGISTER_USER)
  const history = useHistory()

  const checkForErrors = data => {
    const { registerUser: register } = data
    const errors = {}

    if (register.success) return

    register.errors.forEach(error => {
      errors[error.path] = {
        content: error.message,
        pointing: 'below',
      }
    })
    setFormErrors(errors)
  }

  const handleChange = event => {
    const { value, name } = event.target
    setFormInputValues({ ...formInputValues, [name]: value })
  }

  const handleSubmit = async () => {
    try {
      const { data } = await registerUser({ variables: formInputValues })
      checkForErrors(data)
      if (Object.keys(formErrors).length || !data.registerUser.success) return
      history.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container>
      <Header as="h2">Register</Header>
      <Form onSubmit={handleSubmit}>
        <Field
          control={Input}
          label="Username"
          placeholder="Username"
          onChange={handleChange}
          name="username"
          error={formErrors.username}
          required
        />
        <Field
          control={Input}
          label="Email"
          placeholder="Email"
          onChange={handleChange}
          name="email"
          error={formErrors.email}
          required
        />
        <Field
          control={Input}
          type="password"
          label="Password"
          placeholder="Password"
          onChange={handleChange}
          name="password"
          error={formErrors.password}
          required
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  )
}

export default RegisterForm

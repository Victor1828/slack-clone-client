import React, { useState } from 'react'
import { Button, Form, Container, Header } from 'semantic-ui-react'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

const REGISTER_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`

const RegisterForm = () => {
  const [formInputValues, setFormInputValues] = useState({})
  const [registerUser, { data }] = useMutation(REGISTER_USER)

  const handleChange = event => {
    const { value, name } = event.target
    setFormInputValues({ ...formInputValues, [name]: value })
  }

  const handleSubmit = () => {
    registerUser({ variables: formInputValues })
    console.log(data)
  }

  return (
    <Container>
      <Header as="h2">Register</Header>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Username</label>
          <input onChange={handleChange} name="username" placeholder="Username" />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input onChange={handleChange} name="email" placeholder="Email" />
        </Form.Field>
        <Form.Field>
          <label>Passoword</label>
          <input onChange={handleChange} name="password" placeholder="Password" />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  )
}

export default RegisterForm

import React, { useState } from 'react'
import { Container, Header, Form, Input, Button } from 'semantic-ui-react'
import { gql, useMutation } from '@apollo/client'

const { Field } = Form

const CREATE_TEAM = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      success
      team {
        id
        name
      }
      errors {
        path
        message
      }
    }
  }
`

const TeamForm = () => {
  const [teamName, setTeamName] = useState('')
  const [errors, setErrors] = useState({})
  const [createTeam] = useMutation(CREATE_TEAM)

  const checkForErrors = data => {
    const errors = {}
    data.forEach(error => {
      errors[error.path] = {
        content: error.message,
        pointing: 'below',
      }
    })
    setErrors(errors)
  }

  const handleChange = event => {
    const { value } = event.target
    setTeamName(value)
  }

  const handleSubmit = async () => {
    try {
      const { data } = await createTeam({ variables: { name: teamName } })
      const { createTeam: { success, team, errors } } = data

      if (errors.lenght || !success) return checkForErrors(errors)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container style={{ marginTop: '20px' }}>
      <Header as="h2">Create Team</Header>
      <Form onSubmit={handleSubmit}>
        <Field
          control={Input}
          icon="users"
          iconPosition="left"
          label="Team name"
          placeholder="Team name"
          onChange={handleChange}
          error={errors.name}
          required
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  )
}

export default TeamForm

import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const GET_ALL_USERS_QUERY = gql`
  {
    getAllUsers {
      id
      username
      email
    }
  }
`

const Home = () => {
  const { loading, error, data = [] } = useQuery(GET_ALL_USERS_QUERY)
  const { getAllUsers = [] } = data

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {getAllUsers.map(user => <h1 key={user.id}>{user.username}</h1>)}
    </>
  )
}

export default Home

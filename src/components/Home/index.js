import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { Menu, Accordion, Label, Icon, Input } from 'semantic-ui-react'
import {
  MainContainer,
  TeamsContainer,
  Header,
  ChannelTitle,
  ChannelInfo,
  ChannelActions,
  InputContainer,
  TeamBadge,
} from './styles'

const { Item } = Menu

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
  const [activeChannelAccordion, setActiveChannelAccordion] = useState(true)
  const [activeMessagesAccordion, setActiveMessagesAccordion] = useState(true)

  return (
    <MainContainer>
      {/* {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>} */}
      <TeamsContainer>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '13px 16px',
          }}
        >
          <TeamBadge>AI</TeamBadge>
        </div>
      </TeamsContainer>
      <Menu
        vertical
        style={{
          gridColumn: '2/3',
          gridRow: 'span 3',
          background: '#40313d',
          borderRadius: 0,
          margin: 0,
          maxWidth: '180px',
        }}
      >
        <Item
          style={{
            color: '#fff',
            borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          Acme Inc.
          <Icon name='dropdown' />
          <div style={{ padding: '0.5em 0' }}>
            <Label
              circular
              color='green'
              empty
              size='mini'
              style={{ marginRight: '15px' }}
            />
            Sharon Robinson
          </div>
        </Item>
        <Item style={{ color: '#fff' }}>
          <Accordion fluid>
            <Accordion.Title
              active={activeChannelAccordion}
              index={0}
              onClick={() => setActiveChannelAccordion(!activeChannelAccordion)}
              style={{ color: '#fff' }}
            >
              <Icon name='dropdown' />
              Channels
            </Accordion.Title>
            <Accordion.Content active={activeChannelAccordion}>
              <p># Test Channel</p>
            </Accordion.Content>
          </Accordion>
        </Item>
        <Item style={{ color: '#fff' }}>
          <Accordion fluid>
            <Accordion.Title
              active={activeMessagesAccordion}
              index={0}
              onClick={() =>
                setActiveMessagesAccordion(!activeMessagesAccordion)
              }
              style={{ color: '#fff' }}
            >
              <Icon name='dropdown' />
              Direct Messages
            </Accordion.Title>
            <Accordion.Content active={activeMessagesAccordion}>
              <div style={{ padding: '0.5em 0' }}>
                <Label
                  circular
                  color='green'
                  empty
                  size='mini'
                  style={{ marginRight: '15px' }}
                />
                Test
              </div>
            </Accordion.Content>
          </Accordion>
        </Item>
      </Menu>
      <Header>
        <ChannelTitle>#general</ChannelTitle>
        <ChannelInfo>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                borderRight: '1px solid #ccc',
                marginRight: '10px',
                alignSelf: 'center',
                paddingRight: '10px',
              }}
            >
              <Icon name='star outline' />
            </div>
            <div
              style={{
                borderRight: '1px solid #ccc',
                marginRight: '10px',
                alignSelf: 'center',
                paddingRight: '10px',
              }}
            >
              <Icon name='user outline' />4
            </div>
            <div
              style={{
                borderRight: '1px solid #ccc',
                marginRight: '10px',
                alignSelf: 'center',
                paddingRight: '10px',
              }}
            >
              <Icon name='pin' />
            </div>
            <div>
              <Icon name='pencil' />
              Add a topic
            </div>
          </div>
        </ChannelInfo>
        <ChannelActions>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              padding: ' 13px 5px',
            }}
          >
            <Icon
              name='phone'
              style={{ alignSelf: 'center', marginLeft: '10px' }}
            />
            <Icon
              name='info circle'
              style={{ alignSelf: 'center', marginLeft: '10px' }}
            />
            <Icon
              name='cog'
              style={{ alignSelf: 'center', marginLeft: '10px' }}
            />
            <Input
              icon='search'
              placeholder='Search...'
              style={{ alignSelf: 'center', marginLeft: '10px' }}
            />
            <Icon
              name='at'
              style={{ alignSelf: 'center', marginLeft: '10px' }}
            />
            <Icon
              name='star outline'
              style={{ alignSelf: 'center', marginLeft: '10px' }}
            />
            <Icon
              name='ellipsis vertical'
              style={{ alignSelf: 'center', marginLeft: '10px' }}
            />
          </div>
        </ChannelActions>
      </Header>
      <InputContainer>
        <Input placeholder='Message #general' style={{ width: '100%' }} />
      </InputContainer>
    </MainContainer>
  )
}

export default Home

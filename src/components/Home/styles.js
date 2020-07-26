import styled from 'styled-components'

export const MainContainer = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 50px 180px 1fr;
  grid-template-rows: 55px 1fr 55px;
`

export const TeamsContainer = styled.div`
  background: #2c1726;
  grid-column: 1/2;
  grid-row: span 3;
`

export const TeamBadge = styled.div`
  background: red;
  width: 25px;
  height: 25px;
  color: #fff;
  border-radius: 5px;
  border: 2px solid #fff;
  text-align: center;
`

export const Header = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
`

export const ChannelTitle = styled.div`
  grid-column: span 1;
  grid-row: span 1;
  padding: 13px 5px 0 5px;
`

export const ChannelInfo = styled.div`
  grid-column: span 1/2;
  grid-row: span 2;
  padding: 5px;
`

export const ChannelActions = styled.div`
  grid-column: 2/3;
  grid-row: 1/3;
`

export const InputContainer = styled.div`
  grid-column: 3/4;
  grid-row: 3/4;
  padding: 5px;
`

import React from 'react';
import styled from 'styled-components';
import { remote } from 'electron';

const Base = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  top: 32px;
  left:128px;
  user-select: none;
`
const Title = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
&::before {
  content: ' ';
  border-right: 1px solid black;
  height: 100%;
  position: absolute;
}
`
const AppName = styled.h1`
font-family: 'Comfortaa';
font-size: 32px;
padding-right: 16px;
margin-top: 0px;
margin-bottom: 0px;
`
const AppVersion = styled.span`
font-family: 'Comfortaa';
font-weight: 200;
font-size: 12px;
padding-right: 16px;
`
const BusinessName = styled.img`
height: 48px;
padding-left: 16px;
`
export const AppTitle = () => {
  const [appVersion] = React.useState(remote.app.getVersion());

  return (
    <Base>
      <Title>
        <AppName>Paradise Client</AppName>
        <AppVersion>Versión: {appVersion}</AppVersion>
      </Title>
      <BusinessName src="/assets/businessLogo.png" />
    </Base>
  )
}
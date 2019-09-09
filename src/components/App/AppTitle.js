import React from 'react';
import styled from 'styled-components';
import { remote } from 'electron';

const Base = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  top: 16px;
  left:128px;
`
const Title = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
`
const AppName = styled.h1`
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
font-size: 24px;
margin-bottom: 0px;
`

export const AppTitle = () => {
  const [appVersion] = React.useState(remote.app.getVersion());

  return (
    <Base>
      <Title>
        <AppName>Paradise Client</AppName>
        <span>Versión: {appVersion}</span>
      </Title>
    </Base>
  )
}
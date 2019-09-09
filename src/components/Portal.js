import React from 'react'
import styled from 'styled-components'

import { AppTitle } from './App/AppTitle'

const Base = styled.div`
height: 100%;
width: 100%;
position: absolute;
background-color: ${props => props.color || "#EDF0F2"};
`

export const Portal = (props) => {
  return(
    <Base>
      {props.children}
      <AppTitle />
    </Base>
  )
}
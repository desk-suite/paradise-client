import React from 'react';
import { HashRouter, Redirect, Route } from 'react-router-dom';
import styled from 'styled-components';
import { ipcRenderer, remote } from 'electron';
import { Layout, notification } from 'antd';
import { AppMenu } from './components/App/Menu';
import { Dashboard } from './views/Dashboard';
import { Hotel } from './views/Hotel';
import './App.css';

export const App = () => {
  const Title = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    height: 62px;
    width: fit-content;
    line-height: initial;
  `;
  const AppName = styled.span`
    font-family: 'Comfortaa';
    font-weight: 600;
    font-size: 16px;
  `;
  const AppVersion = styled.span`
    font-family: 'Comfortaa';
    font-weight: 200;
    font-size: 8px;
  `;
  const [appVersion] = React.useState(remote.app.getVersion());
  ipcRenderer.on('message', (event, text) => {
    notification.info({
      message: 'Paradise Client',
      description: text,
      placement: 'bottomRight'
    });
  });

  return (
    <HashRouter>
      <Layout
        style={{
          height: '-webkit-fill-available'
        }}
      >
        <AppMenu />
        <Layout>
          <Layout.Header style={{ background: '#f0f2f5' }}>
            <Title>
              <AppName>Paradise Client</AppName>
              <AppVersion>Versión: {appVersion}</AppVersion>
            </Title>
          </Layout.Header>
          <Layout.Content>
            <Redirect from="/" to="dashboard/" />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/hotel" component={Hotel} />
          </Layout.Content>
        </Layout>
      </Layout>
    </HashRouter>
  );
};

import React from 'react';
import { HashRouter, Redirect, Route } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import { Layout } from 'antd';
import { CornerDialog } from 'evergreen-ui';
import { AppMenu } from './components/App/Menu';
import { Dashboard } from './views/Dashboard';
import { Hotel } from './views/Hotel';
import './App.css';

export const App = () => {
  // const electron = window.require('electron')
  const [message, setMessage] = React.useState(' ');
  const [showMessage, setShowMessage] = React.useState(false);
  ipcRenderer.on('message', (event, text) => {
    setShowMessage(true);
    setMessage(text);
  });

  // const STMenu = styled(Menu)`
  // height: 100%;
  // max-width: 200px;
  // `
  // const Layout = styled(layout)`
  //   position: absolute;
  //   height: 100%;
  //   background-color: #f5f5f5;
  // `
  // const Content = styled(layout.Content)`
  // width: 100%;
  // `

  return (
    <HashRouter>
      <Layout
        style={{
          height: '-webkit-fill-available'
        }}
      >
        <AppMenu />
        <Layout>
          <Layout.Content>
            {/* <Switch> */}
            <Redirect from="/" to="dashboard/" />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/hotel" component={Hotel} />
            {/* </Switch> */}
          </Layout.Content>
        </Layout>
        <CornerDialog title="Paradise Client" isShown={showMessage}>
          {message}
        </CornerDialog>
      </Layout>
    </HashRouter>
  );
};

import React from 'react';
import { withRouter, Redirect, Route } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import { Layout, notification } from 'antd';
import { AppMenu } from './components/App/Menu';
import { Header } from './components/App/Header';
import { Dashboard } from './views/Dashboard';
import { Hotel } from './views/Hotel';
import { Updates } from './views/Misc/Updates';
import './App.css';

export const App = withRouter(props => {
  const [disabledMenu, setDisabledMenu] = React.useState(false);

  ipcRenderer.on('electron-update', (event, data) => {
    switch (data.type) {
      case 'checking-for-update': {
        notification.info({
          message: 'Estamos buscando actualizaciones...'
        });
        break;
      }
      case 'update-not-available': {
        const { version } = data.data;
        notification.success({
          message: 'Actualmente cuentas con la versión más reciente!',
          description: `versión instalada: ${version}`
        });
        break;
      }
      case 'update-available': {
        setDisabledMenu(true);
        props.history.push('/misc/updates');
        break;
      }
      default: {
        break;
      }
    }
  });
  ipcRenderer.on('checking-for-update', () => {
    notification.info({
      message: 'Estamos buscando actualizaciones...'
    });
  });
  ipcRenderer.on('update-not-available', (event, data) => {
    const { version } = data;
    notification.success({
      message: 'Actualmente cuentas con la versión más reciente!',
      description: `versión instalada: ${version}`
    });
  });

  return (
    <Layout style={{ height: '-webkit-fill-available' }}>
      <AppMenu disabled={disabledMenu} />
      <Layout>
        <Header />
        <Layout.Content>
          <Redirect from="/" to="dashboard/" />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/hotel" component={Hotel} />
          <Route path="/pos" component={Updates} />
          <Route path="/misc/updates" component={Updates} />
        </Layout.Content>
      </Layout>
    </Layout>
  );
});

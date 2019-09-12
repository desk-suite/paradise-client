import React from 'react';
import { HashRouter, Redirect, Route } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import { Layout, notification } from 'antd';
import { AppMenu } from './components/App/Menu';
import { Header } from './components/App/Header';
import { Dashboard } from './views/Dashboard';
import { Hotel } from './views/Hotel';
import './App.css';

export const App = () => {
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
    <HashRouter>
      <Layout style={{ height: '-webkit-fill-available' }}>
        <AppMenu />
        <Layout>
          <Header />
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

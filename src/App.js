import React from 'react';
import { app } from 'electron';
import logo from './logo.svg';
import './App.css';


export const App = () => {
  const appV = window.require('electron').remote.app.getVersion()
  const [appVersion, setAppVersion] = React.useState(appV);
  const [message, setMessage] = React.useState('');
  const {ipcRenderer} = require('electron');
  ipcRenderer.on('message', function(event, text) {
    setMessage(text);
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Cliente no oficial de Paradise.
        </p>
        <p>
          Versión: {appVersion}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>
          { message }
        </p>
      </header>
    </div>
  );
}

// export default App;

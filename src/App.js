import React from 'react';
import { ipcRenderer } from 'electron';
import { CornerDialog } from 'evergreen-ui'
import { Portal } from './components/Portal'
import { AppBar } from './components/AppBar'
import './App.css';

export const App = () => {
  // const electron = window.require('electron')
  const [message, setMessage] = React.useState(' ');
  const [showMessage, setShowMessage] = React.useState(false);
  const [activeMenu, setActiveMenu] = React.useState("dashboard");
  const handleSelect = (activeKey) => {
    setActiveMenu(activeKey);
  }
  ipcRenderer.on('message', function(event, text) {
    setShowMessage(true)
    setMessage(text);
  })

  return (
    <div>
      <Portal>
        <AppBar >
          
        </AppBar>
      </Portal>
      <CornerDialog
        title="Paradise Client"
        isShown={showMessage}
      >
        {message}
      </CornerDialog>
    </div>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Cliente no oficial de Paradise.
    //     </p>
    //     <p>
    //       Versión: {appVersion}
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //     <p>
    //       { message }
    //     </p>
    //   </header>
    // </div>
  );
}

// export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './reset.css';
import './App.css';
import Tasks from './Tasks';
import Servers from './Servers';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const electron = window.require("electron")

function CloseApp() {
  electron.remote.getCurrentWindow().close();
}

function App() {
  return (
    <div className="App">
      <div className="header">
        <div className="logo">
          Task Manager
        </div>

        <div className="action">
          <ul>
            <li><FontAwesomeIcon icon={faTimes} onClick={CloseApp} /></li>
          </ul>
        </div>
      </div>
      <Servers></Servers>

      <Tasks></Tasks>
    </div>
  );
}

export default App;

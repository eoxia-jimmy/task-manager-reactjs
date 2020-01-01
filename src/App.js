import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './reset.css';
import './App.css';
import Servers from './Servers';
import Home from './Home';
import Login from './Login';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const electron = window.require("electron")

function CloseApp() {
  electron.remote.getCurrentWindow().close();
}

var id = 0;
var url = "";
var home = React.createRef();
var loginID = 0;

function Switch(idToSwitch, urlToSwitch, name) {
  home.current.load(idToSwitch, urlToSwitch, name);
}

function SetLoginID(id) {
  loginID = id;
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

      {loginID == 0 &&
        <Login setLoginID={SetLoginID}></Login>
      }

      {loginID != 0 &&
        <Servers switch={Switch}></Servers>
      }

      {loginID != 0 &&
        <div className="wrap">
          <Home ref={home}></Home>
        </div>
      }

    </div>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './reset.css';
import './App.css';
import Servers from './Servers';
import Home from './Home';
import Login from './Login';
import Subscribe from './Subscribe';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faTimes } from '@fortawesome/free-solid-svg-icons'

const electron = window.require("electron")
var remote = electron.remote

class App extends React.Component {
  constructor(props) {
    super(props);

    this.home = React.createRef();

    this.state = {
      loginID: 0,
      login: true
    };
  }

  closeApp() {
    electron.remote.getCurrentWindow().close();
  }

  fullscreen() {
    if (electron.remote.getCurrentWindow().isMaximized()) {
      electron.remote.getCurrentWindow().unmaximize();

    } else {
      electron.remote.getCurrentWindow().maximize();
    }
  }

  switch(id, url, name) {
    this.home.current.load(id, url, name);
  }

  setLoginID(id) {
    this.setState({loginID: id});
  }

  subscribe() {
    this.setState({login: false});
  }

  switchLogin() {
    this.setState({login: true});
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <div className="logo">
            Task Manager
          </div>

          <div className="action">
            <ul>
              <li><FontAwesomeIcon icon={faSquare} onClick={this.fullscreen} /></li>
              <li><FontAwesomeIcon icon={faTimes} onClick={this.closeApp} /></li>
            </ul>
          </div>
        </div>

        {this.state.loginID == 0 && this.state.login &&
          <Login parent={this}></Login>
        }

        {this.state.loginID == 0 && ! this.state.login &&
          <Subscribe parent={this}></Subscribe>
        }

        {this.state.loginID != 0 &&
          <Servers parent={this} user_id={this.state.loginID}></Servers>
        }

        {this.state.loginID != 0 &&
          <div className="wrap">
            <Home ref={this.home}></Home>
          </div>
        }

      </div>
    );
  }

}


export default App;

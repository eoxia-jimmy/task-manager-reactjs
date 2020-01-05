import React from 'react';
import logo from './logo.svg';
import './reset.css';
import './App.css';
import Servers from './Servers';
import Home from './Home';
import Login from './Login';
import Subscribe from './Subscribe';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faTimes } from '@fortawesome/free-solid-svg-icons'

import Cookies from 'universal-cookie';
const cookies = new Cookies();

const electron = window.require("electron")
var remote = electron.remote

class App extends React.Component {
  constructor(props) {
    super(props);

    this.home = React.createRef();
    this.server = React.createRef();

    this.state = {
      loginID: cookies.get('loginID') ? cookies.get('loginID') : 0,
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

    cookies.set('loginID', id, { path: '/' });
  }

  subscribe() {
    this.setState({login: false});
  }

  switchLogin() {
    this.setState({login: true});
  }

  closeDropdown(e) {
    console.log(this);
    this.server.current.closeDropdown();
  }

  render() {
    return (
      <div className="App" onClick={this.closeDropdown.bind(this)}>
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
          <Servers ref={this.server} parent={this} user_id={this.state.loginID}></Servers>
        }

        {this.state.loginID != 0 &&
          <div className="wrap">
            <Home ref={this.home} user_id={this.state.loginID}></Home>
          </div>
        }

      </div>
    );
  }

}


export default App;

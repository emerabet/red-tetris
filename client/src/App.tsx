import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import logo from './logo.svg';
import Button from './components/Button/Button';
import './App.css';

import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import HomePage from './containers/HomePage';
import GamePage from './containers/GamePage/GamePage'
import withSocket from './Hoc/SocketHoc';

interface AppProps {
  socket: SocketIOClient.Socket
}

class App extends Component<AppProps> {

  render() {
    let routes = (
      <Switch>
        {/* <Route path="/" exact component={HomePage} /> */}
        <Route path="/" exact component={GamePage} />
        {/* <Redirect from="/" to="/" /> */}
      </Switch>
    );

    return (
      <div className="App">
        <BrowserRouter>
          {routes}
        </BrowserRouter>
      </div>
    );
  }
}

export default withSocket(App);

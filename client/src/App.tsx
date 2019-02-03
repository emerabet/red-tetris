import React, { Component } from 'react';
import './App.css';

import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
// import HomePage from './containers/HomePage';
import GamePage from './containers/GamePage/'

interface AppProps {
  // socket: SocketIOClient.Socket
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

export default App;

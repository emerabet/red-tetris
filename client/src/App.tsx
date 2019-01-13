import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import logo from './logo.svg';
import Button from './components/Button/Button';
import './App.css';

class App extends Component {

  handleClick = () => {
    console.log('Cool!');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
            <Button handleClick={this.handleClick}>Le boutton</Button>
        </header>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Button from '../components/Button/Button';

import withSocket from '../Hoc/SocketHoc';

interface HomePageProps {
  nagivation: any;
  socket: any;
}

class HomePage extends Component<HomePageProps> {

  handleClick = () => {
    console.log('Cool!', this.props.socket);
    this.props.socket.emit('init');

  }

  init = () => {
    console.log('init');
    this.props.socket.emit('init');
  }

  down = () => {
    console.log('down');
    this.props.socket.emit('down');
  }

  up = () => {
    console.log('up');
    this.props.socket.emit('up');
  }

  left = () => {
    console.log('left');
    this.props.socket.emit('left');
  }

  right = () => {
    console.log('right');
    this.props.socket.emit('right');
  }
  render() {
    return (
      <div>
        test home page
          <header className="App-header">
          <Button handleClick={this.init}>init</Button>
          <Button handleClick={this.down}>down</Button>
          <Button handleClick={this.up}>up</Button>
          <Button handleClick={this.left}>left</Button>
          <Button handleClick={this.right}>right</Button>
        </header>
      </div>
    );
  }
}

export default withSocket(HomePage);

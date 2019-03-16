import React from 'react';

import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://localhost:4000');

const withSocket = (Component: any) => {
  return (props: any) => {
    return (
      <div>
        <Component {...props} socket={socket} />
      </div>
    );
  };
};

export default withSocket;

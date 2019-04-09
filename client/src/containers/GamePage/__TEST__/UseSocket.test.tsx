import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UseSocket from '../UseSocket';
import socketIOClient from 'socket.io-client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from '../../../configureStore';
const { persistor, store } = configureStore();

configure({adapter: new Adapter()});

it('should create a new boardController as Admin in opened Game', () => {
    // const game: Game = new Game('RoomName');
    // const socket:SocketIO.Socket = {
    //     id: 'socketId',
    // } as SocketIO.Socket;
    let EVENTS:Map<string, Function[]> = new Map<string, Function[]>();
function emit(event, ...args) {
 EVENTS[event].forEach((func: Function) => func !== undefined && func(...args));
}
    const serverSocket = { emit };
    const mockCallBack1 = jest.fn();
    const mockCallBack2 = jest.fn();
    const mockCallBack3 = jest.fn();
    const socket = {
        on(event, func) {
         if (EVENTS[event]) {
          return EVENTS[event].push(func);
         }
         EVENTS[event] = [func];
        },
        emit
       };
       

    // socket.on = jest.fn().mockImplementation();
    // const button = shallow((<UseSocket
    //     socket={socket}
    //     updateState={mockCallBack1}
    //     updateSpectre={mockCallBack2}
    //     updatePlayers={mockCallBack3}
    //   />));
    const wrapper = mount(<Provider store={store}><UseSocket
        socket={socket}
        updateState={mockCallBack1}
        updateSpectre={mockCallBack2}
        updatePlayers={mockCallBack3}
      /></Provider>);
      socket.on('state', wrapper.props()['updateState']);
      socket.on('spectre', wrapper.props()['updateSpectre']);
      socket.on('update_game_state', wrapper.props()['updatePlayers']);
      
// expect(wrapper.props().includedProp).to.equal('Success!');
      
      socket.emit('state');
      socket.emit('spectre');
      socket.emit('update_game_state');
    //   socket.on('state');
    //   socket.on('spectre');
    //   socket.on('update_game_state');
    console.log(mockCallBack1.mock.calls.length, wrapper.props());
    // expect(mockCallBack1.mock.calls.length).toEqual(1);
    // socket.join = jest.fn().mockImplementation();
    // game.createBoard(8, 10, socket, 'playerName');
    // const boards = Reflect.get(game, 'boards') as Map<string, BoardController>;
    // expect(socket.join).toHaveBeenCalledTimes(1);
    // expect(boards.size).toEqual(1);
});
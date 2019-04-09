import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UseSocket from '../UseSocket';
import { Provider } from 'react-redux';
import configureStore from '../../../configureStore';
const { store } = configureStore();

configure({adapter: new Adapter()});

it('test receive socket', (done: any) => {
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
       
    const wrapper = mount(<Provider store={store}><UseSocket
        socket={socket}
        updateState={mockCallBack1}
        updateSpectre={mockCallBack2}
        updatePlayers={mockCallBack3}
      /></Provider>);
      socket.on('state', wrapper.props()['updateState']);
      socket.on('spectre', wrapper.props()['updateSpectre']);
      socket.on('update_game_state', wrapper.props()['updatePlayers']);      
      socket.emit('state');
      socket.emit('spectre');
      socket.emit('update_game_state');
    setTimeout(()=>{ done(); }, 1500);
    console.log(mockCallBack1.mock.calls.length, wrapper.props());
    // expect(mockCallBack1.mock.calls.length).toEqual(1);
});
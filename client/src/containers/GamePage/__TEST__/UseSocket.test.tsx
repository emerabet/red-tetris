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
      EVENTS[event].forEach((func: Function) => {
        func(...args);
      });
    }
    const mockCallBack1 = jest.fn().mockImplementation();
    const mockCallBack2 = jest.fn().mockImplementation();
    const mockCallBack3 = jest.fn().mockImplementation();
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
      console.log('wrapper props:', wrapper.props().children.props);
      socket.on('state', wrapper.props().children.props.updateState);
      socket.on('spectre', wrapper.props().children.props.updateSpectre);
      socket.on('update_game_state', wrapper.props().children.props.updatePlayers);
      socket.emit('state');
      socket.emit('spectre');
      socket.emit('update_game_state');
    setTimeout(()=>{ done(); }, 1500);
    expect(wrapper.props().children.props.updateState).toHaveBeenCalledTimes(1);
    expect(wrapper.props().children.props.updateSpectre).toHaveBeenCalledTimes(1);
    expect(wrapper.props().children.props.updatePlayers).toHaveBeenCalledTimes(1);
});
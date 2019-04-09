import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import Home from '../Home';

configure({ adapter: new Adapter() });

it('renders correctly with defaults', () => {
  const home = renderer.create(<Home
    room="my room"
    player="my name"
    enterRoom={(_) => { return 'void'; }}
    handleChange={(_) => { return 'void'; }}
  />).toJSON();
  expect(home).toMatchSnapshot();
});

it('renders correctly with defaults', () => {
  const home = renderer.create(<Home
    room=""
    player=""
    enterRoom={(_) => { return 'void'; }}
    handleChange={(_) => { return 'void'; }}
  />).toJSON();
  expect(home).toMatchSnapshot();
});

it('Test click event', () => {
  const mockCallBack = jest.fn();

  const button = shallow((<Home
    room="test"
    player="test"
    enterRoom={mockCallBack}
    handleChange={(_) => { return 'void'; }}
  />));
  expect(button.prop('onSubmit') === mockCallBack);
});

it('fill input', (done:any) => {
  let test = '';
  const mockCallBack = jest.fn();

  const handleInput = (a: string) => {
    test = a;
  }

  const button = shallow((<Home
    room="test"
    player="test"
    enterRoom={mockCallBack}
    handleChange={handleInput}
  />));
  
  button.find('.roomInput').simulate('focus');
  button.find('.roomInput').simulate('change', { target: { value: 'Hello' } });
  button.find('.roomInput').simulate('blur');
  setTimeout(()=>{ done(); }, 1500);
  button.find('.playerInput').simulate('focus');
  button.find('.playerInput').simulate('change', { target: { value: 'Hello' } });
  button.find('.playerInput').simulate('blur');
  setTimeout(()=>{done();}, 1500);
  act(() => {
    window.dispatchEvent(new Event('resize'));
  });
});

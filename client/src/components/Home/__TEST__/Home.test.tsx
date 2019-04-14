import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer, { act } from 'react-test-renderer';
import Home from '../Home';
import 'react-testing-library/cleanup-after-each';

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

  const wrapper = shallow((<Home
    room="test"
    player="test"
    enterRoom={mockCallBack}
    handleChange={(_) => { return 'void'; }}
  />));
  act(() => {
    global.outerWidth = 200;
    global.dispatchEvent(new Event('resize'));
  });
  act(() => {
    global.outerWidth = 480;
    global.dispatchEvent(new Event('resize'));
  });
  expect(wrapper.prop('onSubmit') === mockCallBack);
});

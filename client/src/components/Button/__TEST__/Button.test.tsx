import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Button from '../Button';

configure({adapter: new Adapter()});

it('renders correctly with defaults', () => {
  const button = renderer.create(<Button
    handleClick={() => {}}>Hello Button</Button>).toJSON();
  expect(button).toMatchSnapshot();
});

it('Test click event', () => {
  const mockCallBack = jest.fn();

  const button = shallow((<Button handleClick={mockCallBack}>Ok!</Button>));
  button.find('.button_format').simulate('click');
  expect(mockCallBack.mock.calls.length).toEqual(1);
});
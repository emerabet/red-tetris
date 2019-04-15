import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import AdminButton from '../AdminButton';

configure({ adapter: new Adapter() });

it('renders correctly with defaults', () => {
  const button = renderer.create(<AdminButton text="start" play={() => {}}/>).toJSON();
  expect(button).toMatchSnapshot();
});

it('Test click event', () => {
  const mockCallBack = jest.fn();

  const button = shallow((<AdminButton text="start" play={mockCallBack} />));
  button.find('.button-container').simulate('click');
  expect(mockCallBack.mock.calls.length).toEqual(1);
});

import React from 'react';
import renderer from 'react-test-renderer';
import Score from '../Score';
import { mount, shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

beforeAll(() => jest.spyOn(React, 'useEffect').mockImplementation(React.useLayoutEffect));
afterAll(() => React.useEffect.mockRestore());

it('renders correctly with defaults', () => {
  const score = renderer.create(<Score
    level={4}
    score={999}
    count={2}
    small
    username="test"
    action="joined"
  />).toJSON();
  expect(score).toMatchSnapshot();
});

it('renders correctly with defaults', () => {
  const score = renderer.create(<Score
    level={4}
    score={999}
    count={2}
    username="test"
    action="joined"
  />).toJSON();
  expect(score).toMatchSnapshot();
  const button = mount((<Score
    level={4}
    score={999}
    count={2}
    username="test"
    action="joined"
  />));
  button.unmount();
});

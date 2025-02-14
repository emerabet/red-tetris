import React from 'react';

import renderer from 'react-test-renderer';
import SectionLeft from '../SectionLeft';

it('renders correctly with defaults', () => {
  const sectionLeft = renderer.create(<SectionLeft
    room="SUPERROOM"
    player="BIG BOSS"
    status="start"
    level={2}
    score={8}
    play={() => 'void' }
    count={2}
    username="test"
    action="joined"
  />).toJSON();
  expect(sectionLeft).toMatchSnapshot();
});

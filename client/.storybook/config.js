import { configure } from '@storybook/react';

function loadStories() {
  require('../src/components/Button/Button.story');
  require('../src/components/Labels/PlayerLabel.story');
  require('../src/components/Home/Home.story');
  require('../src/components/Labels/SquareLabel.story');
}

configure(loadStories, module);

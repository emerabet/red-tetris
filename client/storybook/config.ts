import { configure } from '@storybook/react';

function loadStories() {
  require('../src/components/Button/Button.story.tsx');
  require('../src/components/Labels/PlayerLabel.story.tsx');
  // You can require as many stories as you need.
}

configure(loadStories, module);

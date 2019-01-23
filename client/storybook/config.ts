import { configure } from '@storybook/react';

function loadStories() {
  require('../src/components/Button/Button.story.tsx');
  // You can require as many stories as you need.
}

configure(loadStories, module);
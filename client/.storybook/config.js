import { configure } from '@storybook/react';

function loadStories() {
  require('../src/components/Button/Button.story');
  require('../src/components/Home/Home.story');
  require('../src/components/Labels/SquareLabel.story');
  require('../src/components/RedTetris/RedTetris.story');
  require('../src/containers/GamePage/GamePage.story');
  require('../src/components/Game/Game.story');
  require('../src/components/LabeledBox/LabeledBox.story');
}

configure(loadStories, module);

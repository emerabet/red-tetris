import { configure } from '@storybook/react';

function loadStories() {
  require('../src/components/Button/Button.story');
  require('../src/components/Home/Home.story');
  require('../src/components/Labels/SquareLabel.story');
  require('../src/components/RedTetris/RedTetris.story');
  require('../src/containers/GamePage/GamePage.story');
  require('../src/components/Game/Game.story');
  require('../src/components/LabeledBox/LabeledBox.story');
  require('../src/components/Star/Star.story');
  require('../src/components/Board/Board.story');
  require('../src/components/Cell/Cell.story');
  require('../src/components/Row/Row.story');
  require('../src/components/SectionLeft/SectionLeft.story');
  require('../src/components/Piece/Piece.story');
  require('../src/components/NextPieces/NextPieces.story');
}

configure(loadStories, module);

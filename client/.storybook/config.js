import { configure } from '@storybook/react';

function loadStories() {
  require('../src/components/Button/Button.story');
  require('../src/components/Home/Home.story');
  require('../src/components/Labels/SquareLabel.story');
  require('../src/components/RedTetris/RedTetris.story');
  require('../src/containers/GamePage/GamePage.story');
  require('../src/components/Game/Game.story');
  require('../src/components/LabeledBox/LabeledBox.story');
  require('../src/components/Board/Board.story');
  require('../src/components/Cell/Cell.story');
  require('../src/components/Row/Row.story');
  require('../src/components/SectionLeft/SectionLeft.story');
  require('../src/components/Piece/Piece.story');
  require('../src/components/NextPieces/NextPieces.story');
  require('../src/components/SectionRight/SectionRight.story');
  require('../src/components/Oponent/Oponent.story');
  require('../src/components/AdminButton/AdminButton.story');
  require('../src/components/Score/Score.story');
}

configure(loadStories, module);

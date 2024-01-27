import React, { useState } from 'react';
import Game from './components/Game';
import WholeBoardGame from './components/WholeBoardGame';
import ChooseGame from './components/home/ChooseGame';
import './App.scss';

function App() {

  enum Mode {
    ChooseGame,
    ShapeGame,
    WholeBoardGame
  }

  const [currentMode, setCurrentMode] = useState(Mode.ChooseGame);

  const setChoose = () => {
    setCurrentMode(Mode.ChooseGame);
  }

  const setShape = () => {
    setCurrentMode(Mode.ShapeGame);
  }

  const setBoard = () => {
    setCurrentMode(Mode.WholeBoardGame);
  }

  switch (currentMode) {
    case Mode.ChooseGame:
      return <ChooseGame setShape={setShape} setBoard={setBoard} />
    case Mode.ShapeGame:
      return <Game setChoose={setChoose} />
    case Mode.WholeBoardGame:
      return <WholeBoardGame setChoose={setChoose} />
    default:
      return <ChooseGame setShape={setShape} setBoard={setBoard} />
  }
}

export default App;

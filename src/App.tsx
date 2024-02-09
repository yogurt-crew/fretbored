import React, { useState } from 'react';
import Game from './components/Game';
import WholeBoardGame from './components/WholeBoardGame';
import TriadGame from './components/TriadGame';
import ChooseGame from './components/home/ChooseGame';
import './App.scss';

function App() {

  enum Mode {
    ChooseGame,
    ShapeGame,
    WholeBoardGame,
    Triads
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

  const setTriads = () => {
    setCurrentMode(Mode.Triads);
  }

  switch (currentMode) {
    case Mode.ChooseGame:
      return <ChooseGame setShape={setShape} setBoard={setBoard} setTriads={setTriads} />
    case Mode.ShapeGame:
      return <Game setChoose={setChoose} />
    case Mode.WholeBoardGame:
      return <WholeBoardGame setChoose={setChoose} />
    case Mode.Triads:
      return <TriadGame setChoose={setChoose} />
    default:
      return <ChooseGame setShape={setShape} setBoard={setBoard} setTriads={setTriads} />
  }
}

export default App;

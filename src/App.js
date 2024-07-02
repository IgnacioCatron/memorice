import React, { useState } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import './App.css';

function App() {
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);

  const handleGameComplete = (moves, time) => {
    setMoves(moves);
    setTime(time);
    alert(`Felicidades Carito Haz completado el juego, un besito! Moves: ${moves}, Time: ${time}s`);
  };

  const handleReset = () => {
    setMoves(0);
    setTime(0);
  };

  return (
    <div className="App">
      <Header moves={moves} time={time} onReset={handleReset} />
      <Board onGameComplete={handleGameComplete} />
    </div>
  );
}

export default App;

import React from 'react';
import './Header.css';

const Header = ({ moves, time, onReset }) => {
  return (
    <div className="header">
      <h1>Juego de Memoria</h1>
      <div className="stats">
        <div>Moves: {moves}</div>
        <div>Time: {time}s</div>
      </div>
      <button onClick={onReset}>Reset Game</button>
    </div>
  );
};

export default Header;

import React from 'react';
import './Card.css';

const Card = ({ card, onClick }) => {
  return (
    <div className={`card ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`} onClick={() => onClick(card)}>
      <div className="front">
        <img src='/images/interrogacion.png'/>
      </div>
      <div className="back">
        <img src={card.value} alt="card" />
      </div>
    </div>
  );
};

export default Card;




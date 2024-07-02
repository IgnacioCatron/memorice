import React, { useState, useEffect } from 'react';
import Card from './Card';
import './Board.css';

const Board = ({ onGameComplete }) => {
  const initialCards = [
    { id: 1, value: '/images/image1.png', flipped: false, matched: false },
    { id: 2, value: '/images/image1.png', flipped: false, matched: false },
    { id: 3, value: '/images/image2.png', flipped: false, matched: false },
    { id: 4, value: '/images/image2.png', flipped: false, matched: false },
    { id: 5, value: '/images/image3.png', flipped: false, matched: false },
    { id: 6, value: '/images/image3.png', flipped: false, matched: false },
    { id: 7, value: '/images/image4.png', flipped: false, matched: false },
    { id: 8, value: '/images/image4.png', flipped: false, matched: false },
    // Agrega más pares de cartas aquí
    { id: 9, value: '/images/image5.png', flipped: false, matched: false },
    { id: 10, value: '/images/image5.png', flipped: false, matched: false },
    { id: 11, value: '/images/image6.png', flipped: false, matched: false },
    { id: 12, value: '/images/image6.png', flipped: false, matched: false },
    { id: 13, value: '/images/image7.png', flipped: false, matched: false },
    { id: 14, value: '/images/image7.png', flipped: false, matched: false },
    { id: 15, value: '/images/image8.png', flipped: false, matched: false },
    { id: 16, value: '/images/image8.png', flipped: false, matched: false },
  ];

  const [cards, setCards] = useState(shuffleArray(initialCards));
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    let timer;
    if (timerActive) {
      timer = setInterval(() => setTime(time + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [timerActive, time]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsChecking(true);
      const [firstCard, secondCard] = flippedCards;
      if (firstCard.value === secondCard.value) {
        setMatchedCards([...matchedCards, firstCard.id, secondCard.id]);
        setCards(cards.map(card => {
          if (card.id === firstCard.id || card.id === secondCard.id) {
            return { ...card, matched: true };
          }
          return card;
        }));
        resetFlippedCards();
      } else {
        setTimeout(() => {
          setCards(cards.map(card => {
            if (card.id === firstCard.id || card.id === secondCard.id) {
              return { ...card, flipped: false };
            }
            return card;
          }));
          resetFlippedCards();
        }, 1000);
      }
      setMoves(moves + 1);
    }
  }, [flippedCards]);

  useEffect(() => {
    if (matchedCards.length === initialCards.length) {
      setTimerActive(false);
      onGameComplete(moves, time);
    }
  }, [matchedCards]);

  const handleCardClick = (clickedCard) => {
    if (!timerActive) setTimerActive(true);
    if (!isChecking && flippedCards.length < 2 && !flippedCards.includes(clickedCard) && !clickedCard.flipped && !matchedCards.includes(clickedCard.id)) {
      setCards(cards.map(card =>
        card.id === clickedCard.id ? { ...card, flipped: true } : card
      ));
      setFlippedCards([...flippedCards, clickedCard]);
    }
  };

  const resetFlippedCards = () => {
    setFlippedCards([]);
    setIsChecking(false);
  };

  const resetGame = () => {
    setCards(shuffleArray(initialCards));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTime(0);
    setTimerActive(false);
    setIsChecking(false);
  };

  return (
    <div className="board">
      {cards.map(card => (
        <Card key={card.id} card={card} onClick={handleCardClick} />
      ))}
      <button className="reset-btn" onClick={resetGame}>Reset Game</button>
    </div>
  );
};

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export default Board;

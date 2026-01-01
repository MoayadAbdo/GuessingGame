import { useState,useEffect } from "react";

export const useGameLogic = (cardValues) => {
    // Game logic implementation
  const [cards,setCards]=useState([]);
  const [flippedCards,setFlippedCards]=useState([]);
  const [matchedCards,setMatchedCards]=useState([]);
  const [score,setScore]=useState(0);
  const [moves,setMoves]=useState(0); 
  const [isLocked,setIsLocked]=useState(false);
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initializeGame = () => {
    // Shuffle
    const shuffledValues = shuffleArray(cardValues);

    const finalCards = shuffledValues.map((value,index) =>({
      id: index,
      value,
      isFlipped: false,
      isMatched: false
    }))

    setCards(finalCards);
    setMoves(0);
    setScore(0);
    setIsLocked(false);
    setFlippedCards([]);
    setMatchedCards([]);

  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (card) => {
      if(card.isFlipped || card.isMatched || isLocked || flippedCards.length === 2) return;

      const updatedCards = cards.map(c => {
        if(c.id === card.id) {
          return {...c, isFlipped: true};
        }
        return c;
      });

      setCards(updatedCards);

      const newFlippedCards = [...flippedCards, card.id];
      setFlippedCards(newFlippedCards);

      if(flippedCards.length === 1) {
        setIsLocked(true);
        const firstCard = cards[flippedCards[0]];
        
        if(firstCard.value === card.value) {

          setTimeout(() => {

          setMatchedCards((prev) => [...prev, firstCard.id, card.id]);

          setScore((prev) => prev + 1);

          const matchedUpdatedCards = updatedCards.map(c => {
            if(c.id === firstCard.id || c.id === card.id) {
              return {...c, isMatched: true};
            }
            return c;
          });

          setCards(matchedUpdatedCards);
          setIsLocked(false);
          setFlippedCards([]);

          },500);
          
          
        }else{
          setTimeout(() => {
            const flippedbackCards = updatedCards.map((c) => {

            if(newFlippedCards.includes(c.id) || c.id === card.id) {
              return {...c, isFlipped: false};
            }

            return c;
          });
          
          setCards(flippedbackCards);
          setIsLocked(false);
          setFlippedCards([]);  

        }, 1000);

          
      }
      setMoves((prev)=>prev+1);

    }
  };
    const isGameWon = matchedCards.length === cards.length && cards.length > 0;



    return {cards, score, moves, isGameWon, handleCardClick, initializeGame};
};
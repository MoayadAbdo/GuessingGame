import { Card } from "./components/Card";
import { GameHeader } from "./components/GameHeader"
import { WinMessage } from "./components/WinMessage";
import { useGameLogic } from "./hooks/useGameLogic";
const cardValues = [
  "1", "2", "3", "4", "5", "6", "7", "8",
  "1", "2", "3", "4", "5", "6", "7", "8",
];
function App() {
  const {cards, score, moves, isGameWon, handleCardClick, initializeGame} = useGameLogic(cardValues);
   return (<div className="app">
    <GameHeader score={score} moves={moves} onReset={initializeGame}/>
    
    {isGameWon && <WinMessage moves={moves} />}
    <div className="cards-grid">
      {cards.map((card) => (
        <Card card={card} onClick={handleCardClick}/>
      ))}
    </div>
  </div>);
}

export default App

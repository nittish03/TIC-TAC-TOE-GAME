import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Multiplayer = () => {
    const [board, setBoard] = useState(Array(9).fill(""));
    const [turn, setTurn] = useState("Player 1");
    const [winner, setWinner] = useState(null);
    const navigate = useNavigate();
  
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    const checkWinner = (newBoard) => {
      for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
          return newBoard[a];
        }
      }
      if (newBoard.every((cell) => cell !== "")) {
        return "Draw";
      }
      return null;
    };
  
    const handleBoxClick = (index) => {
      if (board[index] !== "" || winner) return;
  
      const newBoard = [...board];
      newBoard[index] = turn === "Player 1" ? "X" : "O";
      setBoard(newBoard);
  
      const gameWinner = checkWinner(newBoard);
      if (gameWinner) {
        setWinner(gameWinner === "Draw" ? "It's a draw!" : `${gameWinner} wins!`);
        return;
      }
  
      setTurn(turn === "Player 1" ? "Player 2" : "Player 1");
    };
  
    const resetGame = () => {
      setBoard(Array(9).fill(""));
      setTurn("Player 1");
      setWinner(null);
    };
  
    return (
      <b className="App">
        <h1>Tic Tac Toe</h1>
        <div id="turn">{winner || `${turn}'s Turn`}</div>
        <div id="container">
          {board.map((value, index) => (
            <button
              key={index}
              id={index + 1}
              className="box"
              onClick={() => handleBoxClick(index)}
              disabled={!!value || !!winner}
            >
              {value}
            </button>
          ))}
        </div>
        <button id="reset" onClick={resetGame}>
          RESET GAME
        </button>
        <button id="single-player" onClick={()=>{
            navigate('/singleplayer')
        }}>
          Single Player
        </button>
      </b>
    );
}
export default Multiplayer
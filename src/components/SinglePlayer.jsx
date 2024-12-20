import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
const SinglePlayer = () => {
    const [board, setBoard] = useState(Array(9).fill(""));
    const [turn, setTurn] = useState("Player 1"); // "Player 1" or "Player 2"
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
  
    // Function to check winner
    const checkWinner = (boardState) => {
      for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
          return boardState[a];
        }
      }
      if (boardState.every((cell) => cell !== "")) {
        return "Draw";
      }
      return null;
    };
  
    // Function to handle cell click
    const handleBoxClick = (index) => {
      if (board[index] !== "" || winner) return; // Prevent overwriting or playing after the game ends
  
      const newBoard = [...board];
      newBoard[index] = turn === "Player 1" ? "X" : "O";
  
      const gameWinner = checkWinner(newBoard);
      setBoard(newBoard);
  
      if (gameWinner) {
        setWinner(gameWinner === "Draw" ? "It's a draw!" : `${gameWinner} wins!`);
        return;
      }
  
      // Toggle turn
      setTurn(turn === "Player 1" ? "Player 2" : "Player 1");
    };
  
    // Effect for AI (Player 2)
    useEffect(() => {
      if (turn === "Player 2" && !winner) {
        const emptyCells = board
          .map((cell, index) => (cell === "" ? index : null))
          .filter((index) => index !== null);
  
        if (emptyCells.length > 0) {
          const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
          setTimeout(() => handleBoxClick(randomIndex), 500); // AI takes a turn after a delay
        }
      }
    }, [turn, board, winner]);
  
    // Function to reset the game
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
            navigate('/multiplayer')
        }}>
          Multi Player
        </button>
  </b>
  )
}

export default SinglePlayer
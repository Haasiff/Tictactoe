import React, { useState } from 'react';
import Board from './Board';
import './Game.css';

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const resetGame = () => {
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setXIsNext(true);
  };

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : 'Go to start';
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });

  const current = history[stepNumber];
  const winner = calculateWinner(current);
  const isBoardFull = current.every(square => square !== null);

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isBoardFull) {
    status = 'Tie!';
  } else {
    status = `Next Player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <Board squares={current} onClick={handleClick} />
      <div className="info-wrapper">
        <div>{status}</div>
        <button className="reset-button" onClick={resetGame}>Reset</button>
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Game;

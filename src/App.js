import './App.css';
import { useState } from 'react';

function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0); 
  const isXNext = currentMove % 2 === 0;
  let currentSquares = history[currentMove];
  function handlePlay(updatedSquares){
    const nextHistory = [...history.slice(0, currentMove + 1),updatedSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  function jumpTo(idx){
    setCurrentMove(idx);
  }
  const moves = history.map((square, idx) => {
    let description;
    if(idx) description = "Go to move #"+idx;
    else description = "Go to game start";
    return (
      <li>
        <button onClick={()=>{jumpTo(idx)}}>{description}</button>
      </li>
    );
  });
  return (
    <>
      <div className='game'>
        <div className='game-board'>
          <Board isXNext={isXNext} squares={currentSquares} handlePlay={handlePlay} />
        </div>
      </div>
      <div className='game-info'>
        <ol>{ moves }</ol>
      </div>
    </>
  );
}

function Board({isXNext, squares, handlePlay}){
  
  function handleClick(i){
    if(squares[i] || calculateWinner(squares)) return false;
    const newSquares = squares.slice();
    if(isXNext) newSquares[i] = 'X';
    else newSquares[i] = 'O';
    handlePlay(newSquares);
  }
  const winner = calculateWinner(squares);
  let status;
  if(winner) status = winner + ' is Winner !!';
  else status = 'Next player: ' + (isXNext?'X':'O');
  return (
    <>
      <div className='status'>{status}</div>
      <div className='board-row'>
        <Square value={squares[0]} onClickFunction={()=>handleClick(0)}/>
        <Square value={squares[1]} onClickFunction={()=>handleClick(1)}/>
        <Square value={squares[2]} onClickFunction={()=>handleClick(2)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onClickFunction={()=>handleClick(3)}/>
        <Square value={squares[4]} onClickFunction={()=>handleClick(4)}/>
        <Square value={squares[5]} onClickFunction={()=>handleClick(5)}/>
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onClickFunction={()=>handleClick(6)}/>
        <Square value={squares[7]} onClickFunction={()=>handleClick(7)}/>
        <Square value={squares[8]} onClickFunction={()=>handleClick(8)}/>
      </div>
    </>
  );
}

function calculateWinner(arr){
  const lines = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
  for(let i=0;i<lines.length;i++) {
    let [a,b,c] = lines[i];
    if(arr[a] && arr[a]===arr[b] && arr[a]===arr[c]) return arr[a];
  }
  return null;
}

function Square({value, onClickFunction}) {
  return <button className='square' onClick={onClickFunction}>{value}</button>
}

export default App;

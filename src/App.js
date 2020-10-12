import React from 'react';
import './index.css'

function Square(props) {
  // console.log(props, 'props');
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props){
    super(props)
  }
  renderSquares(i){
    // console.log(this.props.squares, 'this.props.squares');
    // console.log(i,'i');
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquares(0)}
          {this.renderSquares(1)}
          {this.renderSquares(2)}
        </div>
        <div className="board-row">
          {this.renderSquares(3)}
          {this.renderSquares(4)}
          {this.renderSquares(5)}
        </div>
        <div className="board-row">
          {this.renderSquares(6)}
          {this.renderSquares(7)}
          {this.renderSquares(8)}
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0
    }
  }

  handleClick(i){
    // console.log(i, 'i');
    const history = this.state.history;
    const current = history[history.length - 1];
    // console.log(current, 'current');
    const squares = current.squares.slice();
    // console.log(squares, 'squares');

    // console.log(squares, 'squares[i]');
    if(calculateWinner(squares) || squares[i]){
      return;
    }
 squares[i] = this.state.xIsNext ? "X" : "O"
 // console.log(squares[i], 'squares[i]');
 // console.log();
 // console.log(this.state.history, 'this.state.history');
  this.setState({
    history: history.concat([
      {
        squares: squares
      }
    ]),
    xIsNext: !this.state.xIsNext,
    stepNumber: history.length
  })
  // console.log(this.state, 'this.state');
  }

  jumpTo(step){
      this.setState({
        stepNumber: step,
        xIsNext: ( step % 2 ) === 0
      })
  }
    render() {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares;
    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })
    let status;
    const winner = calculateWinner(squares);
    // console.log(winner, 'winner');
    if(winner){
      status = 'Winner is ' + winner
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }
    return (
      <div className="game">
        <div className="game-board">
            <Board squares={current.squares} onClick={(i) => {this.handleClick(i)}}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default App;
function calculateWinner(squares) {
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
}

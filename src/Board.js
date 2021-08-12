import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {

  constructor(props) {
    super(props);
    this.state = ({ board: this.createBoard(), hasWon: false });
    this.flipCellsAround = this.flipCellsAround.bind(this);
    // TODO: set initial state
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];

    for (let i = 0; i < this.props.nrows; i++) {
      let row = [];
      for (let j = 0; j < this.props.ncols; j++) {
        let isLitNumber = Math.floor(Math.random() * 2);
        let isLit = (isLitNumber === 0) ? true : false;
        row[j] = isLit;
      }
      board.push(row);
    }
    // TODO: create array-of-arrays of true/false values
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let hasWon = true;
    let board = this.state.board.map((v, i) => v.map(a => a));
    let [x, y] = coord.split("-").map(Number);
    flipCell(x - 1, y);
    flipCell(x + 1, y);
    flipCell(x, y - 1);
    flipCell(x, y + 1);

    function flipCell(x, y) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < nrows && y >= 0 && y < ncols) {
        board[x][y] = !board[x][y];
      }
    }

    board[x][y] = !board[x][y];

    board.map(v => v.map(a => {
      if (a) {
        hasWon = false;
      }
    }))

    this.setState({board, hasWon});
  }


  /** Render game board or winning message. */

  render() {
    return (
      <div className="">
        {this.state.hasWon ? <div className='winner'>
          <span className='neon-orange'>YOU</span>
          <span className='neon-blue'>WIN!</span>
        </div> : null}
        {this.state.hasWon ? null :
          <div>
            <div className='Board-title'>
              <div className='neon-orange'>Lights</div>
              <div className='neon-blue'>Out</div>
            </div>
            <table className="Board">
              <tbody>
                {this.state.board.map((r, iRow) => <tr key={`${iRow}`}>{r.map((c, iCol) => <Cell key={`${iRow}-${iCol}`} keySend={`${iRow}-${iCol}`} flipCellsAroundMe={this.flipCellsAround} isLit={c} />)}</tr>)}
              </tbody>
            </table>
          </div>
        }
      </div>
    )
    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board

    // TODO
  }
}


export default Board;

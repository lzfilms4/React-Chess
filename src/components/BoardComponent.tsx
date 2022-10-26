import React, { useEffect, useState } from "react";
import { Board } from "../models/Board";
import CellComponent from "./CellComponent";
import { Cell } from "../models/Cell";
import { Player } from "../models/Player";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

const BoardComponent: React.FC<BoardProps> = ({
  board,
  setBoard,
  currentPlayer,
  swapPlayer,
}) => {
  const [selectedSell, setSelectedSell] = useState<Cell | null>(null);

  function click(cell: Cell) {
    if (
      selectedSell &&
      selectedSell !== cell &&
      selectedSell.figure?.canMove(cell)
    ) {
      selectedSell.moveFigure(cell);
      swapPlayer();
      setSelectedSell(null);
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedSell(cell);
      }
    }
  }
  useEffect(() => {
    highlightCells();
  }, [selectedSell]);

  function highlightCells() {
    board.highlightCells(selectedSell);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  return (
    <div>
      <h3>Текущий игрок {currentPlayer?.color}</h3>
      <div className="board">
        {board.cells.map((row, index) => (
          <React.Fragment key={index}>
            {row.map((cell) => (
              <CellComponent
                click={click}
                cell={cell}
                key={cell.id}
                selected={
                  cell.x === selectedSell?.x && cell.y === selectedSell?.y
                }
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BoardComponent;

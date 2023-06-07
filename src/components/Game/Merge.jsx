import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
{
  /* <header>
  <Link to="/game">뒤로</Link>
  <h1>Merge Game</h1>
</header>; */
}

const Merge = () => {
  const width = 7;
  const height = 9;

  const [grid, setGrid] = useState(() => {
    const initialGrid = Array(height)
      .fill()
      .map(() => Array(width).fill(null));
    return initialGrid;
  });

  const [popupVisible, setPopupVisible] = useState(false);

  const [selectedCell, setSelectedCell] = useState(null);

  const handleAddNumber = () => {
    const emptyCells = [];
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === null) {
          emptyCells.push({ row: rowIndex, col: colIndex });
        }
      });
    });

    if (emptyCells.length === 0) {
      setPopupVisible(true);
    } else {
      const randomCell =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const newGrid = [...grid];
      newGrid[randomCell.row][randomCell.col] = 1;
      setGrid(newGrid);
    }
  };

  const handleClickCell = (row, col) => {
    const cellValue = grid[row][col];

    if (cellValue !== null && cellValue !== 5) {
      if (selectedCell === null) {
        setSelectedCell({ row, col });
      } else {
        if (selectedCell.row === row && selectedCell.col === col) {
          setSelectedCell(null);
        } else {
          const newGrid = [...grid];
          const firstValue = newGrid[selectedCell.row][selectedCell.col];
          const secondValue = newGrid[row][col];

          if (firstValue === secondValue && firstValue !== 9) {
            newGrid[selectedCell.row][selectedCell.col] = null;
            newGrid[row][col] = firstValue + 1;
          }

          setSelectedCell(null);
          setGrid(newGrid);
        }
      }
    }
  };

  const handleHidePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div>
      <header>
        <Link to="/game">뒤로</Link>
        <h1>Merge Game</h1>
      </header>
      <div className="merge-container">
        <button onClick={handleAddNumber}>추가</button>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${
                  selectedCell &&
                  selectedCell.row === rowIndex &&
                  selectedCell.col === colIndex
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleClickCell(rowIndex, colIndex)}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
        {popupVisible && (
          <div className="popup">
            <div className="popup-content">
              <span>칸을 비워주세요.</span>
              <button onClick={handleHidePopup}>닫기</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Merge;

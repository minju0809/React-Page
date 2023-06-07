import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../App.css";

const Merge = () => {
  const width = 7;
  const height = 9;
  const initialGrid = Array(height).fill().map(() => Array(width).fill(null));

  const [grid, setGrid] = useState(initialGrid);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);
  const [timer, setTimer] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [stoppedTime, setStoppedTime] = useState(0);

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
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const newGrid = [...grid];
      newGrid[randomCell.row][randomCell.col] = 1;
      setGrid(newGrid);

      if (!timerStarted) {
        setTimerStarted(true);
      }
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

          if (firstValue === secondValue && firstValue !== 5) {
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

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((time % 60000) / 1000).toString().padStart(2, '0');
    const milliseconds = (time % 1000).toString().padStart(3, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  useEffect(() => {
    let intervalId = null;

    if (timerStarted && !popupVisible && !grid.flat().includes(5)) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 100);
      }, 100);
    } else {
      clearInterval(intervalId);

      if (timerStarted && grid.flat().includes(5)) {
        setTimerStarted(false);
        setStoppedTime((prevTimer) => prevTimer + timer);
      }

      setTimer(0);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timerStarted, popupVisible, grid, timer]);

  return (
    <div>
      <header>
        <Link to="/game">뒤로</Link>
        <h1>Merge Game</h1>
      </header>
      <div className="merge-container">
        <button onClick={handleAddNumber}>추가</button>
        <div className="timer">{formatTime(timerStarted ? timer : stoppedTime)}</div>
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

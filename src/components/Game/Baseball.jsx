import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const generateAnswer = () => {
  const digits = [];
  while (digits.length < 4) {
    const randomDigit = Math.floor(Math.random() * 10);
    if (!digits.includes(randomDigit)) {
      digits.push(randomDigit);
    }
  }
  return digits.join("");
};

const checkGuess = (guess, answer) => {
  let strike = 0;
  let ball = 0;
  let out = 0;
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answer[i]) {
      strike++;
    } else if (answer.includes(guess[i])) {
      ball++;
    } else {
      out++;
    }
  }
  return { strike, ball, out };
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time / 1000) % 60);
  const milliseconds = Math.floor((time % 1000) / 10);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
};

const Baseball = () => {
  const [answer, setAnswer] = useState(generateAnswer());
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState([]);
  const [result, setResult] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [displayedNumber, setDisplayedNumber] = useState([0, 0, 0, 0]);
  const timerRef = useRef(null);

  useEffect(() => {
    if (gameOver) {
      clearInterval(timerRef.current);
      const homeRunMessage = `홈런! ${attempts.length + 1}번째 홈런입니다!`;
      if (window.confirm(`${homeRunMessage} 게임을 다시 시작하시겠습니까?`)) {
        handleRestart();
      }
    }
  }, [gameOver]);

  const handleStart = () => {
    setAnswer(generateAnswer());
    setGuess("");
    setAttempts([]);
    setResult("");
    setShowAnswer(false);
    setError("");
    setTimer(0);
    setGameOver(false);
    setGameStarted(true);

    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 10);
    }, 10);
  };

  const handleGuessChange = (event) => {
    if (gameStarted) {
      setGuess(event.target.value);
      setError("");
    }
  };

  const checkDuplicateDigits = (input) => {
    const uniqueDigits = [...new Set(input)];
    return uniqueDigits.length === input.length;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!checkDuplicateDigits(guess)) {
      setError(
        <span style={{ color: "red" }}>
          ! 중복되지 않는 숫자를 입력해주세요.
        </span>
      );
      return;
    }

    const { strike, ball, out } = checkGuess(guess, answer);
    setResult(`Strike: ${strike}, Ball: ${ball}, Out: ${out}`);
    setGuess("");
    setAttempts((prevAttempts) => [
      ...prevAttempts,
      { guess, result: `Strike: ${strike}, Ball: ${ball}, Out: ${out}` },
    ]);

    if (strike === 4) {
      setGameOver(true);
    }
  };

  const handleRestart = () => {
    handleStart();
  };

  const handleAnswerClick = () => {
    setShowAnswer(!showAnswer);
  };

  const handleNumberClick = (number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers((prevNumbers) =>
        prevNumbers.filter((num) => num !== number)
      );
    } else {
      setSelectedNumbers((prevNumbers) => [...prevNumbers, number]);
    }
  };

  const handleNumberBoradClick = (index) => {
    const newDisplayedNumber = [...displayedNumber];
    newDisplayedNumber[index] = (newDisplayedNumber[index] + 1) % 10;
    setDisplayedNumber(newDisplayedNumber);
  };

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div>
      <header>
        <Link to="/game">뒤로</Link>
        <h1>Baseball Game</h1>
      </header>
      <div className="baseball-container">
        <form className="baseball-form" onSubmit={handleSubmit}>
          <button type="button" onClick={handleStart} disabled={gameStarted}>
            Start
          </button>
          <p className="baseball-timer">타이머: {formatTime(timer)}</p>
          <button type="button" onClick={handleRestart} disabled={!gameStarted}>
            Restart
          </button>
          <br></br>
          <input
            type="text"
            pattern="[0-9]{4}"
            maxLength="4"
            value={guess}
            onChange={handleGuessChange}
            required
            disabled={!gameStarted}
          />
          <button type="submit" disabled={!gameStarted}>
            Guess
          </button>
          {error && <p>{error}</p>}
        </form>
        <div className="baseball-attempts">
          {attempts.map((attempt, index) => (
            <p key={index}>{`${index + 1}번째 시도: ${attempt.guess} - ${
              attempt.result
            }`}</p>
          ))}
        </div>
        <div className="baseball-number-container">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
            <span
              key={number}
              className={`baseball-number ${
                selectedNumbers.includes(number) ? "selected" : ""
              }`}
              onClick={() => handleNumberClick(number)}
            >
              {number}
            </span>
          ))}
        </div>
        <br></br>
        <div className="baseball-numberBorad-container">
          {displayedNumber.map((number, index) => (
            <span
              key={index}
              className={`baseball-number`}
              onClick={() => handleNumberBoradClick(index)}
            >
              {number}
            </span>
          ))}
        </div>
        <br></br>
        <div className="baseball-product-card" onClick={handleAnswerClick}>
          <p>답을 확인하시겠습니까?</p>
          {showAnswer && <p>{answer}</p>}
        </div>
      </div>
    </div>
  );
};

export default Baseball;

import React, { useState } from "react";
import { Link } from "react-router-dom";

const generateAnswer = () => {
  const digits = [];
  while (digits.length < 4) {
    const randomDigit = Math.floor(Math.random() * 10);
    if (!digits.includes(randomDigit)) {
      digits.push(randomDigit);
    }
  }
  // console.log(digits);
  return digits.join("");
};

const Baseball = () => {
  const [answer, setAnswer] = useState(generateAnswer());
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState([]);
  const [result, setResult] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  const handleGuessChange = (event) => {
    setGuess(event.target.value);
  };

  const checkGuess = (guess, answer) => {
    let strike = 0;
    let ball = 0;
    for (let i = 0; i < guess.length; i++) {
      if (guess[i] === answer[i]) {
        strike++;
      } else if (answer.includes(guess[i])) {
        ball++;
      }
    }
    return { strike, ball };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { strike, ball } = checkGuess(guess, answer);
    setResult(`Strike: ${strike}, Ball: ${ball}`);
    setGuess("");
    setAttempts((prevAttempts) => [
      ...prevAttempts,
      { guess, result: `Strike: ${strike}, Ball: ${ball}` },
    ]);

    if (strike === 4) {
      const homeRunMessage = `홈런! ${attempts.length + 1}번째 홈런입니다!`;
      if (window.confirm(`${homeRunMessage} 게임을 다시 시작하시겠습니까?`)) {
        window.location.reload();
      }
    }
  };

  const handleRestart = () => {
    window.location.reload();
  };

  const handleAnswerClick = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div>
      <header>
        <Link to="/game">뒤로</Link>
        <h1>Baseball Game</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          pattern="[0-9]{4}"
          maxLength="4"
          value={guess}
          onChange={handleGuessChange}
          required
        />
        <button type="submit">Guess</button>
        <button type="button" onClick={handleRestart}>Restart</button>
      </form>
      <p>{result}</p>
      <div>
        {attempts.map((attempt, index) => (
          <p key={index}>{`${index + 1}번째 시도: ${attempt.guess} - ${attempt.result}`}</p>
        ))}
      </div>
      <div className="product-card" onClick={handleAnswerClick}>
        <p>답을 확인하시겠습니까?</p>
        {showAnswer && <p>{answer}</p>}
      </div>
    </div>
  );
};

export default Baseball;

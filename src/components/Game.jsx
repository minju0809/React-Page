import React from "react";
import { Link } from "react-router-dom";

const Game = () => {
  return (
    <div>
      <header>
        {/* 페이지로 돌아가기 위한 링크 */}
        <Link to="/">홈으로</Link>
        <br></br>
        {/* 게임 페이지 내용 */}
        <h2>게임</h2>
      </header>
      <Link to="/game/baseball">Baseball</Link>
    </div>
  );
};

export default Game;

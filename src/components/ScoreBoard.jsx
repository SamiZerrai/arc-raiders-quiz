function ScoreBoard({ score, attempts, label }) {
  return (
    <div className="score-board">
      <div className="score-item">
        <span className="label">{label}</span>
        <span className="value">{score}/{attempts}</span>
      </div>
    </div>
  );
}

export default ScoreBoard;

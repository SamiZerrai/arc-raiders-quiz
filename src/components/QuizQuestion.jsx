function QuizQuestion({
  instructions,
  playButton,
  isPlaying,
  onPlay,
  audioRef,
  currentRobot,
  selectLabel,
  selectPlaceholder,
  robots,
  selectedRobot,
  onSelectChange,
  validateButton,
  onSubmit,
  feedback,
  onAudioEnd
}) {
  return (
    <>
      <h2>{instructions}</h2>

      <button
        className={`play-button ${isPlaying ? 'playing' : ''}`}
        onClick={onPlay}
        disabled={isPlaying}
      >
        {isPlaying ? playButton.playing : playButton.default}
      </button>

      <audio ref={audioRef} onEnded={onAudioEnd}>
        <source src={`/sounds/${currentRobot}.mp3`} type="audio/mpeg" />
      </audio>

      <div className="selection-section">
        <label htmlFor="robot-select">{selectLabel}</label>
        <select
          id="robot-select"
          value={selectedRobot}
          onChange={(e) => onSelectChange(e.target.value)}
          className="robot-select"
        >
          <option value="">{selectPlaceholder}</option>
          {robots.map((robot) => (
            <option key={robot} value={robot}>
              {robot}
            </option>
          ))}
        </select>

        <button
          className="submit-button"
          onClick={onSubmit}
          disabled={!selectedRobot}
        >
          {validateButton}
        </button>
      </div>

      {feedback && (
        <div className={`feedback ${feedback.includes('✓') ? 'correct' : 'incorrect'}`}>
          {feedback}
        </div>
      )}
    </>
  );
}

export default QuizQuestion;

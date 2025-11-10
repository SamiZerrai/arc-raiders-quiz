function RobotReveal({ robotName, continueButton, onContinue }) {
  return (
    <div className="robot-reveal-full">
      <h2 className="robot-name">{robotName}</h2>
      <img
        src={`/images/${robotName}.webp`}
        alt={robotName}
        className="robot-image-full"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'flex';
        }}
      />
      <div className="image-placeholder-full" style={{display: 'none'}}>
        <p>{robotName}</p>
        <small>Image non disponible</small>
      </div>
      <button className="continue-button" onClick={onContinue}>
        {continueButton}
      </button>
    </div>
  );
}

export default RobotReveal;

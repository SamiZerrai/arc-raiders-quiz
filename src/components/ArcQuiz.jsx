import { useState, useRef, useEffect } from 'react';
import './ArcQuiz.css';
import { translations } from '../translations';

const ALL_ROBOTS = [
  'Tick', 'Pop', 'Fireball', 'Surveyor', 'Turret', 'Sentinel',
  'Snitch', 'Wasp', 'Hornet', 'Rocketeer', 'Leaper', 'Bastion',
  'Spotter', 'Bombardier', 'The Queen', 'Harvester', 'ARC Probe'
];

// Mode test: si VITE_TEST_MODE=true, utilise uniquement ARC Probe
const TEST_ROBOTS = ['ARC Probe'];
const IS_TEST_MODE = import.meta.env.VITE_TEST_MODE === 'true';
const ARC_ROBOTS = IS_TEST_MODE ? TEST_ROBOTS : ALL_ROBOTS;

function ArcQuiz() {
  const [currentRobot, setCurrentRobot] = useState('');
  const [selectedRobot, setSelectedRobot] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [currentAttempts, setCurrentAttempts] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [language, setLanguage] = useState('fr');
  const [showImage, setShowImage] = useState(false);
  const [revealedRobot, setRevealedRobot] = useState('');
  const [usedRobots, setUsedRobots] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const audioRef = useRef(null);

  const t = translations[language];
  const MAX_ATTEMPTS = 3;

  // Sélectionner un robot aléatoire au démarrage
  useEffect(() => {
    selectRandomRobot();
  }, []);

  const selectRandomRobot = () => {
    // Vérifier s'il reste des robots non utilisés
    const availableRobots = ARC_ROBOTS.filter(robot => !usedRobots.includes(robot));

    if (availableRobots.length === 0) {
      // Tous les robots ont été utilisés, réinitialiser
      setQuizCompleted(true);
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableRobots.length);
    const selectedRobotName = availableRobots[randomIndex];

    setCurrentRobot(selectedRobotName);
    setUsedRobots([...usedRobots, selectedRobotName]);
    setSelectedRobot('');
    setFeedback('');
    setCurrentAttempts(0);
    setShowImage(false);
    setRevealedRobot('');
    setQuizCompleted(false);
  };

  const resetQuiz = () => {
    setScore(0);
    setAttempts(0);
    setUsedRobots([]);
    setQuizCompleted(false);
    selectRandomRobot();
  };

  const playSound = () => {
    if (audioRef.current) {
      // Recharger la source audio pour s'assurer que le bon fichier est chargé
      audioRef.current.load();
      audioRef.current.currentTime = 0;
      setIsPlaying(true);
      audioRef.current.play()
        .catch(err => {
          console.error('Erreur de lecture audio:', err);
          setIsPlaying(false);
        });
    } else {
      // Feedback visuel si pas d'audio
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 1000);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleSubmit = () => {
    if (!selectedRobot) {
      setFeedback(t.selectRobotWarning);
      return;
    }

    const newCurrentAttempts = currentAttempts + 1;
    setCurrentAttempts(newCurrentAttempts);

    if (selectedRobot === currentRobot) {
      setScore(score + 1);
      setAttempts(attempts + 1);
      setFeedback(t.correctFeedback);
      setShowImage(true);
      setRevealedRobot(currentRobot);
    } else {
      if (newCurrentAttempts >= MAX_ATTEMPTS) {
        setAttempts(attempts + 1);
        setFeedback('');
        setShowImage(true);
        setRevealedRobot(currentRobot);
      } else {
        const remainingAttempts = MAX_ATTEMPTS - newCurrentAttempts;
        setFeedback(t.incorrectFeedback.replace('{remaining}', remainingAttempts));
        setSelectedRobot('');
      }
    }
  };

  const handleContinue = () => {
    selectRandomRobot();
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <div className="arc-quiz-container">
      <div className="header-container">
        <h1>{t.title}</h1>
        <div className="language-selector">
          <span className="language-label">{t.languageLabel}</span>
          <button className="language-button" onClick={toggleLanguage}>
            {language === 'fr' ? '🇬🇧 EN' : '🇫🇷 FR'}
          </button>
        </div>
      </div>

      <div className="score-board">
        <div className="score-item">
          <span className="label">{t.scoreLabel}</span>
          <span className="value">{score}/{attempts}</span>
        </div>
      </div>

      {quizCompleted ? (
        <div className="quiz-completed">
          <h2>{t.quizCompletedTitle}</h2>
          <p>{t.quizCompletedMessage}</p>
          <div className="final-score">
            <span className="label">{t.finalScore}</span>
            <span className="value">{score}/{ARC_ROBOTS.length}</span>
          </div>
          <button className="restart-button" onClick={resetQuiz}>
            {t.restartButton}
          </button>
        </div>
      ) : (
        <div className="quiz-section">
          {showImage && revealedRobot ? (
            <div className="robot-reveal-full">
              <h2 className="robot-name">{revealedRobot}</h2>
              <img
                src={`/images/${revealedRobot}.webp`}
                alt={revealedRobot}
                className="robot-image-full"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="image-placeholder-full" style={{display: 'none'}}>
                <p>{revealedRobot}</p>
                <small>Image non disponible</small>
              </div>
              <button className="continue-button" onClick={handleContinue}>
                {t.continueButton}
              </button>
            </div>
          ) : (
            <>
              <h2>{t.instructions}</h2>

              <button
                className={`play-button ${isPlaying ? 'playing' : ''}`}
                onClick={playSound}
                disabled={isPlaying}
              >
                {isPlaying ? t.playingButton : t.playButton}
              </button>

              {/* Audio element */}
              <audio
                ref={audioRef}
                onEnded={handleAudioEnded}
              >
                <source src={`/sounds/${currentRobot}.mp3`} type="audio/mpeg" />
              </audio>

              <div className="selection-section">
                <label htmlFor="robot-select">{t.selectLabel}</label>
                <select
                  id="robot-select"
                  value={selectedRobot}
                  onChange={(e) => setSelectedRobot(e.target.value)}
                  className="robot-select"
                >
                  <option value="">{t.selectPlaceholder}</option>
                  {ARC_ROBOTS.map((robot) => (
                    <option key={robot} value={robot}>
                      {robot}
                    </option>
                  ))}
                </select>

                <button
                  className="submit-button"
                  onClick={handleSubmit}
                  disabled={!selectedRobot}
                >
                  {t.validateButton}
                </button>
              </div>

              {feedback && (
                <div className={`feedback ${feedback.includes('✓') ? 'correct' : 'incorrect'}`}>
                  {feedback}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ArcQuiz;

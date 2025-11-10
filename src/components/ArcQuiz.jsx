import { useState, useRef, useEffect } from 'react';
import './ArcQuiz.css';
import { translations } from '../translations';
import Header from './Header';
import ScoreBoard from './ScoreBoard';
import QuizQuestion from './QuizQuestion';
import RobotReveal from './RobotReveal';
import QuizComplete from './QuizComplete';
import Footer from './Footer';

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
      <Header
        title={t.title}
        language={language}
        onLanguageToggle={toggleLanguage}
      />

      <ScoreBoard
        score={score}
        attempts={attempts}
        label={t.scoreLabel}
      />

      {quizCompleted ? (
        <QuizComplete
          title={t.quizCompletedTitle}
          message={t.quizCompletedMessage}
          finalScoreLabel={t.finalScore}
          score={score}
          total={ARC_ROBOTS.length}
          restartButton={t.restartButton}
          onRestart={resetQuiz}
          language={language}
        />
      ) : (
        <div className="quiz-section">
          {showImage && revealedRobot ? (
            <RobotReveal
              robotName={revealedRobot}
              continueButton={t.continueButton}
              onContinue={handleContinue}
            />
          ) : (
            <QuizQuestion
              instructions={t.instructions}
              playButton={{ default: t.playButton, playing: t.playingButton }}
              isPlaying={isPlaying}
              onPlay={playSound}
              audioRef={audioRef}
              currentRobot={currentRobot}
              selectLabel={t.selectLabel}
              selectPlaceholder={t.selectPlaceholder}
              robots={ARC_ROBOTS}
              selectedRobot={selectedRobot}
              onSelectChange={setSelectedRobot}
              validateButton={t.validateButton}
              onSubmit={handleSubmit}
              feedback={feedback}
              onAudioEnd={handleAudioEnded}
            />
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default ArcQuiz;

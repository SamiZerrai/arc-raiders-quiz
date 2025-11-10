import ShareScore from './ShareScore';
import { translations } from '../translations';

function QuizComplete({
  title,
  message,
  finalScoreLabel,
  score,
  total,
  language
}) {
  // Calculate rank based on score percentage
  const getRank = () => {
    const percentage = (score / total) * 100;
    const t = translations[language];

    if (percentage === 100) return t.rankPerfect;
    if (percentage >= 80) return t.rankExcellent;
    if (percentage >= 60) return t.rankGood;
    if (percentage >= 40) return t.rankAverage;
    return t.rankBeginner;
  };

  const rank = getRank();

  return (
    <div className="quiz-completed">
      <h2>{title}</h2>
      <p>{message}</p>
      <div className="final-score">
        <span className="label">{finalScoreLabel}</span>
        <span className="value">{score}/{total}</span>
      </div>
      <div className="rank-display">
        <span className="rank-title">{rank}</span>
      </div>

      <ShareScore score={score} total={total} language={language} rank={rank} />
    </div>
  );
}

export default QuizComplete;

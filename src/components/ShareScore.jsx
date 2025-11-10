import { useRef, useEffect } from 'react';
import './ShareScore.css';

function ShareScore({ score, total, language, rank }) {
  const canvasRef = useRef(null);

  const translations = {
    fr: {
      title: 'ARC RAIDERS QUIZ',
      scoreText: 'MON SCORE',
      shareText: 'PARTAGER',
      downloadText: 'TÉLÉCHARGER',
      footer: 'Joue sur arcquiz.com'
    },
    en: {
      title: 'ARC RAIDERS QUIZ',
      scoreText: 'MY SCORE',
      shareText: 'SHARE',
      downloadText: 'DOWNLOAD',
      footer: 'Play on arcquiz.com'
    }
  };

  const t = translations[language];

  useEffect(() => {
    generateScoreImage();
  }, [score, total, language, rank]);

  const generateScoreImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = 800;
    const height = 600;

    canvas.width = width;
    canvas.height = height;

    // Fond noir profond
    ctx.fillStyle = '#0A0E1A';
    ctx.fillRect(0, 0, width, height);

    // Background card sombre (comme le site)
    const cardPadding = 40;
    ctx.fillStyle = 'rgba(45, 50, 60, 0.8)';
    ctx.fillRect(cardPadding, cardPadding, width - cardPadding * 2, height - cardPadding * 2);

    // Bordure subtile
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    ctx.strokeRect(cardPadding, cardPadding, width - cardPadding * 2, height - cardPadding * 2);

    // Titre en blanc (police moderne)
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '600 42px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(t.title, width / 2, 130);

    // Séparateur subtil
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(120, 170);
    ctx.lineTo(width - 120, 170);
    ctx.stroke();

    // Card pour le score (style dark moderne)
    const scoreCardX = 140;
    const scoreCardY = 220;
    const scoreCardWidth = width - 280;
    const scoreCardHeight = 180;

    // Background de la card de score
    ctx.fillStyle = 'rgba(0, 217, 255, 0.08)';
    ctx.fillRect(scoreCardX, scoreCardY, scoreCardWidth, scoreCardHeight);

    // Bordure de la card
    ctx.strokeStyle = 'rgba(0, 217, 255, 0.25)';
    ctx.lineWidth = 1;
    ctx.strokeRect(scoreCardX, scoreCardY, scoreCardWidth, scoreCardHeight);

    // Label "MON SCORE" (petit et discret)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = '500 20px -apple-system, sans-serif';
    ctx.fillText(t.scoreText, width / 2, 265);

    // Score principal (gros et blanc)
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 90px -apple-system, sans-serif';
    ctx.fillText(`${score}/${total}`, width / 2, 350);

    // Rank (sous le score)
    ctx.fillStyle = '#00D9FF';
    ctx.font = '600 32px -apple-system, sans-serif';
    ctx.fillText(rank, width / 2, 395);

    // Footer discret
    ctx.fillStyle = 'rgba(0, 217, 255, 0.8)';
    ctx.font = '500 22px -apple-system, sans-serif';
    ctx.fillText(t.footer, width / 2, 500);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `arc-raiders-score-${score}-${total}.png`;
      link.click();
      URL.revokeObjectURL(url);
    });
  };

  const shareImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      // Convertir le canvas en blob
      canvas.toBlob(async (blob) => {
        const file = new File([blob], `arc-raiders-score.png`, { type: 'image/png' });

        // Vérifier si Web Share API est disponible
        if (navigator.share && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'ARC Raiders Quiz',
            text: `J'ai obtenu ${score}/${total} au quiz ARC Raiders! 🎮`,
            files: [file],
            url: 'https://arcquiz.com'
          });
        } else {
          // Fallback: télécharger l'image
          downloadImage();
        }
      });
    } catch (error) {
      console.error('Erreur de partage:', error);
      // Fallback: télécharger l'image
      downloadImage();
    }
  };

  return (
    <div className="share-score-container">
      <canvas ref={canvasRef} className="score-canvas" />

      <div className="share-buttons">
        <button className="share-button primary" onClick={shareImage}>
          {t.shareText}
        </button>
        <button className="share-button secondary" onClick={downloadImage}>
          {t.downloadText}
        </button>
      </div>
    </div>
  );
}

export default ShareScore;

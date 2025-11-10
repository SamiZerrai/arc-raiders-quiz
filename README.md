# 🤖 Arc Raiders - Quiz des Sons ARC

Une application de quiz interactive pour deviner les robots ARC du jeu Arc Raiders en écoutant leurs bruits distinctifs.

## 🎮 Fonctionnalités

- **Quiz audio interactif**: Écoutez le son d'un robot ARC et devinez lequel c'est
- **17 robots différents**: Tous les robots ARC principaux du jeu
- **Système de score**: Suivez votre progression et votre précision
- **Interface moderne**: Design responsive avec animations et gradients
- **Liste déroulante**: Sélection facile parmi tous les robots disponibles

## 🚀 Installation

1. Cloner le projet (si ce n'est pas déjà fait)

2. Installer les dépendances:
```bash
npm install
```

3. Ajouter les fichiers audio des robots dans le dossier `public/sounds/` (voir instructions ci-dessous)

4. Lancer le serveur de développement:
```bash
npm run dev
```

5. Ouvrir votre navigateur à l'adresse indiquée (généralement `http://localhost:5173`)

## 🔊 Ajout des fichiers audio

Pour que le quiz fonctionne avec les vrais sons des robots ARC, vous devez:

1. Créer ou obtenir les fichiers audio des robots
2. Les placer dans le dossier `public/sounds/`
3. Les nommer exactement comme suit (sensible à la casse):
   - `Tick.mp3`
   - `Pop.mp3`
   - `Fireball.mp3`
   - `Surveyor.mp3`
   - `Turret.mp3`
   - `Sentinel.mp3`
   - `Snitch.mp3`
   - `Wasp.mp3`
   - `Hornet.mp3`
   - `Rocketeer.mp3`
   - `Leaper.mp3`
   - `Bastion.mp3`
   - `Spotter.mp3`
   - `Bombardier.mp3`
   - `The Queen.mp3`
   - `Harvester.mp3`
   - `ARC Probe.mp3`

4. Mettre à jour le composant `ArcQuiz.jsx` pour charger les fichiers (voir section suivante)

### Mise à jour du code pour charger les sons

Dans `src/components/ArcQuiz.jsx`, décommentez et modifiez la ligne dans l'élément `<audio>`:

```jsx
<audio ref={audioRef} onEnded={handleAudioEnded}>
  <source src={`/sounds/${currentRobot}.mp3`} type="audio/mpeg" />
</audio>
```

## 🎯 Comment jouer

1. Cliquez sur le bouton "🎵 Écouter le son" pour entendre le bruit d'un robot ARC
2. Sélectionnez le robot que vous pensez correspondre au son dans la liste déroulante
3. Cliquez sur "Valider" pour vérifier votre réponse
4. Si vous avez bon, vous gagnez un point! Sinon, le robot correct vous sera révélé
5. Un nouveau robot est automatiquement sélectionné pour continuer le quiz
6. Essayez d'obtenir le meilleur score de précision possible!

## 🛠️ Technologies utilisées

- **React 18**: Bibliothèque JavaScript pour l'interface utilisateur
- **Vite**: Build tool rapide et moderne
- **CSS3**: Animations et gradients modernes

## 📂 Structure du projet

```
arc-raiders-quiz/
├── public/
│   └── sounds/           # Fichiers audio des robots
├── src/
│   ├── components/
│   │   ├── ArcQuiz.jsx   # Composant principal du quiz
│   │   └── ArcQuiz.css   # Styles du quiz
│   ├── App.jsx           # Composant racine
│   ├── App.css           # Styles de l'app
│   ├── index.css         # Styles globaux
│   └── main.jsx          # Point d'entrée
├── package.json
└── README.md
```

## 🎨 Personnalisation

Vous pouvez facilement personnaliser:

- **Couleurs**: Modifiez les gradients dans `ArcQuiz.css`
- **Robots**: Ajoutez ou retirez des robots dans le tableau `ARC_ROBOTS` dans `ArcQuiz.jsx`
- **Durée du feedback**: Ajustez les timeouts dans les fonctions `handleSubmit`

## 📝 Scripts disponibles

- `npm run dev`: Lance le serveur de développement
- `npm run build`: Compile l'application pour la production
- `npm run preview`: Prévisualise la version de production
- `npm run lint`: Vérifie le code avec ESLint

## 🚀 Déploiement sur Hostinger

Ce projet est configuré pour un déploiement automatique sur Hostinger via GitHub Actions.

### Configuration rapide:

1. **Pushez votre code sur GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/votre-username/arc-raiders-quiz.git
   git push -u origin main
   ```

2. **Configurez les secrets GitHub**:
   - Allez dans Settings > Secrets and variables > Actions
   - Ajoutez 3 secrets:
     - `FTP_SERVER`: Votre serveur FTP Hostinger (ex: ftp.votredomaine.com)
     - `FTP_USERNAME`: Votre nom d'utilisateur FTP
     - `FTP_PASSWORD`: Votre mot de passe FTP

3. **Déploiement automatique**:
   - Chaque push sur `main` déclenchera automatiquement le déploiement
   - Suivez le progrès dans l'onglet "Actions" de GitHub

📖 **Guide complet**: Voir [DEPLOYMENT.md](DEPLOYMENT.md) pour plus de détails

## 🎮 À propos d'Arc Raiders

Arc Raiders est un jeu développé par Embark Studios. Les ARC sont des machines mortelles qui tombent du ciel, avec des tailles variant de petites unités discrètes à des béhémoths multi-pattes, chacune ayant des patterns d'attaque distincts et des faiblesses stratégiques.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

All game content, including but not limited to game mechanics, items, names, and imagery, is copyright © Embark Studios AB. This repository is a community resource and is not affiliated with or endorsed by Embark Studios AB.

## 🤝 Contribution

N'hésitez pas à contribuer en:
- Ajoutant les vrais fichiers audio
- Améliorant l'interface
- Ajoutant de nouvelles fonctionnalités (mode difficile, timer, etc.)

Bon quiz! 🎮🤖

# Déploiement Manuel (sans Git/GitHub)

Plusieurs options pour déployer sans passer par GitHub Actions.

## Option 1: Via Client FTP (FileZilla, Cyberduck, etc.) - RECOMMANDÉ

### Étape 1: Build du projet
```bash
npm run build
```

Cela crée un dossier `dist/` avec tous les fichiers de production.

### Étape 2: Upload via client FTP

1. **Téléchargez un client FTP**:
   - [FileZilla](https://filezilla-project.org/) (Gratuit)
   - [Cyberduck](https://cyberduck.io/) (Gratuit)
   - [Transmit](https://panic.com/transmit/) (Payant mais excellent)

2. **Connectez-vous à Hostinger**:
   - **Host**: `ftp.votredomaine.com` (ou l'adresse fournie par Hostinger)
   - **Username**: Votre nom d'utilisateur FTP
   - **Password**: Votre mot de passe FTP
   - **Port**: 21 (FTP) ou 22 (SFTP)

3. **Uploadez les fichiers**:
   - Naviguez vers le dossier `public_html/` (ou `htdocs/`, `www/`)
   - Uploadez TOUT le contenu du dossier `dist/` (pas le dossier lui-même)
   - Les fichiers à uploader:
     - `index.html`
     - `assets/` (dossier complet)
     - `sounds/` (si vous les avez ajoutés)
     - `images/` (si vous les avez ajoutés)

### Structure finale sur Hostinger:
```
public_html/
├── index.html
├── assets/
│   ├── index-xxx.css
│   └── index-xxx.js
├── sounds/
│   └── ARC Probe.mp3
└── images/
    └── ARC Probe.webp
```

---

## Option 2: Script automatique (Terminal)

### Prérequis: Installer lftp
```bash
brew install lftp
```

### Utilisation:

1. **Définissez vos identifiants FTP**:
```bash
export FTP_SERVER='ftp.votredomaine.com'
export FTP_USERNAME='votre_username'
export FTP_PASSWORD='votre_password'
```

2. **Lancez le script**:
```bash
./deploy-manual.sh
```

Le script va:
1. ✅ Build le projet
2. ✅ Upload automatiquement vers Hostinger
3. ✅ Supprimer les anciens fichiers sur le serveur

---

## Option 3: Via panneau Hostinger (File Manager)

1. **Build le projet**:
```bash
npm run build
```

2. **Compressez le dossier dist**:
```bash
cd dist
zip -r ../dist.zip .
cd ..
```

3. **Upload via Hostinger**:
   - Connectez-vous au panneau Hostinger
   - Allez dans **Fichiers** > **Gestionnaire de fichiers**
   - Naviguez vers `public_html/`
   - Uploadez `dist.zip`
   - Extrayez le fichier zip directement sur le serveur
   - Supprimez `dist.zip` après extraction

---

## Option 4: Déploiement GitHub manuel (sans auto-deploy)

Si vous voulez quand même utiliser GitHub Actions mais manuellement:

1. **Pushez votre code**:
```bash
git add .
git commit -m "Mise à jour"
git push origin main
```

2. **Allez sur GitHub** > Onglet "Actions"

3. **Cliquez sur le workflow** "Deploy to Hostinger"

4. **Cliquez sur "Run workflow"** > "Run workflow"

Le déploiement se lancera manuellement.

---

## Vérification du déploiement

Après upload, visitez votre site:
```
https://votredomaine.com
```

Vérifiez que:
- ✅ Le site s'affiche correctement
- ✅ Les sons se chargent (ouvrez la console F12 pour voir les erreurs)
- ✅ Les images s'affichent

---

## Troubleshooting

### Le site affiche une page blanche
- Vérifiez que `index.html` est bien à la racine de `public_html/`
- Vérifiez que le dossier `assets/` existe

### Les sons ne marchent pas
- Vérifiez que `sounds/ARC Probe.mp3` existe bien sur le serveur
- Regardez la console navigateur (F12) pour les erreurs 404

### Les chemins sont cassés
- Assurez-vous d'avoir uploadé dans le bon dossier (`public_html/` et non `public_html/dist/`)

---

## Astuce: Déploiement rapide

Créez un alias dans votre `~/.zshrc` ou `~/.bashrc`:

```bash
alias deploy-arc="cd /Users/samiz/Documents/workspace/arc-raiders-quiz && npm run build && echo 'Build terminé! Uploadez dist/ vers Hostinger'"
```

Puis utilisez simplement:
```bash
deploy-arc
```

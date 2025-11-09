# Déploiement sur Hostinger avec GitHub Actions

Ce projet est configuré pour se déployer automatiquement sur Hostinger à chaque push sur la branche `main`.

## Configuration requise

### 1. Informations Hostinger nécessaires

Vous aurez besoin des informations FTP de votre compte Hostinger:

- **Serveur FTP**: Généralement `ftp.votredomaine.com` ou une adresse IP
- **Nom d'utilisateur FTP**: Votre nom d'utilisateur Hostinger
- **Mot de passe FTP**: Votre mot de passe FTP

Pour trouver ces informations sur Hostinger:
1. Connectez-vous à votre panneau de contrôle Hostinger
2. Allez dans **Fichiers** > **Gestionnaire de fichiers** > **Compte FTP**
3. Notez le serveur FTP, le nom d'utilisateur et le mot de passe

### 2. Configuration des secrets GitHub

1. Allez sur votre dépôt GitHub
2. Cliquez sur **Settings** (Paramètres)
3. Dans le menu de gauche, cliquez sur **Secrets and variables** > **Actions**
4. Cliquez sur **New repository secret**

Ajoutez les 3 secrets suivants:

#### Secret 1: FTP_SERVER
- **Name**: `FTP_SERVER`
- **Value**: `ftp.votredomaine.com` (ou l'adresse de votre serveur FTP Hostinger)

#### Secret 2: FTP_USERNAME
- **Name**: `FTP_USERNAME`
- **Value**: Votre nom d'utilisateur FTP Hostinger

#### Secret 3: FTP_PASSWORD
- **Name**: `FTP_PASSWORD`
- **Value**: Votre mot de passe FTP Hostinger

### 3. Configuration du chemin de déploiement

Par défaut, le workflow déploie dans `./public_html/`. Si votre dossier racine est différent, modifiez la ligne `server-dir` dans `.github/workflows/deploy.yml`:

```yaml
server-dir: ./votre_dossier/  # Par exemple: ./htdocs/ ou ./www/
```

## Comment ça marche

1. **Vous poussez du code** sur la branche `main`:
   ```bash
   git add .
   git commit -m "Mise à jour du quiz"
   git push origin main
   ```

2. **GitHub Actions s'exécute automatiquement**:
   - ✅ Installe les dépendances
   - ✅ Build le projet (crée le dossier `dist/`)
   - ✅ Upload les fichiers sur Hostinger via FTP

3. **Votre site est mis à jour** sur Hostinger!

## Vérification du déploiement

1. Allez dans **Actions** sur votre dépôt GitHub
2. Vous verrez l'état du dernier déploiement
3. En cas d'erreur, cliquez sur le workflow pour voir les détails

## Déploiement manuel (sans GitHub Actions)

Si vous préférez déployer manuellement:

```bash
# 1. Build le projet
npm run build

# 2. Upload le contenu du dossier dist/ vers Hostinger
# Utilisez FileZilla, Cyberduck ou tout client FTP
```

## Notes importantes

- Le workflow ne supprime PAS les fichiers existants (`dangerous-clean-slate: false`)
- Les fichiers audio et images doivent être uploadés manuellement sur Hostinger dans:
  - `/public_html/sounds/` pour les fichiers audio
  - `/public_html/images/` pour les images des robots
- Assurez-vous que votre branche par défaut est bien `main` (ou changez dans le workflow)

## Structure des dossiers sur Hostinger

Après déploiement, votre structure devrait ressembler à:

```
public_html/
├── index.html
├── assets/
│   ├── index-xxx.css
│   └── index-xxx.js
├── sounds/
│   ├── Tick.mp3
│   ├── Pop.mp3
│   └── ...
└── images/
    ├── Tick.webp
    ├── Pop.webp
    └── ...
```

## Dépannage

### Erreur "Connection refused"
- Vérifiez que votre serveur FTP est correct
- Essayez avec `ftps://` au lieu de `ftp://` si Hostinger utilise FTPS

### Erreur "Authentication failed"
- Vérifiez vos identifiants FTP
- Assurez-vous qu'il n'y a pas d'espaces dans vos secrets

### Les fichiers ne s'affichent pas
- Vérifiez le chemin `server-dir` dans le workflow
- Assurez-vous que le dossier existe sur Hostinger

## Support

Pour toute question sur:
- GitHub Actions: [Documentation GitHub Actions](https://docs.github.com/actions)
- Hostinger FTP: [Support Hostinger](https://www.hostinger.fr/tutoriels/comment-utiliser-ftp)

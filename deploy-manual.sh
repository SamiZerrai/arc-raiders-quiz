#!/bin/bash

# Script de déploiement manuel vers Hostinger
# Usage: ./deploy-manual.sh

echo "🚀 Déploiement manuel vers Hostinger"
echo "======================================"

# Vérifier si les variables d'environnement sont définies
if [ -z "$FTP_SERVER" ] || [ -z "$FTP_USERNAME" ] || [ -z "$FTP_PASSWORD" ]; then
    echo "❌ Variables d'environnement manquantes!"
    echo ""
    echo "Définissez les variables suivantes:"
    echo "export FTP_SERVER='ftp.votredomaine.com'"
    echo "export FTP_USERNAME='votre_username'"
    echo "export FTP_PASSWORD='votre_password'"
    echo ""
    exit 1
fi

# Build du projet
echo "📦 Build du projet..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du build"
    exit 1
fi

echo "✅ Build réussi!"

# Déploiement via FTP (nécessite lftp)
if ! command -v lftp &> /dev/null; then
    echo "❌ lftp n'est pas installé"
    echo "Installez-le avec: brew install lftp"
    exit 1
fi

echo "📤 Upload vers Hostinger..."

lftp -c "
set ftp:ssl-allow no;
open -u $FTP_USERNAME,$FTP_PASSWORD $FTP_SERVER;
mirror -R --verbose --delete dist/ public_html/;
bye
"

if [ $? -eq 0 ]; then
    echo "✅ Déploiement réussi!"
else
    echo "❌ Erreur lors du déploiement"
    exit 1
fi

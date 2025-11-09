# Configuration des variables d'environnement

## Mode Test

Le projet supporte un mode de test qui permet de tester le quiz avec un seul robot (ARC Probe) au lieu des 17 robots.

### Activation du mode test

1. **Copiez le fichier d'exemple**:
   ```bash
   cp .env.example .env
   ```

2. **Modifiez `.env`**:
   ```
   VITE_TEST_MODE=true
   ```

3. **Redémarrez le serveur de développement**:
   ```bash
   npm run dev
   ```

### Désactivation du mode test

Modifiez `.env`:
```
VITE_TEST_MODE=false
```

Ou supprimez complètement la ligne.

## Utilisation

### Mode Test activé (`VITE_TEST_MODE=true`)
- ✅ Le quiz utilise uniquement **ARC Probe**
- ✅ Parfait pour tester le son `ARC Probe.mp3`
- ✅ Le quiz se termine après 1 question

### Mode Normal (`VITE_TEST_MODE=false` ou absent)
- ✅ Le quiz utilise les **17 robots**
- ✅ Mode de production complet

## Fichiers concernés

- `.env` - Configuration locale (ignoré par Git)
- `.env.example` - Template de configuration (commité dans Git)

## Important

⚠️ Le fichier `.env` n'est **PAS** commité dans Git (ajouté au `.gitignore`)

Cela permet à chaque développeur d'avoir sa propre configuration sans affecter les autres.

## Pour ajouter le son de test

Placez uniquement le fichier:
```
public/sounds/ARC Probe.mp3
```

Vous pouvez tester le quiz avec juste ce son avant d'ajouter les 16 autres.

# 🎯 SkillTracker

SkillTracker est une application web moderne pour suivre vos objectifs personnels et professionnels. Construite avec Next.js et un design cyberpunk, elle offre une expérience utilisateur fluide et visuellement attrayante.

## ✨ Fonctionnalités

- 📊 Tableau de bord avec statistiques en temps réel
- ✅ Création et gestion d'objectifs
- 🔍 Filtrage des objectifs par statut
- 🎨 Interface cyberpunk avec animations fluides
- 📱 Design responsive
- ⚡ Performance optimisée

## 🚀 Prérequis

- [Node.js](https://nodejs.org/) (version 16 ou supérieure)
- [npm](https://www.npmjs.com/) (inclus avec Node.js)

## 🛠️ Technologies Utilisées

- [Next.js](https://nextjs.org/) - Framework React
- [Prisma](https://www.prisma.io/) - ORM pour la base de données
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Framer Motion](https://www.framer.com/motion/) - Bibliothèque d'animations
- [SQLite](https://www.sqlite.org/) - Base de données

## 📦 Installation

1. Clonez le dépôt :
```bash
git clone https://github.com/thegoatcrseven/Skill-Track.git
cd Skill-Track
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez la base de données :
```bash
# Créez un fichier .env avec la configuration de la base de données
echo "DATABASE_URL=\"file:./dev.db\"" > .env

# Initialisez la base de données avec Prisma
npx prisma generate
npx prisma migrate dev
```

4. Lancez le serveur de développement :
```bash
npm run dev
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## 🛠️ Scripts Disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Crée une version de production
- `npm start` - Lance la version de production
- `npm run lint` - Vérifie le code avec ESLint

## 📝 Structure du Projet

```
skilltracker/
├── prisma/                # Configuration Prisma et migrations
├── public/               # Fichiers statiques
├── src/
│   ├── components/      # Composants React réutilisables
│   ├── pages/          # Pages et routes Next.js
│   │   ├── api/       # Points d'entrée de l'API
│   │   └── ...
│   └── styles/         # Styles globaux et configurations
├── .env                 # Variables d'environnement
├── package.json        # Dépendances et scripts
└── README.md          # Documentation
```

## 🎨 Personnalisation

Le thème cyberpunk peut être personnalisé en modifiant :
- `tailwind.config.js` - Pour les couleurs et les animations
- `src/styles/globals.css` - Pour les styles globaux

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit vos changements (`git commit -m 'Add amazing feature'`)
4. Push sur la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request


## ✨ Crédits

Développé avec ❤️ et acharnement par Gregori Badiane & Moulaye Ba

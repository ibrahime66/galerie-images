# Galerie d'images — Exercice 2

Projet du cours Programmation React Native (Licence 4 Génie logiciel, UNC, 2026-2027) : une galerie d'images avec recherche, catégories et favoris.

## Groupe

| Membre | Courriel | Extension |
| --- | --- | --- |
| À compléter | | |
| À compléter | | |
| À compléter | | |
| À compléter | | |

## Installation

Prérequis : Node.js 20 ou plus récent, et l'application Expo Go sur le téléphone.

```bash
npm install
npx expo start
```

Scanner le QR code avec Expo Go (Android) ou l'appareil photo (iPhone). Si le téléphone n'est pas sur le même réseau que l'ordinateur : `npx expo start --tunnel`.

## Structure

```
src/
  App.js                       point d'entrée de l'application
  components/ImageCard.js      carte image (ImageBackground)
  screens/GalleryScreen.js     écran de la galerie
  data/images.js               données initiales
  context/GalleryContext.js    favoris avec Context API
  store/redux/                 favoris avec Redux Toolkit
  store/zustand/               favoris avec Zustand
  store/recoil/                favoris avec Recoil
```

## Code de départ

Le code de `src/` est celui du sujet. Deux adaptations ont été nécessaires pour qu'il s'exécute :

- le sujet donne les styles en un seul bloc : chaque fichier reçoit les styles qu'il utilise ;
- le sujet ne donne pas `App.js` : il affiche simplement `GalleryScreen`.

`SearchBar.js` et `CategoryFilter.js` figurent dans l'arborescence du sujet mais ne sont pas fournis. Les quatre versions des favoris ne sont pas encore reliées à l'écran, et leurs bibliothèques ne sont pas installées.

## Suivi

- `TODO.md` : tâches prévues, en cours et terminées, avec le membre responsable.
- `JOURNAL.md` : journal de développement hebdomadaire.

# Dream Journal App



## tech stack

- React Native

- TypeScript

- Expo

  

# Getting started


## Initialisation :
Clone the repo and go at the root :  ```cd Dream-Journal-App```. 

Then execute :
  
```bash 
npm install 
``` 
## Launch server 

At the root of the directory, execute : 
```bash
npx expo 
```

You can use the QRCode to open the app on your smartphone with expo go, with your browser or Android Studio.



# Structure and Architecture

The application works on a system of Tabs to change page.

  

src/

components/: Composants réutilisables utilisés dans l'application.

screens/: Écrans de l'application, regroupés par fonctionnalité.

controllers/: Gestionnaires de la logique métier de l'application, tels que l'accès à AsyncStorage.

models/: Interfaces et modèles de données utilisés dans l'application.

utils/: Fonctions utilitaires et outils pour l'application.

L'architecture suit une approche basée sur les fonctionnalités, avec une séparation claire entre les composants visuels, la logique métier et les modèles de données. L'utilisation de AsyncStorage permet de stocker les données localement sur l'appareil de l'utilisateur.

  

# Implemented features

Ajout de rêve via un formulaire.

Consultation de l'historique des rêves.

Analyse sémantique des rêves à l'aide d'une API externe.
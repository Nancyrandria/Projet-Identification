# Projet Sécurité – Inscription & Connexion en JavaScript

Ce projet est un mini système d’authentification réalisé en **HTML, CSS et JavaScript pur**. Il met en œuvre des règles de sécurité côté client pour l’inscription et la connexion des utilisateurs.

---

## Contexte

Projet réalisé pour illustrer les concepts de :
- Validation des entrées
- Sécurité des mots de passes
- Gestion des tentatives de connexion
- Stockage local des données

---

## Objectifs du projet

- Implémenter un système d’inscription et de connexion
- Appliquer des règles de validation (email, mot de passe)
- Sécuriser les mots de passe avec un **hachage SHA-256**
- Bloquer la connexion après plusieurs tentatives échouées
- Gérer les utilisateurs via le **LocalStorage**
- Afficher des messages d’erreur et de succès clairs et stylisés

---

## Technologies utilisées

- **HTML5** : structure des formulaires
- **CSS** : mise en forme et messages visuels
- **JavaScript**:
  - Validation des formulaires
  - Hachage des mots de passe (Web Crypto API)
  - Gestion du LocalStorage
  - Gestion des tentatives de connexion
- **Font Awesome** : icônes (réinitialisation, réseaux sociaux)

---

## Fonctionnalités de sécurité

### Validation des champs
- Email valide via Regex
- Mot de passe fort :
  - Minimum 8 caractères
  - Au moins 1 majuscule
  - Au moins 1 chiffre

### Sécurisation des mots de passe
- Les mots de passe sont **hachés avec SHA-256**
- Aucun mot de passe n’est stocké en clair

### Protection contre les attaques par force brute
- Maximum **3 tentatives de connexion**
- Blocage temporaire après 3 échecs
- Message : *“Trop de tentatives. Veuillez réessayer plus tard”*

### 📦 Stockage des données
- Les utilisateurs sont stockés dans le **LocalStorage**
- Données persistantes tant que le cache navigateur n’est pas vidé
- Stockage local au navigateur (non partagé entre ordinateurs)

---

## Fonctionnalités utilisateur

- Inscription avec contrôle complet des champs
- Connexion sécurisée
- Bouton de réinitialisation des formulaires (icône)
- Messages :
  - Erreur (rouge)
  - Succès (vert)
- Disparition automatique des messages après 5 secondes

---

## Comment utiliser le projet

### Lancer le projet
- Ouvrir le fichier `index.html` dans un navigateur moderne (Chrome, Edge, Firefox)

### Inscription
- Remplir tous les champs
- Respecter le format de l'email
- Respecter le format du mot de passe
- Cliquer sur **S’inscrire**
- Message de succès affiché

### Connexion
- Entrer l’email et le mot de passe
- Après 3 erreurs, la connexion est bloquée temporairement

---

## 📁 Structure du projet
Projet-Identification/
├── index.html
├── style.css
├── app.js
└── img/

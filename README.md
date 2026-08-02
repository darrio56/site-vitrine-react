# Portfolio — Version React

Point de départ du site de présentation, en HTML5 / React / JavaScript.

## ce projet est conçu pour être un model pour les jeunes développeurs qui désire créer leur portfolio

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvre l'URL affichée (en général `http://localhost:5173`).

## Ce qu'il te reste à faire

1. Remplace `public/profile-placeholder.jpg` par ta vraie photo (le fichier
   `hugues1.jpeg` doit être remplacé par ta propre photo).
2. Relis chaque composant dans `src/components/` — ils sont volontairement
   simples pour que tu puisses les modifier facilement.
3. Le formulaire de contact (`Contact.jsx`) ne fait qu'un `console.log` pour
   l'instant : branche-le sur EmailJS ou un petit backend quand tu es prêt.

## Ce que chaque fichier t'apprend

| Fichier | Concept React/JS appris |
|---|---|
| `hooks/useTypewriter.js` | `useEffect` + `setTimeout`, nettoyage d'effet |
| `components/Header.jsx` | `useRef`, Canvas API, `requestAnimationFrame` |
| `components/Sidebar.jsx` | props (`open`, `onClose`), rendu conditionnel |
| `components/Contact.jsx` | formulaire contrôlé avec `useState` |
| `components/Resume.jsx`, `Portfolio.jsx` | rendu de listes avec `.map()` |
| `components/ChatWidget.jsx` | `useState`, `useRef` + `useEffect` (scroll auto), appel `fetch` vers l'API |
| `App.jsx` | composition de composants, état partagé (menu ouvert/fermé) |

## Assistant IA (chatbot)

Le site intègre un chatbot (`ChatWidget.jsx`) qui répond aux questions des
visiteurs sur ton profil, en s'appuyant sur ton CV.

**Mise en place :**

1. À la racine du projet, crée un dossier `api/` contenant `chat.js`
   (fonction serverless Vercel qui appelle l'API Claude).
2. Crée un dossier `data/` contenant `cv.txt` : ton CV en texte, lu
   dynamiquement par `api/chat.js` pour construire le system prompt.
3. Sur Vercel → Project Settings → Environment Variables, ajoute
   `ANTHROPIC_API_KEY` avec ta clé API Anthropic.
4. En local, crée un fichier `.env.local` (ajouté au `.gitignore`) avec
   la même variable, et lance le projet avec `vercel dev` (nécessite le
   CLI Vercel : `npm i -g vercel`) plutôt que `npm run dev` pour que la
   fonction serverless soit exécutée.

Pour mettre à jour les informations que le chatbot connaît, il suffit de
modifier `data/cv.txt` — aucun changement de code nécessaire.

## À propos de la version Laravel

Une version distincte du portfolio existe en PHP/Laravel — c'est un projet
séparé et indépendant de celui-ci (stack différente, chatbot avec RAG côté
Laravel), sans lien de dépendance entre les deux.

# Portfolio — Version React

Point de départ du site de présentation, en HTML5 / React / JavaScript.

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvre l'URL affichée (en général `http://localhost:5173`).

## Ce qu'il te reste à faire

1. Remplace `public/profile-placeholder.jpg` par tes vraies photos.
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
| `App.jsx` | composition de composants, état partagé (menu ouvert/fermé) |

## Prochaine étape suggérée

Une fois cette version stable, on attaque la version PHP/Laravel du même
site — les mêmes sections, mais avec des templates Blade, des routes et une
base de données pour le Portfolio.

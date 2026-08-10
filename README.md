# Algo Visualizer

**Interactive sorting algorithm visualizer built with React and Vite.**

[![Live Demo](https://img.shields.io/badge/demo-imagine--algo.netlify.app-0ea5e9?style=flat-square)](https://imagine-algo.netlify.app/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-build-646CFF?style=flat-square&logo=vite)](https://vitejs.dev)

Watch classic sorting algorithms run step by step with animated bars, adjustable speed/size, and live pseudo-code display. Useful for learning how each algorithm moves data.

---

## Supported algorithms

| Algorithm | Visual behavior |
|---|---|
| Selection Sort | Finds minimum from unsorted region and swaps |
| Bubble Sort | Adjacent comparisons and swaps |
| Insertion Sort | Inserts each element into sorted prefix |
| Merge Sort | Divide-and-conquer with merge steps |
| Quick Sort | Partition around pivot recursively |

---

## Features

- Adjustable array size and animation speed
- Color themes for active / comparing / sorted bars
- Algorithm descriptions in the UI
- Syntax-highlighted pseudo-code panel
- Responsive React + Bootstrap layout

---

## Tech stack

- **React 18** + **Vite**
- **React Bootstrap** for layout/components
- **react-syntax-highlighter** for code display
- Custom sorting implementations in `src/Algorithm/`

---

## Quick start

```bash
git clone https://github.com/Znaxh/Algo-Visualizer.git
cd Algo-Visualizer
npm install
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173).

### Production build

```bash
npm run build
npm run preview
```

---

## Project structure

```
Algo-Visualizer/
├── src/
│   ├── Algorithm/
│   │   └── sortingAlgorithms.js
│   ├── SortingVisualizer/
│   │   ├── SortingVisualizer.jsx
│   │   ├── Pile/              # bar rendering
│   │   └── CodeDisplay/       # pseudo-code panel
│   ├── App.jsx
│   └── Visualizer.jsx
├── public/
└── vite.config.js
```

---

## Live demo

https://imagine-algo.netlify.app/

---

## Author

**Anurag Pratap Singh** · [GitHub](https://github.com/Znaxh)

## License

Open source — use with attribution.

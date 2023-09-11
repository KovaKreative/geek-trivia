import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import { useSelector } from 'react-redux';

import Home from './components/Home';
import Quiz from './components/Quiz';
import Results from './components/Results';

function App() {

  const page = useSelector(state => state.view.page);

  return (
    <main className="h-full">
      {page === "HOME" && <Home />}
      {page === "QUIZ" && <Quiz />}
      {page === "RESULT" && <Results />}
    </main>
  );
}

export default App;

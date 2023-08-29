import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import { useSelector } from 'react-redux';

import Home from './components/Home';
import Quiz from './components/Quiz';

import { goHome, goTo } from './features/views/viewSlice';

function App() {

  const page = useSelector(state => state.view.page);

  return (
    <main>
      {page === "HOME" && <Home />}
      {page === "QUIZ" && <Quiz />}
    </main>
  );
}

export default App;

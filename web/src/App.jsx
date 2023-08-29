import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import { useSelector, useDispatch } from 'react-redux';

import Home from './components/Home';

import { goHome, goTo } from './features/views/viewSlice';

function App() {

  const view = useSelector(state => state.view.page);
  const dispatch = useDispatch();

  let viewRender = <></>;

  switch (view) {
    case "HOME":
      viewRender = <Home />
      break;
  }

  return (
    viewRender
  );
}

export default App;

import './App.css';

import { useSelector } from 'react-redux';

import Home from './components/Home';
import Quiz from './components/Quiz';
import Results from './components/Results';

function App() {

  const page = useSelector(state => state.view.page);

  return (
    <main className="h-full flex flex-col items-center bg-violet-950 bg-opacity-80 rounded p-4">
      {page === "HOME" && <Home />}
      {page === "QUIZ" && <Quiz />}
      {page === "RESULT" && <Results />}
    </main>
  );
}

export default App;

import { useSelector, useDispatch } from "react-redux";

import { goHome } from "../../features/views/viewSlice";
import { resetQuiz } from "../../features/quiz/quizSlice";

import Button from "../Button";

export default function Results() {

  const dispatch = useDispatch();

  const questions = useSelector(state => state.quiz.questions);
  const correct = questions.filter(q => q.answer === q.correctAnswer).length;

  const resetGame = function() {
    dispatch(resetQuiz());
    dispatch(goHome());
  };

  const renderedResults = questions.map((q, i) => {
    const correct = q.answer === q.correctAnswer;
    return <figure key={q.id}>
      <p className="text-yellow-300 text-2xl">{i+1}: {q.question}</p>
      <p className={correct ? "text-green-300 text-3xl" : "text-red-500 text-3xl"}>You answered: {q.answer}</p>
    </figure>;
  });

  return (
    <>
      <h2 className="text-4xl text-yellow-300 font-bold mb-5">{correct} out of {questions.length}</h2>
      <h1 className="text-5xl text-yellow-300 font-bold mb-5">{Math.round(correct/questions.length*100)}% Correct</h1>
      <div className="bg-indigo-950 p-5 mb-4 flex gap-2 flex-wrap justify-center overflow-y-scroll">
        {renderedResults}
      </div>
      <footer className="w-full mb-4">
      <Button text="Play Again" onClick={resetGame} />
      </footer>
    </>
  );
}
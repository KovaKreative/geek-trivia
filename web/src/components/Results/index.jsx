import { useSelector, useDispatch } from "react-redux";

import { goHome } from "../../features/views/viewSlice";
import { resetQuiz } from "../../features/quiz/quizSlice";

import Button from "../Button";

export default function Results() {

  const dispatch = useDispatch();

  const questions = useSelector(state => state.quiz.questions);
  const correct = questions.filter(q => q.correct_answer === q.result).length;

  const resetGame = function() {
    dispatch(resetQuiz());
    dispatch(goHome());
  };

  const renderedResults = questions.map(q => {
    const correct = q.correct_answer === q.result;
    return <figure key={q.id}>
      <p className="text-yellow-300 text-2xl">{q.question}</p>
      <p className={correct ? "text-green-300 text-3xl" : "text-red-500 text-3xl"}>You answered: {q.result}</p>
    </figure>;
  });

  return (
    <>
      <h1 className="text-5xl text-yellow-300 font-bold mb-5">{correct} out of {questions.length}</h1>
      <div className="bg-indigo-950 p-5 mb-4 flex gap-2 flex-wrap justify-center content-center h-1/4">
        {renderedResults}
      </div>
      <Button text="Play Again" onClick={resetGame} />
    </>
  );
}
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import QuizButton from "../QuizButton";

export default function Quiz() {

  const round = useSelector(state => state.quiz.currentRound);
  const question = useSelector(state => state.quiz.questions[round]);
  const [answer, setAnswer] = useState(null);

  let buttons = [];

  const initializeQuestion = function(question) {
    const responses = [question.correct_answer];
    const ordered = [];
    question.wrong_answers.forEach(a => {
      responses.push(a);
    });

    while(responses.length) {
      const index = Math.floor(Math.random() * responses.length);
      ordered.push(responses.splice(index, 1)[0]);
    }

    console.log(ordered);
    buttons = ordered.map((a, i) => {
      return <QuizButton key={i} text={a} />
    })
  };

  initializeQuestion(question);

  return (
    <>
      <h1 className="text-6xl text-yellow-300 font-bold mb-5">Quiz Time!</h1>
      <p className="text-2xl text-yellow-300">{question.question}</p>
      <div className="flex gap-2 flex-wrap justify-center content-center h-1/4">
        {buttons}
      </div>
    </>
  );
}
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setButtons } from "../../features/quiz/quizSlice";

import QuizButton from "../QuizButton";

export default function Quiz() {

  const dispatch = useDispatch();

  const round = useSelector(state => state.quiz.currentRound);
  const question = useSelector(state => state.quiz.questions[round]);
  const buttonData = useSelector(state => state.quiz.buttonData);
  const [answer, setAnswer] = useState(null);

  const chooseAnswer = function(answer) {
    setAnswer(answer);
  };

  const initializeQuestion = function(question) {
    const responses = [question.correct_answer];
    const ordered = [];
    question.wrong_answers.forEach(a => {
      responses.push(a);
    });

    while (responses.length) {
      const index = Math.floor(Math.random() * responses.length);
      ordered.push(responses.splice(index, 1)[0]);
    }
    console.log(ordered);
    const data = {};
    ordered.forEach((d, i) => {
      data[i] = {
        id: i,
        text: d,
        state: "active"
      }
    });

    dispatch(setButtons(data));
  };

  useEffect(() => {
    console.log("Question:", question);
    initializeQuestion(question);
  }, [question]);

  useEffect(() => {
    console.log(answer);
  }, [answer]);


  const buttons = Object.values(buttonData).map(a => {
    return <QuizButton key={a.id} id={a.id} text={a.text} onClick={() => chooseAnswer(a.text)} state={a.state} />;
  });

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
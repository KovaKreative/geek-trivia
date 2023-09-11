import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setButtons, nextQuestion } from "../../features/quiz/quizSlice";
import { goToResults } from "../../features/views/viewSlice";

import Button from "../Button";
import QuizButton from "../QuizButton";

export default function Quiz() {

  const dispatch = useDispatch();

  const round = useSelector(state => state.quiz.currentRound);
  const question = useSelector(state => state.quiz.questions[round]);
  const totalQuestions = useSelector(state => state.quiz.questions).length;
  const buttonData = useSelector(state => state.quiz.buttonData);

  const proceedButton = () => {
    const text = "Next";
    const dispatchFuction = nextQuestion;
    if (round >= totalQuestions) {
      text = "See Results";
      dispatchFuction = goToResults;
    }
    return <Button
      text={text}
      onClick={() => dispatch(dispatchFuction())}
    />;
  };

  const initializeQuestion = function(q) {
    const responses = [q.correct_answer];
    const ordered = [];
    q.wrong_answers.forEach(a => {
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
      };
    });
    dispatch(setButtons(data));
  };

  useEffect(() => {
    console.log("Question:", question);
    initializeQuestion(question);
  }, [round]);

  const buttons = Object.values(buttonData).map(a => {
    return <QuizButton key={a.id} id={a.id} text={a.text} state={a.state} />;
  });

  return (
    <>
      <h1 className="text-6xl text-yellow-300 font-bold mb-5">Quiz Time!</h1>
      <p className="text-2xl text-yellow-300 mb-4">{question.question}</p>
      <div className="mb-4 flex gap-2 flex-wrap justify-center content-center h-1/4">
        {buttons}
      </div>
      {question.result && proceedButton()}
    </>
  );
}
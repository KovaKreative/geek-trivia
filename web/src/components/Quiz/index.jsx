import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
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

  const initializeQuestion = function(q) {
    const data = {};
    q.choices.forEach((d, i) => {
      data[i] = {
        id: i,
        text: d,
        state: "active"
      };
    });
    dispatch(setButtons(data));
  };

  useEffect(() => {
    initializeQuestion(question);
  }, [round]);

  const buttons = Object.values(buttonData).map(a => {
    return <QuizButton key={a.id} id={a.id} text={a.text} state={a.state} />;
  });

  return (
    <>
      <h1 className="text-5xl text-yellow-300 font-bold mb-5">{`Question ${round + 1} out of ${totalQuestions}`}</h1>
      <p className="text-2xl text-yellow-300 mb-4">{question.question}</p>
      <div className="mb-4 flex gap-2 flex-wrap justify-center content-center h-1/4">
        {buttons}
      </div>
      {!!question.answer && <Button
        text={round + 1 < totalQuestions ? "Next" : "See Results"}
        onClick={round + 1 < totalQuestions ? () => dispatch(nextQuestion()) : () => dispatch(goToResults())}
      />}
    </>
  );
}
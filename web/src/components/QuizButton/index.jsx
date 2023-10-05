import { useSelector, useDispatch } from 'react-redux';

import { selectAnswer } from '../../features/quiz/quizSlice';

import classnames from 'classnames';

export default function QuizButton(props) {
  const dispatch = useDispatch();
  const buttonData = useSelector(state => state.quiz.buttonData[props.id]);

  const quizButtonClass = classnames(
    "p-2 text-wrap w-2/5 h-2/5 rounded-xl text-2xl font-bold transition",
    {
      "bg-yellow-200 hover:bg-yellow-100 text-purple-700 active:bg-yellow-400 hover:text-purple-500 active:text-purple-700 focus:outline-none focus:ring-4 focus:ring-yellow-500": buttonData.state === "active",
      "bg-gray-400 text-gray-600 cursor-not-allowed": buttonData.state === "inactive",
      "bg-blue-300 text-blue-700 cursor-not-allowed": buttonData.state === "chosen",
      "bg-red-600 text-red-200 cursor-not-allowed": buttonData.state === "incorrect",
      "bg-green-600 text-green-200 cursor-not-allowed": buttonData.state === "correct",
    }
  );

  return (
    <button
      className={quizButtonClass}
      onClick={() => {
        if(buttonData.state === "active") {
          dispatch(selectAnswer(buttonData.id));
        }
      }}
      disabled={props.disabled}
      text={props.text}
    >
      {props.text || 'Button'}
    </button>
  );
}
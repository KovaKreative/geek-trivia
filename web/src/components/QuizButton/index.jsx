import { useState } from 'react';

import classnames from 'classnames';

export default function QuizButton(props) {

  const [state, setState] = useState(props.initialState || "active");

  const quizButtonClass = classnames(
    "p-2 min-w-fit w-1/3 h-1/4 rounded-xl text-2xl font-bold transition",
    {
      "bg-yellow-200 hover:bg-yellow-100 text-purple-700 active:bg-yellow-400 hover:text-purple-500 active:text-purple-700 focus:outline-none focus:ring-4 focus:ring-yellow-500": state === "active",
      "bg-yellow-200 text-purple-700 cursor-not-allowed": state === "inactive",
      "bg-orange-300 text-purple-700 cursor-not-allowed": state === "chosen",
      "bg-red-600 text-red-200 cursor-not-allowed": state === "incorrect",
      "bg-green-600 text-green-200 cursor-not-allowed": state === "correct",
    }
  );

  return (
    <button
      className={quizButtonClass}
      onClick={props.changeState}
      disabled={props.disabled}
      text={props.text}
    >
      {props.text || 'Button'}
    </button>
  );
}
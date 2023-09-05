import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { chooseCategory, setCategories } from "../../features/quiz/quizSlice";
import { goTo } from "../../features/views/viewSlice";

import axios from 'axios';

import Button from "../Button";
import Loader from "../Loader";

export default function CategoryMenu() {

  const categories = useSelector(state => state.quiz.categories);

  const [questions, setQuestions] = useState(0);

  const dispatch = useDispatch();

  const selectCategory = function(cat, val) {
    dispatch(chooseCategory({ ...cat, selected: val }));
  };

  const goToQuiz = function() {
    dispatch(goTo("QUIZ"));
  };

  useEffect(() => {
    // Get categories from server
    if (!categories.length) {
      axios.get('/quiz/')
        .then(res => {
          const results = { ...res.data };
          for (const cat in results) {
            results[cat].selected = categories[cat]?.selected || false;
          }
          dispatch(setCategories(results));
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    const sum = Object.values(categories).reduce((accumulator, cat) => {
      if (cat.selected) {
        return accumulator + cat.questions.length;
      }
      return accumulator;
    }, 0);
    let questions = [];
    for (const id in categories) {
      if (!categories[id].selected) {
        continue;
      }
      const newQuestions = categories[id].questions.filter(q => !questions.includes(q));
      questions.push(...newQuestions);
    }
    setQuestions(questions.length);
  }, [categories]);

  const quizOptions = Object.values(categories).map((cat, i) => {
    return (
      <div key={i} className="text-yellow-200 text-2xl text-left flex">
        <input
          name={cat.category}
          type="checkbox"
          className="rounded py-3 p-3 m-3 place-self-center cursor-pointer focus:ring-4 focus:ring-yellow-500 bg-yellow-100 accent-yellow-800 checked:focus:bg-yellow-700 checked:hover:bg-yellow-700 checked:bg-yellow-600"
          value={cat.selected}
          onChange={(e) => selectCategory(cat, e.target.checked)}
        />
        <label htmlFor={cat.category}>{cat.category}<br />{`(${cat.questions.length} Question${cat.questions.length == 1 ? '' : 's'})`}</label>
      </div>
    );
  });

  return (
    <section className="CategoryMenu text-yellow-300 text-xl">
      <p>Choose your categories. The question pool must total 10 or more.</p>
      {
        !Object.values(categories).length
          ?
          <Loader />
          :
          <form>
            <div className="flex flex-wrap justify-around mb-4">
              {quizOptions}
            </div>
            <Button
              title={questions < 10 ? "Choose categories that toal to 10 distinct questions" : "Click to start your quiz"}
              disabled={questions < 10}
              text={questions >= 10 ? `Start Quiz (${questions} questions)` : `(${questions} questions)`}
              onClick={goToQuiz}
            />
          </form>
      }
    </section>
  );
}
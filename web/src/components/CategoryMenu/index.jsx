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

  const selectCategory = function(id, val) {
    dispatch(chooseCategory({ id, selected: val }));
  };

  const goToQuiz = function(cat) {
    dispatch(chooseCategories(cat));
    dispatch(goTo("QUIZ"));
  };

  useEffect(() => {
    // Get categories from server
    if (!categories.length) {
      axios.get('/quiz/')
        .then(res => {
          const categories = {};
          res.data.forEach(e => {
            categories[e.id] = {
              id: e.id, category: e.category, num_of_questions: Number(e.num_of_questions), selected: false
            };
          });
          dispatch(setCategories(categories));
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    const sum = Object.values(categories).reduce((accumulator, cat) => {
      console.log(accumulator, cat);
      if (cat.selected) {
        return accumulator + cat.num_of_questions;
      }
      return accumulator;
    }, 0);
    console.log(sum);
    setQuestions(sum);
  }, [categories]);

  const quizOptions = Object.values(categories).map((cat, i) => {
    return (
      <div key={i} className="text-yellow-200 text-2xl">
        <input
          name={cat.category}
          type="checkbox"
          className="rounded py-3 p-3 m-3 cursor-pointer focus:ring-4 focus:ring-yellow-500 bg-yellow-100 accent-yellow-800 checked:focus:bg-yellow-700 checked:hover:bg-yellow-700 checked:bg-yellow-600"
          value={cat.num_of_questions}
          onChange={(e) => selectCategory(cat.id, e.target.checked)}
        />
        <label htmlFor={cat.category}>{cat.category}{` (${cat.num_of_questions} Question${cat.num_of_questions == 1 ? '' : 's'})`}</label>
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
            <div className="flex justify-around mb-4">
              {quizOptions}
            </div>
            <Button text={questions >= 10 ? `Start Quiz (${questions} questions)` : 'Select your categories'} onClick={() => goToQuiz(chosenCategories)} />
          </form>
      }
    </section>
  );
}
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { chooseCategory, setCategories, setQuiz } from "../../features/quiz/quizSlice";
import { goTo } from "../../features/views/viewSlice";

import axios from 'axios';

import Button from "../Button";
import Loader from "../Loader";

export default function CategoryMenu() {

  const categories = useSelector(state => state.quiz.categories);

  const [questions, setQuestions] = useState(0);

  const [loading, setLoading] = useState(true); 

  const [questionLimit, setMaxQuestions] = useState(3);

  const dispatch = useDispatch();

  const selectCategory = function(cat, val) {
    dispatch(chooseCategory({ ...cat, selected: val }));
  };

  const goToQuiz = function() {
    // Filter selected categories and store their IDs for the backend request
    const IDs = Object.values(categories).filter(cat => cat.selected).map(cat => cat.id);

    axios.post(`/quiz/`, {
      categories: [...IDs], limit: questionLimit
    })
      .then(res => {
        if (!res.data.success) {
          return console.log(res.data.err);
        }
        const results = res.data.results;
        console.log(results);
        dispatch(setQuiz(results));
        dispatch(goTo("QUIZ"));
      })
      .catch(err => {
        console.log(err);
      });
    setLoading(true);

  };

  useEffect(() => {
    // Get categories from server
    if (!categories.length) {
      axios.get('/quiz/')
        .then(res => {
          if (!res.data.success) {
            return console.log(res.data.err);
          }
          const results = { ...res.data.results };
          for (const cat in results) {
            results[cat].selected = categories[cat]?.selected || false;
          }
          dispatch(setCategories(results));
          setLoading(false);
        })
        .catch(err => {
          console.log(err.message);
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
      loading
      ?
      <Loader />
      :
      <section className="CategoryMenu text-yellow-300 text-xl">
        <form>
          <p className="text-3xl">Choose your categories. The question pool must total {questionLimit} or more.</p>
          <p className="text-sm">Note: Some questions may overlap several categories and the total number of questions in the end may be lower than the sum of each individual category.</p>
          <div className="flex flex-wrap justify-around mb-4">
            {quizOptions}
          </div>
          <label htmlFor="total">Total questions: </label>
          <input className="rounded bg-purple-950 py-0 h-11 mb-4" type="number" name="total" value={questionLimit} min="3" max="20" onChange={e => setMaxQuestions(e.target.value)}></input>
          <br/>
          <Button
            disabled={questions < questionLimit}
            text={questions >= questionLimit ? `Start Quiz (${questions} questions)` : `(${questions} questions)`}
            onClick={goToQuiz}
          />
        </form>
      </section>
  );
}
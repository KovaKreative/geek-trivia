import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { chooseCategory, setCategories, setQuiz } from "../../features/quiz/quizSlice";
import { goTo } from "../../features/views/viewSlice";

import axios from 'axios';

import Button from "../Button";
import Loader from "../Loader";

export default function CategoryMenu() {
  const questionLimits = {
    min: 3,
    max: 20
  };

  const categories = useSelector(state => state.quiz.categories);

  const [questions, setQuestions] = useState(0);

  const [loading, setLoading] = useState(true);

  const [questionLimit, setMaxQuestions] = useState(10);

  const dispatch = useDispatch();

  const selectCategory = function(cat, val) {
    dispatch(chooseCategory({ ...cat, selected: val }));
  };

  const shuffleArray = function(a) {
    let array = [...a];
    let currentIndex = array.length, randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex--);
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  };

  const parseResults = function(results) {
    const formattedQuestions = results.map(r => {
      const formattedQuestion = {
        id: r.id,
        question: r.question,
        correctAnswer: r.correct_answer,
        choices: shuffleArray([r.correct_answer, ...r.wrong_answers.split('::')]),
        answer: null
      };

      return formattedQuestion;
    });
    return formattedQuestions;
  };

  const goToQuiz = function() {
    // Filter selected categories and store their IDs for the backend request
    const IDs = Object.values(categories).filter(cat => cat.selected).map(cat => cat.id);
    axios.get(`/quiz/`, { params: { categories: IDs, limit: questionLimit } })
      .then(res => {
        if (!res.data.success) {
          return console.log("Serverside Error:", res.data.err);
        }
        const quizQuestions = parseResults(res.data.results);
        dispatch(setQuiz(quizQuestions));
        dispatch(goTo("QUIZ"));
      })
      .catch(err => {
        console.log("Error:", err.message);
      });
    setLoading(true);
  };

  useEffect(() => {
    // Get categories from server
    if (!categories.length) {
      axios.get('/categories/')
        .then(res => {
          if (!res.data.success) {
            return console.log("Serverside Error:", res.data.err);
          }
          const results = {};

          res.data.results.forEach(r => {
            const id = r.id;
            results[id] = { ...r, questions: r.questions.split("::"), selected: categories[id]?.selected || false };
          });
          dispatch(setCategories(results));
          setLoading(false);
        })
        .catch(err => {
          console.log("Error:", err.message);
        });
    }
  }, []);

  useEffect(() => {
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
      <div key={cat.id} className="text-yellow-200 md:text-2xl text-left flex">
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
      <section className="CategoryMenu text-yellow-300 text-xl container">
        <form>
          <p className="text-3xl">Choose your categories. The question pool must total {questionLimit} or more.</p>
          <p className="text-sm mb-4">Note: Some questions may overlap several categories and the total number of questions in the end may be lower than the sum of each individual category.</p>
          <div className="flex flex-wrap justify-around mb-4">
            {quizOptions}
          </div>
          <div className="h-11 flex justify-center">
            <label className="mr-3 h-fit self-center" htmlFor="total">Total questions (between {questionLimits.min} and {questionLimits.max}): </label>
            <button className="h-full w-12 bg-yellow-300 hover:bg-yellow-200 active:bg-yellow-400 text-xl rounded-l transition" onClick={e => { e.preventDefault(); setMaxQuestions(prev => Math.max(questionLimits.min, prev - 1)); }}>➖</button>
            <input className="no-spinner bg-purple-950 py-0 h-full w-12 text-center text-xl" type="number" name="total" value={questionLimit} min="3" max="20" onBlur={() => setMaxQuestions(prev => Math.min(Math.max(questionLimits.min, prev), questionLimits.max))} onChange={e => setMaxQuestions(prev => Math.min(e.target.value, 20))}></input>
            <button className="h-full w-12 bg-yellow-300 hover:bg-yellow-200 active:bg-yellow-400 text-xl rounded-r transition" onClick={e => { e.preventDefault(); setMaxQuestions(prev => Math.min(questionLimits.max, prev + 1)); }}>➕</button>
          </div>
          <br />
          <Button
            disabled={questions < questionLimit || questionLimit <= 0}
            text={questions >= questionLimit ? `Start Quiz` : `(${questions}/${questionLimit} questions)`}
            onClick={goToQuiz}
          />
        </form>
      </section>
  );
}
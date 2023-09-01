import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { chooseCategories, setCategories } from "../../features/quiz/quizSlice";
import { goTo } from "../../features/views/viewSlice";

import axios from 'axios';

import Button from "../Button";
import Loader from "../Loader";

export default function CategoryMenu() {

  const categories = useSelector(state => state.quiz.categories);

  const dispatch = useDispatch();

  const goToQuiz = function(cat) {
    dispatch(chooseCategories(cat));
    dispatch(goTo("QUIZ"));
  };

  useEffect(() => {
    // Get categories from server
    if (!categories.length) {
      axios.get('/quiz/')
        .then(res => {
          dispatch(setCategories(res.data));
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  const quizOptions = categories.map((cat, i) => {
    return (
      <div key={i} className="text-yellow-200 text-xl">
        <input name={cat.category} type="checkbox" />
        <label for={cat.category}>{cat.category}</label>
      </div>
    );
  });

  return (
    <section className="CategoryMenu">
      {!categories.length ? <Loader />
        :
        <form>
          {quizOptions}
          <Button text="Start Quiz" onClick={() => goToQuiz(chosenCategories)} />
        </form>
      }
    </section>
  );
}
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setCategories } from "../../features/quiz/quizSlice";

import CategoryMenu from "../CategoryMenu";
import Loader from "../Loader";

import axios from 'axios';

export default function Home() {

  const dispatch = useDispatch();

  const categoriesState = useSelector(state => state.quiz.categories);

  useEffect(() => {
    console.log(categoriesState);
  }, [categoriesState]);

  useEffect(() => {
    // Get categories from server
    if (!categoriesState.length) {
      axios.get('http://localhost:3000/quiz/',
        {
          proxy: {
            host: 'http://localhost',
            port: '3000'
          }
        })
        .then(res => {
          dispatch(setCategories(res.data));
        });
    }
  }, []);

  return (
    <section className="Home">
      <h1 className="text-6xl text-yellow-300 font-bold mb-5">KovaKreative Geek Trivia Quiz</h1>
      {categoriesState.length ? <CategoryMenu /> : <Loader />}
    </section>
  );
}
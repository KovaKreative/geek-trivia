import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { setCategory } from "../../features/quiz/quizSlice";
import { goTo } from "../../features/views/viewSlice";

import Button from "../Button";

import axios from "axios";

export default function Home() {

  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();

  const goToQuiz = function(id) {
    dispatch(setCategory(id));
    dispatch(goTo("QUIZ"));
  };

  useEffect(() => {
    // Get quiz from server
    if (!categories.length) {
      axios.get('http://localhost:3000/quiz/',
        {
          proxy: {
            host: 'http://localhost',
            port: '3000'
          }
        })
        .then(res => {
          setCategories(res.data);
        });
    }
  }, []);

  const quizButtons = categories.map((cat, i) => {
    return <Button text={cat.category} key={i} onClick={() => goToQuiz(cat.id)}></Button>;
  });

  return (
    <section className="Home">
      <h1 className="text-6xl text-yellow-300 font-bold mb-5">KovaKreative Geek Trivia Quiz</h1>
      {quizButtons}
    </section>
  );
}
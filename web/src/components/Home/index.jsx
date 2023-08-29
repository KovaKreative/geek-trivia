import { useEffect, useState } from "react";
import Button from "../Button";

import axios from "axios";

export default function Home() {

  const [categories, setCategories] = useState([]);

  const goToQuiz = function(id) {
    console.log("Go to quiz " + id);
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
    <main>
      <h1 className="text-6xl text-yellow-300 font-bold mb-5">KovaKreative Geek Trivia Quiz</h1>
      {quizButtons}
    </main>
  );
}
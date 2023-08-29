import { useEffect } from "react";
import Button from "../Button";

import axios from "axios";

export default function Home() {

  useEffect(() => {
    axios.get('/')
      .then(res => {
        console.log(res);
      });
  }, []);

  return (
    <main>
      <h1 className="text-6xl text-yellow-300 font-bold mb-5">KovaKreative Geek Trivia Quiz</h1>
      <Button text="Play" />
    </main>
  );
}
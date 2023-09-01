import CategoryMenu from "../CategoryMenu";

import { useSelector } from "react-redux";

export default function Home() {

  const categories = useSelector(state => state.quiz.categories);

  return (
    <section className="Home">
      <h1 className="text-6xl text-yellow-300 font-bold mb-5">KovaKreative Geek Trivia Quiz</h1>
      <CategoryMenu />
    </section>
  );
}
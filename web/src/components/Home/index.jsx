import CategoryMenu from "../CategoryMenu";

export default function Home() {

  return (
    <section className="Home">
      <h1 className="text-4xl md:text-6xl text-yellow-300 font-bold mb-5">KovaKreative Geek Trivia Quiz</h1>
      <CategoryMenu />
    </section>
  );
}
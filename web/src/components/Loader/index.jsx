import './Loader.css';

export default function Loader() {
  return (
    <section className="Loader flex flex-col justify-center items-center w-full">
      <h1 className="text-3xl mb-3 text-yellow-300">Loading...</h1>
      <div className="loader"></div>
    </section>
  )
}
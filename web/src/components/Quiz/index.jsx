import axios from "axios";
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import Loader from "../Loader";

export default function Quiz() {

  // const chosenCategories = useSelector(state => state.quiz.categories);

  // useEffect(() => {
  //   if (chosenCategories) {
  //     axios.post(`/quiz/`)
  //       .then(res => {
  //         console.log(res.data);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   }
  // }, [chosenCategories]);

  return (
    <>
      <h1 className="text-6xl text-yellow-300 font-bold mb-5">Quiz Time!</h1>
    </>
  );
}
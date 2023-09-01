import { useSelector, useDispatch } from 'react-redux';
import { setCategory } from "../../features/quiz/quizSlice";
import { goTo } from "../../features/views/viewSlice";

import Button from "../Button";

export default function CategoryMenu() {

  const categoriesState = useSelector(state => state.quiz.categories);

  const dispatch = useDispatch();

  const goToQuiz = function(id) {
    dispatch(setCategory(id));
    dispatch(goTo("QUIZ"));
  };



  const quizButtons = categoriesState.map((cat, i) => {
    return <Button text={cat.category} key={i} onClick={() => goToQuiz(cat.id)}></Button>;
  });

  return (
    <section className="CategoryMenu">
      {quizButtons}
    </section>
  );
}
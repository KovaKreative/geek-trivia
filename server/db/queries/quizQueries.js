import db from '../connection.js';

const getQuizCategories = () => {
  // Only selects categories that have corresponding questions
  return db.query(`
    SELECT questions.id as question, category, categories.id as id FROM categories
    JOIN questions_categories ON categories.id = questions_categories.category_id
    JOIN questions ON questions.id = questions_categories.question_id
    ORDER BY category, categories.id;
  `)
    .then(results => {
      return results.rows;
    });
};

const getQuizQuestions = (IDs) => {
  const insert = IDs.map((id, index) => {
    return `questions_categories.category_id = $${index + 1}`
  }).join(' OR ');
  const query = `SELECT questions.id, questions.question, questions.correct_answer, questions.wrong_answers FROM questions
  JOIN questions_categories ON questions.id = questions_categories.question_id
  WHERE ${insert}
  GROUP by questions.id`
  console.log(query);
  return db.query(query, [...IDs])
    .then(results => {
      return results.rows;
    });
};

export { getQuizCategories, getQuizQuestions };
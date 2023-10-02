import db from '../connection.js';

const getQuizCategories = () => {
  // Only selects categories that have corresponding questions
  return db.query(`
    SELECT string_agg(questions.id::VARCHAR, '::') as questions, category, categories.id as id FROM categories
    JOIN questions_categories ON categories.id = questions_categories.category_id
    JOIN questions ON questions.id = questions_categories.question_id
    GROUP BY categories.id
    ORDER BY category, categories.id;
  `)
    .then(results => {
      return results.rows;
    })
    .catch(err => {
      console.log(err);
    });
};

const getQuizQuestions = (IDs, limit) => {
  const insert = IDs.map((id, index) => {
    return `questions_categories.category_id = $${index + 1}`;
  }).join(' OR ');
  // const query = `SELECT questions.id, questions.question, questions.answer as correct_answer, string_agg(wrong_answer, '::') as wrong_answers
  // FROM questions
  // JOIN wrong_answers ON wrong_answers.question_id = questions.id
  // JOIN questions_categories ON questions.id = questions_categories.question_id
  // WHERE ${insert}
  // GROUP BY questions.id
  // ORDER BY random()
  // LIMIT $${IDs.length + 1}`;
  const query = `WITH q AS
  (SELECT questions.id, questions.question, questions.answer as correct_answer
  FROM questions
  JOIN questions_categories ON questions.id = questions_categories.question_id
  WHERE ${insert}
  GROUP BY questions.id)
  SELECT q.*, string_agg(wrong_answer, '::') as wrong_answers
  FROM q
  JOIN wrong_answers ON wrong_answers.question_id = q.id
  GROUP BY q.id, q.question, q.correct_answer
  LIMIT $${IDs.length + 1}`;

  return db.query(query, [...IDs, limit])
    .then(results => {
      return results.rows;
    })
    .catch(err => {
      console.log(err);
    });
};

export { getQuizCategories, getQuizQuestions };
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

const getQuizQuestions = (id) => {
  // return db.query()
};

export { getQuizCategories };
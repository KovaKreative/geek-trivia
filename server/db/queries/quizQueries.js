import db from '../connection.js';

const getQuizCategories = () => {
  // Only selects categories that have corresponding questions
  return db.query(`
    SELECT COUNT(questions.id) as num_of_questions, category, categories.id as id FROM categories
    JOIN questions_categories ON categories.id = questions_categories.category_id
    JOIN questions ON questions.id = questions_categories.question_id
    GROUP BY category, categories.id;
  `)
    .then(results => {
      const filteredResults = results.rows.filter(category => category.num_of_questions > 10);
      return filteredResults;
    });
};

export { getQuizCategories };
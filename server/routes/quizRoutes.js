import express from 'express';

import { getQuizCategories, getQuizQuestions } from '../db/queries/quizQueries.js';

const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.params);
  getQuizCategories()
    .then(result => {
      const formattedResults = {};
      result.forEach(r => {
        if (formattedResults.hasOwnProperty(r.id)) {
          return formattedResults[r.id].questions.push(r.question);
        }
        formattedResults[r.id] = {
          id: r.id,
          category: r.category,
          questions: [r.question]
        };
      });
      res.json({ success: true, results: formattedResults });
    })
    .catch(err => {
      res.json({ success: false, err });
    });
});

router.post('/', (req, res) => {
  console.log(req.body);
  getQuizQuestions(req.body.categories, req.body.limit)
    .then(results => {
      console.log(results);
      res.json({ success: true, results });
    })
    .catch(err => {
      res.json({ success: false, err });
    });
});

export default router;
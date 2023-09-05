import express from 'express';

import { getQuizCategories } from '../db/queries/quizQueries.js';

const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.params);
  getQuizCategories()
    .then(result => {
      const formattedResults = {};
      result.forEach(r => {
        if(formattedResults.hasOwnProperty(r.id)) {
          return formattedResults[r.id].questions.push(r.question);
        }
        formattedResults[r.id] = {
          id: r.id,
          category: r.category,
          questions: [r.question]
        }
      });
      res.json(formattedResults);
    });
});

router.post('/', (req, res) => {
  console.log(req.body);
  res.json({ success: true });
});

export default router;
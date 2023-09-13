import express from 'express';

import { getQuizCategories, getQuizQuestions } from '../db/queries/quizQueries.js';

const router = express.Router();

router.get('/categories/', (req, res) => {
  console.log(req.params);
  getQuizCategories()
    .then(results => {
      console.log(results);
      res.json({ success: true, results });
    })
    .catch(err => {
      res.json({ success: false, err });
    });
});

router.get('/quiz/*', (req, res) => {
  console.log(req.query);
  getQuizQuestions(req.query.categories, req.query.limit)
    .then(results => {
      console.log(results);
      res.json({ success: true, results });
    })
    .catch(err => {
      res.json({ success: false, err });
    });
});

export default router;
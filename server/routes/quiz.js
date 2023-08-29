import express from 'express';

import { getQuizCategories } from '../db/queries/quizQueries.js';

const router = express.Router();

router.get('/', (req, res) => {
  getQuizCategories()
    .then(result => {
      console.log(result);
      res.json(result);
    });
});

export default router;
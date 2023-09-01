import express from 'express';

import { getQuizCategories } from '../db/queries/quizQueries.js';

const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.params);
  getQuizCategories()
    .then(result => {
      console.log(result);
      res.json(result);
    });
});

router.get('/:id', (req, res) => {
  console.log("Param exists");
  console.log(req.params.id.split(','));
  res.json({ success: true });
});

export default router;
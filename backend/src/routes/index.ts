import * as express from 'express';

const router = express.Router();

router.get('/scales', (req, res) => {
  res.send(['sfs', 'sdf']);
});

export default router;

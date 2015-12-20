'use strict';
const router  = require('express').Router();

router.get('/', (req, res, next) => {
  res.send('I am /api');
});

module.exports = router;

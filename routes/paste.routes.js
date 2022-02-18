const express = require('express');

const router = express.Router();

/* GET paste. */
router.get('/', (req, res) => {
  res.send('Test');
});

module.exports = router;

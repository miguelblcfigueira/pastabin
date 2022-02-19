const express = require('express');
const pasteController = require('../controllers/paste.controllers');

const router = express.Router();

/* GET paste. */
router.get('/:id', pasteController.getPaste);

module.exports = router;

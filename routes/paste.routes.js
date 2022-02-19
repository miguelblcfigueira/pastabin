const express = require('express');
const pasteController = require('../controllers/paste.controllers');

const router = express.Router();

/* POST new paste. */
router.post('/', pasteController.createPaste);

module.exports = router;

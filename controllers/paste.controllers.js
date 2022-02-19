const { generatePasteId } = require('../lib/pasteIdGenerator');
const { Paste } = require('../models');

const PASTE_DURATION = 15 * 60;

exports.createPaste = async (req, res) => {
  const { data } = req.body;

  const id = generatePasteId();
  const expiresAt = new Date(Date.now() + PASTE_DURATION * 1000);
  try {
    await Paste.create({
      id,
      data,
      expiresAt,
    });
    res.status(200).json({ id });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};

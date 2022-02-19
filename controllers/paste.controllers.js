const { generatePasteId } = require('../lib/pasteIdGenerator');
const { Paste } = require('../models');

const PASTE_DURATION = 15 * 60;

exports.getPaste = async (req, res) => {
  const { id } = req.params;

  const now = Date.now();
  try {
    const paste = await Paste.findByPk(id);

    if (!paste) {
      console.log(`Paste with id ${id} does not exist or was deleted.`);
      res.status(404).end();
      return;
    }

    const expiration = new Date(paste.expiresAt);
    if (expiration < now) {
      console.log(`Paste with id ${id} has already expired`);
      res.status(404).end();
      return;
    }
    const { data, expiresAt } = paste;
    res.status(200).json({ id, data, expiresAt });
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};

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

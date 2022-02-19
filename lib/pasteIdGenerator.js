const ID_SIZE = 8;

const generatePasteId = () => {
  const allowedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const result = Array
    .from(
      { length: ID_SIZE },
      () => Math.floor(Math.random() * allowedChars.length),
    )
    .map((charIdx) => allowedChars.charAt(charIdx))
    .join('');
  return result;
};

exports.generatePasteId = generatePasteId;

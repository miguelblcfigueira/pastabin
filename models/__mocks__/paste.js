const Paste = jest.createMockFromModule('../paste');

let Pastes = {};

/** Mock create method of Model. */
const create = (paste) => {
  const { id } = paste;
  Pastes[id] = paste;
};

/** Mock findByPk method of Model. */
const findByPk = (id) => (Pastes[id]);

/** Reset Pastes. */
const __reset = () => {
  Pastes = {};
};

/** Add Paste. */
const __add = (paste) => {
  create(paste);
};

Paste.create = create;
Paste.__reset = __reset;
Paste.__add = __add;
Paste.findByPk = findByPk;

module.exports = Paste;

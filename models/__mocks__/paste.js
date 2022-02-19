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
const reset = () => {
  Pastes = {};
};

Paste.create = create;
Paste.reset = reset;
Paste.findByPk = findByPk;

module.exports = Paste;

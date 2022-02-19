const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Paste extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Paste.init({
    id: { type: DataTypes.STRING, primaryKey: true },
    data: DataTypes.TEXT,
    expiresAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Paste',
  });
  return Paste;
};

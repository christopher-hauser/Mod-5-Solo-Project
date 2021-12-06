'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  Image.associate = function(models) {
    Image.belongsTo(models.User, {foreignKey: 'userId'})
    Image.belongsTo(models.User, {foreignKey: 'spotId'})
  };
  return Image;
};

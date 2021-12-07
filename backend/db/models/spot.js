'use strict';

module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define('Spot', {
    hostId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pricePerNight: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    beds: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bathrooms: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amenities: {
      type: DataTypes.STRING(300),
    },
    rating: {
      type: DataTypes.INTEGER
    },
    profileImg: {
      type: DataTypes.STRING(1000),
    }
  }, {});

  Spot.associate = function(models) {
    Spot.belongsTo(models.User, {foreignKey: 'hostId'})
    Spot.hasMany(models.Booking, {foreignKey: 'spotId'})
    Spot.hasMany(models.Image, {foreignKey: 'spotId'})
  };

  return Spot;
};

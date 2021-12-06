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
      validate: {
        len: [3, 256]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 50]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 2]
      }
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
    }
  }, {});

  Spot.associate = function(models) {
    Spot.belongsTo(models.User, {foreignKey: 'userId'})
    Spot.hasMany(models.Booking, {foreignKey: 'spotId'})
    Spot.hasMany(models.Image, {foreignKey: 'spotId'})
  };
  return Spot;
};

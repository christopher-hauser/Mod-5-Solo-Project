'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    guestId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    numberOfGuests: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {});

  Booking.associate = function(models) {
    Booking.belongsTo(models.User, {foreignKey: 'guestId'})
    Booking.belongsTo(models.Spot, {foreignKey: 'spotId'})
    Booking.hasMany(models.Review, {foreignKey: 'bookingId'})
  };
  return Booking;
};

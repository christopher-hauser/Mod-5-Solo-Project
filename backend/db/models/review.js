'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    guestId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userRating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userReview: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.User, {foreignKey: 'userId'})
    Review.belongsTo(models.Spot, {foreignKey: 'spotId'})
    Review.belongsTo(models.Booking, {foreignKey: 'bookingId'})
  };
  return Review;
};

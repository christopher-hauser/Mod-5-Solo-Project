'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      guestId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Users'}
      },
      spotId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Spots'}
      },
      bookingId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Bookings'}
      },
      userRating: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      userReview: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Reviews');
  }
};

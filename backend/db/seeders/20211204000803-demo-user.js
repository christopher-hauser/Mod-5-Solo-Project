'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'demo@user.io',
      username: 'Demo',
      firstName: 'Demo',
      lastName: 'User',
      hashedPassword: bcrypt.hashSync('password')
    },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo User'] }
    }, {});
  }
};

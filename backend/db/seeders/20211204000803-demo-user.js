'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'Demo',
      firstName: 'Demo',
      lastName: 'User',
      email: 'demo@user.io',
      hashedPassword: bcrypt.hashSync('password'),
      host: true,
      profileImg: 'https://st4.depositphotos.com/1000507/24488/v/600/depositphotos_244889634-stock-illustration-user-profile-picture-isolate-background.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'FakeUser',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@user.io',
      hashedPassword: bcrypt.hashSync('password'),
      host: true,
      profileImg: 'https://st4.depositphotos.com/1000507/24488/v/600/depositphotos_244889634-stock-illustration-user-profile-picture-isolate-background.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo', 'FakeUser'] }
    }, {});
  }
};

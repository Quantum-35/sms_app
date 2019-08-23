'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const encPassword = bcrypt.hashSync('HardPassword', 8);
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
      return queryInterface.bulkInsert('Users', [{
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@gmail.com',
        verified: true,
        password: 'HardPassword',
        username: 'John',
        bio: 'Code lover',
        gender: 'Male',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        firstName: 'Test',
        lastName: 'Doe',
        email: 'testdoe@gmail.com',
        verified: true,
        password: encPassword,
        username: 'testUser',
        bio: 'Code lover',
        gender: 'Male',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        firstName: 'test2',
        lastName: 'test',
        email: 'test2test@gmail.com',
        verified: false,
        password: 'HardPassword',
        username: 'test2',
        bio: 'Code lover',
        gender: 'Male',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};

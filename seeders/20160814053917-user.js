'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
    {
      "username": "blank_something",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      "username": "holy_moly",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      "username": "patty_cake",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      "username": "mew_mew",
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      "username": "shambalah",
      createdAt: new Date(),
      updatedAt: new Date()
    }],{
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users');
  }
};

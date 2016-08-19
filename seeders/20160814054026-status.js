'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Statuses', [
    {
      "name": "URGENT",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      "name": "LOW",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      "name": "MEDIUM",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      "name": "BLOCKER",
      createdAt: new Date(),
      updatedAt: new Date()
    }],{
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Statuses');
  }
};

'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Statuses', [
    {
      "name": "Queue",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      "name": "Progress",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      "name": "Done",
      createdAt: new Date(),
      updatedAt: new Date()
    }],{
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Statuses');
  }
};

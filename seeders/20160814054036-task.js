'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Tasks', [
    {
      "title": "KANBAN",
      "description": "Finish this on time...",
      "createdBy": "blank_something",
      "assignedTo": "something",
      "priority": "4",
      createdAt: new Date(),
      updatedAt: new Date(),
    }],{
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tasks');
  }
};

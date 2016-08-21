'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Tasks', [
    {
      "title": "KANBAN",
      "description": "Finish this on time...",
      "user_id": 1,
      "status_id": 2,
      "assignedTo": "something",
      "priority": "4",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      "title": "This is a Test",
      "description": "This is another test...",
      "user_id": 2,
      "status_id": 3,
      "assignedTo": "noo",
      "priority": "2",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      "title": "Another One Bites The Dust",
      "description": "Puhleeeez work, pretty please.",
      "user_id": 3,
      "assignedTo": "youu",
      "priority": "5",
      createdAt: new Date(),
      updatedAt: new Date() 
    }],{
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tasks');
  }
};

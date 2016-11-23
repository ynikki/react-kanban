'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Tasks', [
    {
      "title": "KANBAN",
      "description": "Finish this on time...",
      "createdBy": 1,
      "status_id": 2,
      "user_id": 1,
      "priority": "4",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      "title": "This is a Test",
      "description": "This is another test...",
      "createdBy": 2,
      "status_id": 1,
      "user_id": 2,
      "priority": "2",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      "title": "Another One Bites The Dust",
      "description": "Puhleeeez work, pretty please.",
      "createdBy": 3,
      "status_id": 3,
      "user_id": 5,
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

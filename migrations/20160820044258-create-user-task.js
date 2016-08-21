'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('UserTasks', {
      
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('UserTasks');
  }
};
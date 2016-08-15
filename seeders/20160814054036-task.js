'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('task', [{
      title: "title",
      priority: "priority"
    }]);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('task');
  }
};

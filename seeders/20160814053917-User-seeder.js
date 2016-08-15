'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('user', [{
      username: "username"
    }],{
      
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('user');
  }
};

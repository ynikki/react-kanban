'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('status', [{
    "name": "name"
   }],{
   });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('status');
  }
};

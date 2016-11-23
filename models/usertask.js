'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserTask = sequelize.define('UserTask', {
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return UserTask;
};
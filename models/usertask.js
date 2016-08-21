'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserTask = sequelize.define('UserTask', {
    user_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
      }
    }
  });
  return UserTask;
};
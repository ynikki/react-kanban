'use strict';
module.exports = function(sequelize, DataTypes) {
  var Status = sequelize.define('Status', {
    name: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        models.Status.hasMany(models.Task, {
          foreignKey: 'status_id'
        });
      }
    }
  });
  return Status;
};
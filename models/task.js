'use strict';
module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define('Task', {
    title: DataTypes.TEXT,
    description: DataTypes.TEXT,
    assignedTo: DataTypes.STRING,
    priority: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.Task.belongsTo(models.Status, {
          foreignKey: 'status_id'
        });
        models.Task.belongsTo(models.User, {
          foreignKey: 'user_id'
        });
      }
    }
  });
  return Task;
};
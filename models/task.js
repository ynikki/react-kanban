'use strict';
module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define('Task', {
    title: DataTypes.TEXT,
    description: DataTypes.TEXT,
    createdBy: DataTypes.STRING,
    assignedTo: DataTypes.STRING,
    priority: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.Task.belongsTo(models.Status, {
          foreignKey: 'status_id'
        });
      }
    }
  });
  return Task;
};
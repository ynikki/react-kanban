'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .addColumn('Tasks', 'user_id', {
        type: Sequelize.INTEGER,
        allowNull: true,
        foreignKey: true,
        references: {
          model: 'Users',
          key: 'id'
        }
      });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface
      .removeColumn('Tasks', 'user_id');
  }
};

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Completed_Goals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Completed_Goals.init({
    UserId: DataTypes.INTEGER,
    GoalId: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'completed_goals',
    modelName: 'Completed_Goals',
  });
  return Completed_Goals;
};
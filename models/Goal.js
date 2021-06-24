'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Goal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Project }) {
      // define association here
      this.belongsTo(Project, {foreignKey: "ProjectId"});
    }
  };
  Goal.init({
    ProjectId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    startDate: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    completedAt: DataTypes.DATE,
    completedBy: DataTypes.INTEGER,
    deadline: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'goals',
    modelName: 'Goal',
  });
  return Goal;
};
// sequelize-cli seed:generate 
// npx sequelize-cli seed:generate --name demo-user
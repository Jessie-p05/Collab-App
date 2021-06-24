'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users_Projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Project}) {
      this.belongsTo(User, {foreignKey: "UserId"})
      this.belongsTo(Project, {foreignKey: "ProjectId"})
    }
  };
  Users_Projects.init({
    UserId: DataTypes.INTEGER,
    ProjectId: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'users_projects',
    modelName: 'Users_Projects',
  });
  return Users_Projects;
};
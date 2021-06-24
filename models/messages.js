'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Project}) {
      this.belongsTo(Project, {foreignKey: "ProjectId"})
      this.belongsTo(User, {foreignKey: "UserId"})
    }
  };
  Messages.init({
    UserId: DataTypes.INTEGER,
    ProjectId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    datePosted: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'messages',
    modelName: 'Messages',
  });
  return Messages;
};
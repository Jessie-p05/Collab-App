'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Project}) {
      this.belongsToMany(User, {through: "users_skills", as: "users_with_skill"})
      this.belongsToMany(Project, {through: "projects_skills", as: "projects_with_skill"})
    }
  };
  Skill.init({
    name: DataTypes.STRING,
    iconClass: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'skills',
    modelName: 'Skill',
  });
  return Skill;
};
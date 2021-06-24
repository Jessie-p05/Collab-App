'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projects_Skills extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Project, Skill}) {
      // this.belongsTo(Project, {foreignKey: "ProjectId"})
      // this.belongsTo(Skill, {foreignKey: "SkillId"})
    }
  };
  Projects_Skills.init({
    ProjectId: DataTypes.INTEGER,
    SkillId: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'projects_skills',
    modelName: 'Projects_Skills',
  });
  return Projects_Skills;
};
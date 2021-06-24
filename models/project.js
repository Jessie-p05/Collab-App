
'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Skill, Messages, Goal}) {
      this.belongsTo(User, {foreignKey: "projectLeadId", as: "projectLead"})
      this.belongsToMany(User, {through: "users_projects", as: "project_users", foreignKey: "ProjectId"})
      this.hasMany(Messages, {as: "project_messages"})
      this.hasMany(Goal, {as: "project_goals"})
      this.belongsToMany(Skill, {through: "projects_skills", as: "project_skills"})

    }
  };
  Project.init({
    projectLeadId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
      },
    description: DataTypes.STRING,
    url: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    deadline: DataTypes.DATE,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'projects',
    modelName: 'Project',
  });
  return Project;
};


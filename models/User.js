'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Project, Skill, Messages}) {
      this.hasMany(Project, {foreignKey: "projectLeadId", as: "projectLead"})
      this.belongsToMany(Project, {through: "users_projects", as: "user_projects", foreignKey: "UserId"})
      this.hasMany(Messages, {as: "user_messages"})
      this.belongsToMany(Skill, {through: "users_skills", as: "user_skills"})
    }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true
    },
    github: {
      type: DataTypes.STRING,
      allowNull: true
    },
    slack: {
      type: DataTypes.STRING,
      allowNull: true
    },
    twitter: {
      type: DataTypes.STRING,
      allowNull: true
    },
    facebook: {
      type: DataTypes.STRING,
      allowNull: true
    },
    discord: {
      type: DataTypes.STRING,
      allowNull: true
    },
    zoom: {
      type: DataTypes.STRING,
      allowNull: true
    },
    schedule: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_mentor: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};



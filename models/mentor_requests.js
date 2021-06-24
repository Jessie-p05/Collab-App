'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mentor_Requests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Mentor_Requests.init({
    mentorId: DataTypes.INTEGER,
    projectId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    datePosted: DataTypes.DATE,
    accepted: DataTypes.BOOLEAN
  }, {
    sequelize,
    tableName: 'mentor_requests',
    modelName: 'Mentor_Requests',
  });
  return Mentor_Requests;
};
'use strict';
const { MAXUSERS, MAXPROJECTS } = require("../helpers/constants");
const usersProjects = [];

for (let i = 1; i <= MAXPROJECTS; i++) {
  usersProjects.push({
    UserId: i,
    ProjectId: i,
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

for (let i = MAXPROJECTS + 1; i <= MAXUSERS; i++) {
  usersProjects.push({
    UserId: i,
    ProjectId: Math.ceil(Math.random() * 10),
    createdAt: new Date(),
    updatedAt: new Date()
  })
}



module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users_projects', usersProjects, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users_projects', null, {});
  }
};
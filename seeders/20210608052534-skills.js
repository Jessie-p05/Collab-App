'use strict';
const { SKILLS } = require("../helpers/constants");

const skillList = []

for (const skillName of SKILLS) {
  skillList.push({
    name: skillName,
    iconClass: `devicon-${skillName.toLowerCase()}-plain colored`,
    createdAt: new Date(),
    updatedAt: new Date()
  })
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('skills', skillList, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('skills', null, {});
  }
};

'use strict';


const { SKILLS, MAXSKILLSPERPROJECT, MAXPROJECTS } = require("../helpers/constants");
const projectSkills = []

for (let i = 1; i <= MAXPROJECTS; i++) {
  let numSkills = Math.ceil(Math.random() * MAXSKILLSPERPROJECT)
  const currentSkills = []
  for (let j = 1; j <= numSkills; j++) {
    let skillId = Math.ceil(Math.random() * SKILLS.length)
    if (!currentSkills.includes(skillId)) {
      currentSkills.push(skillId)
      projectSkills.push({
        ProjectId: i,
        SkillId: skillId,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
  }
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('projects_skills', projectSkills, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('projects_skills', null, {});
  }
};

'use strict';

const { SKILLS, MAXSKILLSPERUSER, MAXUSERS, MAXMENTORS } = require("../helpers/constants");
const userSkills = []

for (let i = 1; i <= MAXUSERS + MAXMENTORS; i++) {
  let numSkills = Math.ceil(Math.random() * MAXSKILLSPERUSER)
  const currentSkills = []
  for (let j = 1; j <= numSkills; j++) {
    let skillId = Math.ceil(Math.random() * SKILLS.length)
    if (!currentSkills.includes(skillId)) {
      currentSkills.push(skillId)
      userSkills.push({
        UserId: i,
        SkillId: skillId,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
  }
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users_skills', userSkills, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users_skills', null, {});
  }
};

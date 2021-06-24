'use strict';
const { MAXGOALS } = require("../helpers/constants");
const fakerData = require('../helpers/fakerData');

const goals = [];

for (let i = 1; i <= MAXGOALS; i++) {
  goals.push(fakerData.goalData());
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('goals', goals, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('goals', null, {});
  }
};
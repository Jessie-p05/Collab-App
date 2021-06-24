'use strict';
const { MAXMESSAGES } = require("../helpers/constants");

const fakerData = require('../helpers/fakerData');

const messages = [];

for (let i = 1; i <= MAXMESSAGES; i++) {
  messages.push(fakerData.messageData());
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('messages', messages, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('messages', null, {});
  }
};

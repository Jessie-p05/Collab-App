const faker = require('faker');
const {MAXPROJECTS, MAXUSERS, MAXMENTORS} = require('./constants')

const fakerData = {
  userData: () => {
    const users = [];
    for (let i = 1; i <= MAXUSERS + MAXMENTORS; i++) {
      users.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: "password",
        photo: faker.internet.avatar(),
        bio: faker.lorem.sentence(),
        is_mentor: (i < MAXUSERS) ? false : true,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return users;
  },
  projectData: () => {
    const projects = [];
    for (let i = 1; i <= MAXPROJECTS; i++) {
      projects.push({
        projectLeadId: i,
        name: faker.company.catchPhraseAdjective() + " " + faker.company.catchPhraseNoun(),
        description: faker.company.catchPhrase() + ", " + faker.company.catchPhrase() + ", " + faker.company.catchPhrase() + ".",
        imgUrl: faker.image.abstract(400, 200, true),
        deadline: faker.date.soon(),
        startDate: faker.date.recent(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    return projects; 
  },
  goalData: () => {
    return {
      ProjectId: Math.ceil(Math.random() * MAXPROJECTS),
      name: faker.git.commitMessage(),
      description: faker.company.bs(),
      startDate: faker.date.recent(),
      createdAt: faker.date.recent(),
      isComplete: false,
      updatedAt: new Date(),
      deadline: faker.date.recent()
    }
  },

  messageData: () => {
    return {
      UserId: Math.ceil(Math.random() * MAXUSERS),
      ProjectId: Math.ceil(Math.random() * MAXPROJECTS),
      message: faker.hacker.phrase(),
      datePosted: faker.date.recent(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  },
}

module.exports = fakerData
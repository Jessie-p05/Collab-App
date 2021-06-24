
const findUserById = (userId, usersArr) =>{
  //console.log("in findUserById:", usersArr, userId)
  return usersArr.find((ele) => {
    
    return ele.id === userId
  });
}

//find all projects belongs to a given userId
const findAllById = (id, objArr) => {
  return objArr.filter( ele => ele.projectLeadId === id)
}

const filterProjectsBySkills = (skills, projects) => {
  // console.log("skills in filter:", skills)
  if (skills.length < 1) {
    return projects
  }
  return projects.filter( project => {
    for (const skill of project.project_skills) {
      if (skills.includes(skill.id)) {
        return true;
      }
    }
    return false;
  })
}

const userHasSkill = (user, skills) => {
  if (skills.length < 1) {
    return true;
  }
  for (const skill of user.user_skills) {
    if (skills.includes(skill.id)) {
      console.log("Mentor",user.firstName,"has skill",skill.name)
      return true;
    }
  }
  console.log("Mentor",user.firstName,"does not have any of",skills)
  return false;
}

const findMentors = (users, skills) => {
  const mentors = []
  for (const user of users) {
    if (user.is_mentor && userHasSkill(user, skills)) {
      mentors.push(user)
    }
  }
  return mentors;
}


// const findMemberByProject = (project) =>{
//   return 
// }

export  { findUserById, findAllById, filterProjectsBySkills, findMentors, userHasSkill }

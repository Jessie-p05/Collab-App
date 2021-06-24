const router = require("express").Router();
const { Project, Users_Projects, Projects_Skills, Goal, Skill } = require("../models");
const { Op } = require("sequelize");


router.get("/skills", (req, res) => {
  Skill.findAll()
    .then(skills => {
      res.set("Access-Control-Allow-Origin", "*");
      res.json(skills);
    })
    .catch((err) => console.log("Error:" + err))
})
//get project list
router.get("/", (req, res) =>
  Project.findAll({
    include: [
      "project_users",
      "project_skills",
      "project_messages",
      "project_goals",
    ],
  })
    .then((projects) => {
      
      res.set("Access-Control-Allow-Origin", "*");
      res.json(projects);
    })
    .catch((err) => console.log("Error:" + err))
);

//get project by ID
router.get("/:id", (req, res) =>
  Project.findByPk(req.params.id)
    .then((projects) => {
      console.log("Projects:", projects.dataValues);
      res.set("Access-Control-Allow-Origin", "*");
      res.sendStatus(200);
    })
    .catch((err) => console.log("Error:" + err))
);

//get message by project ID
// router.get('/:id/chat', (req, res) =>
//   Message.findAll({
//     where: {
//       project_id: req.params.id
//     }
//   })
//   .then(messages => {
//     console.log("Messages:", messages.dataValues);
//     res.sendStatus(200);
//   })
//   .catch(err => console.log("Error:"+ err))
// );


//Post route for createing new project and inserting the projects_skills table
router.post('/new', async(req, res) => {
  const {
    projectLeadId,
    name,
    description,
    project_skills,
    url,
    imgUrl,
    deadline,
    startDate,
    endDate
  } = req.body.projects;
  res.set('Access-Control-Allow-Origin','*');
  Promise.all(
      await Project.create({
        projectLeadId,
        name,
        description,
        url,
        imgUrl,
        deadline,
        startDate,
        endDate
      })
      .then(data => {
        res.set('Access-Control-Allow-Origin','*');
        console.log("project 1:",data.dataValues);
        res.json(data.dataValues.id)
        project_skills.map(async (elem) => {
          await Projects_Skills.create({ProjectId: `${data.dataValues.id}`, SkillId: `${elem}`});
        })
      })
  ).then((data) => {
    res.sendStatus(200)
  })
    .catch (err => {
      console.log(err)
      return res.status(500).json(err);
  })
});

router.post("/search", async (req, res) => {
  const { keyword } = req.body;
  const keywordLike = "%" + keyword;
  try {
    console.log("keywordLike:", keywordLike);
    const projects = await Project.findAll({
      include: ["project_skills", "project_users"],
      where: {
        [Op.or]: [
          { name: { [Op.substring]: keyword } },
          { description: { [Op.substring]: keyword } },
        ],
      },
    }).then((projects) => {
      res.json(projects);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//add user to project
router.post("/:id/adduser", async (req, res) => {
  const { id } = req.body;
  try {
    const user_project = await Users_Projects.create({
      UserId: id,
      ProjectId: req.params.id,
    });
    return res.json(user_project);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//patch (update) project's attr.
router.patch("/:id", async (req, res) => {
  const {
    name,
    description,
    url,
    imgUrl,
    deadline,
    startDate,
    endDate,
  } = req.body;
  try {
    const project = await Project.update(
      {
        name,
        description,
        url,
        imgUrl,
        deadline,
        startDate,
        endDate,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    return res.json(project);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// //Delete a project
router.delete("/:id", async (req, res) => {
  Project.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      console.log("Deleting was successfull for project ID:", data);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
});

//add goal to project
router.post("/:id/addGoal", async (req, res) => {
  const {
    name,
    description,
    startDate,
    deadline
  } = req.body;
  try {
    const goal = await Goal.create({
      ProjectId: req.params.id,
      name,
      description,
      startDate,
      deadline,

    });
    return res.json(goal);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//change completedAt date in a goal
router.patch("/:id/:goalsId", async (req, res) => {
  const projectId = req.params.id;
    goalId = req.params.goalsId;
  try {
    const goal = await Goal.findByPk(goalId);
    const changeValue = goal.dataValues.completedAt;
  const changedGoal =  await Goal.update(
      {
        completedAt: changeValue? null : new Date(), 
      },{
        where: {
          id: goalId,
        },
        
      }
      )
      return res.json(changedGoal);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;

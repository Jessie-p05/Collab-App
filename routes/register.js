const router = require("express").Router();
const {sequelize, User } = require('../models');



//Post the register form for a new user
router.post('/', async(req, res) => {
  // console.log("req!!!!!",req.body)
  const { firstName, lastName, email, password } = req.body
  try {
      const user = await User.create({firstName, lastName, email, password})
      return res.json(user)
  } catch (err) {
      console.log(err)
      return res.status(500).json(err);
  }

});

// Post for the skills of new user
// router.post('/', async(req, res) => {

//   const { firstName, lastName, email, password } = req.body

//   User.create({firstName, lastName, email, password})
//   .then(data => res.json(data))
//    .catch ((err)=> {
//     console.log(err)
//     return res.status(500).json(err);
//    })

// });

module.exports = router;

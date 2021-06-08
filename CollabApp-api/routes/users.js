const router = require("express").Router();
const {sequelize, User } = require('../models');

//get user list
router.get('/', (req, res) =>
User.findAll()
  .then(users => {
    // console.log("Users:", users);
    res.set('Access-Control-Allow-Origin','*');
    res.json(users);
  })
  .catch(err => {
    console.log("Error:"+ err)
    res.status(500).json(err)
    }));

//get user by ID
router.get('/:id', (req, res) =>
User.findByPk(req.params.id)
  .then(users => {
    console.log("Users:", users.dataValues);
    res.json(users.dataValues);
  })
  .catch(err => {
    console.log("Error:"+ err)
    res.status(500).json(err)
    }));

//Post (create) new user
router.post('/', async(req, res) => {
  const { firstName, lastName, email, password } = req.body
  try {
      const user = await User.create({firstName, lastName, email, password})
      return res.json(user)
  } catch (err) {
      console.log(err)
      return res.status(500).json(err);
  }
});

//patch (update) user's attr.
router.patch('/:id', async(req, res) => {
  const { firstName, lastName, email, password } = req.body
  try {
      const user = await User.update({firstName, lastName, email, password},
        {where: {
          id: req.params.id
        }})
      return res.json(user)
  } catch (err) {
      console.log(err)
      return res.status(500).json(err);
  }
});

//Delete a user
router.delete('/:id', async(req, res) => {
    User.destroy({
    where: {
      id: req.params.id
    }
  }).then (data => {
    console.log("Deleting was successfull for user ID:", data);
    res.sendStatus(200);
  })
  .catch ((err) => {
      console.log(err)
      return res.status(500).json(err);
    });
});

module.exports = router;
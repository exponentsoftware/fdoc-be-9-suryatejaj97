// const db = require("../config/db");
const User = require('../models/User')
const Task = require('../models/Task')


// @desc      GET all users
// @route     GET /api/v1/users
// @access    Private
exports.getAll = (req,res) =>{
    User.findAll({ include: ["comments","tasks"] })
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({  
            message:
              err.message || "Some error occurred while finding the users."
          })
        })
}

// @desc      GET one tasks
// @route     GET /api/v1/tasks/:id
// @access    Private
exports.getOne = (req, res) => {
    const id = req.params.id;
  
    User.findByPk(id)
      .then(user => {
        res.status(200).json(user);
      })
      .catch(err => {
        res.status(500).json({
          message: "Error retrieving user with id=" + id
        });
      });
  };


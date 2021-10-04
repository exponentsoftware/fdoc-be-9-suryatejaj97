// const db = require("../config/db");
const Task = require('../models/Task')
const Comment = require('../models/Comment')


// @desc      POST all tasks
// @route     POST /api/v1/tasks
// @access    Private
exports.addTodo = (req, res) => {
    // Validate request
    if (!req.body.title) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Task
    const task = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      done: req.body.done,
      userId : req.user.id
    };
  
    // Save task in the database
    Task.create(task)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the task."
        });
      });
  };

// @desc      GET all tasks
// @route     GET /api/v1/tasks
// @access    Private
exports.getAll = (req,res) =>{
    Task.findAll({ include: ["comments"] })
    .then(tasks => {
        res.status(200).json(tasks)
    })
    .catch(err => {
        res.status(500).json({
            message:
              err.message || "Some error occurred while creating the task."
          })
        })
}

// @desc      GET one tasks
// @route     GET /api/v1/tasks/:id
// @access    Private
exports.getOne = (req, res) => {
    const id = req.params.id;
  
    Task.findByPk(id,{ include: ["comments"] })
      .then(task => {
        res.status(200).json(task);
      })
      .catch(err => {
        res.status(500).json({
          message: "Error retrieving task with id=" + id
        });
      });
  };

// @desc      PUT one tasks
// @route     PUT /api/v1/tasks/:id
// @access    Private
exports.update = (req, res) => {
    const id = req.params.id;
  
    Task.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          console.log(num)
          res.status(200).json({
            message: "Task was updated successfully."
          });
        } else {
          res.status(500).json({
            message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          message: "Error updating Task with id=" + id
        });
      });
  };



// @desc      PUT one tasks
// @route     PUT /api/v1/tasks/:id
// @access    Private
exports.deleteOne = (req, res) => {
    const id = req.params.id;
  
    Task.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
            res.status(200).json({
            message: "Task was deleted successfully!"
          });
        } else {
            res.status(400).json({
            message: `Cannot delete Task with id=${id}. Maybe Task was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Task with id=" + id
        });
      });
  };

// @desc      Get done tasks
// @route     PUT /api/v1/tasks/done
// @access    Private 
exports.getDone = (req, res) => {
    Task.findAll({ where: { done: true } })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Tasks."
        });
      });
  };
  
 

// @desc      add comment done tasks
// @route     POST /api/v1/tasks/:id
// @access    Private 
exports.addComment = (req, res) => {
    if(!req.body){
        res.send("add a comment") 
    }
  let taskId = req.params.id
    return Comment.create({
      description: req.body.description,
      taskId: taskId,
      userId : req.user.id
    })
      .then((comment) => {
        res.status(200).json({succces : true, data : comment})
      })
      .catch((err) => {
        res.status(400).json({err: err,succces:false})
      });
  };

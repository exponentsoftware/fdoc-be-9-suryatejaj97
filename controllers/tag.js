const Tag = require('../models/Tag')
const Task = require('../models/Task')


exports.create = (req,res) => {
    Tag.create({
      name: req.body.name,
    })
      .then((tag) => {
          res.status(200).json({succces : true, data : tag})
      })
      .catch((err) => {
          res.status(400).json({err: err,succces:false})
      });
  };

  exports.addTag = (req,res) => {
    let taskId = req.body.id  
    let tagId = req.params.id
    Tag.findByPk(tagId)
      .then((tag) => {
        if (!tag) {
            res.status(200).json({success: true, data : tag})
        }
        return Task.findByPk(taskId).then((task) => {
          if (!task) {
              res.status(400).json({success: false, message : "task not found!"})
          }
  
          tag.addTask(task);
          res.status(200).json({success: true, data : task})
        });
      })
      .catch((err) => {
        res.status(400).json({success: false, err : "Something broke"})
      });
  };
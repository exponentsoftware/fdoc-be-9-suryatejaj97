const Comment = require('../models/Comment')

// exports.addComment = (req, res) => {
//     if(!req.body){
//         res.send("add a comment") 
//     }
// let taskId = req.params.id
//     return Comment.create({
//       description: req.body.description,
//       taskId: taskId,
//     })
//       .then((comment) => {
//         res.status(200).json({succces : true, data : comment})
//       })
//       .catch((err) => {
//         res.status(400).json({err: err,succces:false})
//       });
//   };


 // @desc      PUT one tasks
// @route     PUT /api/v1/comments/:id
// @access    Private
exports.update = (req, res) => {
    const id = req.params.id;
  
    Comment.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.status(200).json({
            message: "comment was updated successfully."
          });
        } else {
          res.status(500).json({
            message: `Cannot update comment with id=${id}. Maybe comment was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          message: "Error updating comment with id=" + id
        });
      });
  };



// @desc      PUT one tasks
// @route     PUT /api/v1/comments/:id
// @access    Private
exports.deleteOne = (req, res) => {
    const id = req.params.id;
  
    Comment.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
            res.status(200).json({
            message: "commet was deleted successfully!"
          });
        } else {
            res.status(400).json({
            message: `Cannot delete comment with id=${id}. Maybe comment was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete comment with id=" + id
        });
      });
  };

// @desc      GET one tasks
// @route     GET /api/v1/tasks/:id
// @access    Private
exports.getOne = (req, res) => {
  const id = req.params.id;

  Comment.findByPk(id)
    .then(comment => {
      res.status(200).json(comment);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error retrieving comment with id=" + id
      });
    });
}; 
 
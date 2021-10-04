const Sequelize = require('sequelize')
const db = require('../config/db')
const Task = require('./Task')
const User = require('./User')

const Comment = db.define('comment',{
    description :{
        type : Sequelize.STRING,
        allowNull: false
    }
})

User.hasMany(Comment, { as: "comments", onDelete : "cascade"});
Comment.belongsTo(User, {
  foreignKey: "userId",
  as: "User",
});

Task.hasMany(Comment, { as: "comments" , onDelete : "cascade"});
Comment.belongsTo(Task, {
  foreignKey: "taskId",
  as: "Task",
});

module.exports = Comment;
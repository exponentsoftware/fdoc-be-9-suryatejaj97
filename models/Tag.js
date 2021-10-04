const Sequelize = require('sequelize')
const db = require('../config/db')
const Task = require('./Task')
const User = require('./User')

const Tag = db.define('tag',{
    name :{
        type : Sequelize.STRING,
        allowNull: false
    }
})

// Tag.belongsToMany(Task, {
//     through: "task_tag",
//     as: "tasks",
//     foreignKey: "tagId",
//   });

module.exports = Tag;
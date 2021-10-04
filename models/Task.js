const Sequelize = require('sequelize')
const db = require('../config/db')
const Tag = require('./Tag')
const User = require('./User')

const Task = db.define('task',{
    title :{
        type : Sequelize.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('title', value.trim());
          }
    },
    description :{
        type : Sequelize.STRING,
        allowNull: false
    },
    category :{
        type : Sequelize.STRING
    },
    done :{
        type : Sequelize.BOOLEAN,
        defaultValue: true
    },
})

User.hasMany(Task, { as: "tasks" , onDelete : "cascade"});
Task.belongsTo(User, {
  foreignKey: "userId",
  as: "User",
});


module.exports = Task;
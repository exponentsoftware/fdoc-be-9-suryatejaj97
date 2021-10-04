const Sequelize = require('sequelize')
const db = require('../config/db')
const bcrypt = require('bcryptjs')

const User = db.define('user',{
    username :{
        type : Sequelize.STRING,
        allowNull: false,
        unique: true,
        set(value) {
            this.setDataValue('username', value.trim());
          }
    },
    email :{
        type : Sequelize.STRING,
        allowNull: false,
        unique: true,
        isEmail: true,
    },
    phone :{
        type : Sequelize.STRING,
        allowNull: false,
        // unique: true,
        isNumeric: true,
        max: 10
    },
    password :{
        type : Sequelize.STRING,
        allowNull: false,
        set(value) {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(value,salt)
            this.setDataValue('password', hash);
          }
    },
    role:{
        type : Sequelize.ENUM("user","admin"),
        defaultValue:"user"
    }
})


//compare passowrds
User.prototype.validPassword = function (password) {
    console.log(password)
    return bcrypt.compareSync(password, this.password);
};

module.exports = User;
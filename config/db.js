//db
const Sequelize = require('sequelize')

const dotenv = require('dotenv')

//load env vars
dotenv.config({ path : './config/config.env'})


module.exports = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: 'localhost',
    dialect:  'postgres'
  });


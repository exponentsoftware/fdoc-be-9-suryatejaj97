const express = require('express')

const db = require('../config/db')
const Task = require('../models/Task')

const { addTodo,getAll,getOne,update,getDone,deleteOne,addComment } = require('../controllers/task')


const router = express.Router();

const { protect } = require('../middlewares/auth')

router
.route('/')
.get(protect,getAll)
.post(protect,addTodo)

router.route('/done').get(protect,getDone)

router.route('/:id')
.get(protect,getOne)
.put(protect,update)
.delete(protect,deleteOne)
.post(protect,addComment)



module.exports = router
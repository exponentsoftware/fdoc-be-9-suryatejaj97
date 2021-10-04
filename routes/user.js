const express = require('express')

const db = require('../config/db')
const Task = require('../models/Task')

const { getAll,getOne } = require('../controllers/user')


const router = express.Router();

const { protect,authorize } = require('../middlewares/auth')

router
.route('/')
.get(protect,authorize('admin'),getAll)

router.route('/:id')
.get(protect,getOne)




module.exports = router
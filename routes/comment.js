const express = require('express')

const db = require('../config/db')


const { getOne,update,deleteOne } = require('../controllers/comment')


const router = express.Router();

router.route('/:id')
.get(getOne)
.put(update)
.delete(deleteOne)



module.exports = router
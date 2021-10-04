const express = require('express')

const db = require('../config/db')


const { create,addTag } = require('../controllers/tag')


const router = express.Router();

router
.route('/:id')
// .get(getAll)
.post(addTag)

router
.route('/')
// .get(getAll)
.post(create)

// router.route('/done').get(getDone)

// router.route('/:id')
// .get(getOne)
// .put(update)
// .delete(deleteOne)



module.exports = router
const express = require('express')
const router = express.Router()

const moviesController = require('../controllers/moviesController')

router.get('/', moviesController.all)
//router.get('/detail/:id', moviesController.detail)
router.get('/create', moviesController.viewCreate)
router.post('/create',moviesController.create)
/*router.get('/recommended', moviesController.recommended)
router.post('/search', moviesController.search)*/

module.exports = router
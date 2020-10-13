const express = require('express')
const router = express.Router()

const moviesController = require('../controllers/moviesController')

router.get('/', moviesController.all)
router.get('/detail/:id', moviesController.detail)
router.get('/create', moviesController.viewCreate)
router.post('/create',moviesController.create)
router.get('/edit/:id', moviesController.viewEdit)
router.put('/edit/:id', moviesController.edit)
router.delete('/delete/:id', moviesController.delete)
router.get('/new', moviesController.new)
router.get('/recommended', moviesController.recommended)
/*router.get('/recommended', moviesController.recommended)
router.post('/search', moviesController.search)*/

module.exports = router
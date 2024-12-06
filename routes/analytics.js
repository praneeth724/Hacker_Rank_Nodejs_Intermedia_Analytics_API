const router = require('express').Router();
const controller = require('../controllers/analytics');

router.post('/', controller.createAnalytic)
router.get('/', controller.getAllAnalytics)
router.delete('/:id', controller.notAllowed)
router.put('/:id', controller.notAllowed)
router.patch('/:id', controller.notAllowed)

module.exports = router;

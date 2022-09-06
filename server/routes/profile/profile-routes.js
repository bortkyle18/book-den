const router = require('express').Router()
const { getUserByUsername } = require('../../controllers/user-controller')

//   /profile/api/user/:username
router.route('/user/:username').get(getUserByUsername)


module.exports = router;
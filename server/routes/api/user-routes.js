const router = require('express').Router()
const { createUser, updateUserById, getAllUsers, getUserById, getUserByUsername, authenticateLogin, lookupUserByToken, deleteUser } = require('../../controllers/user-controller')
const { follow, unFollow } = require('../../controllers/follow-controller')


//   /api/user/
router.route('/').get(getAllUsers)
router.route('/').post(createUser)

//   /api/user/auth
router.route("/auth").post(authenticateLogin)
//   /api/user/lookup
router.route("/lookup").get(lookupUserByToken)

//   /api/user/:username
router.route('/username/:username').get(getUserByUsername)

//   /api/user/:userId
router.route('/:userId').get(getUserById)
router.route('/:userId').put(updateUserById)
router.route('/:userId').delete(deleteUser)

//   /api/user/:userId/:followId     =>   add/remove from user follow list
router.route('/:userId/:followId').put(follow)
router.route('/:userId/:followId').delete(unFollow)


module.exports = router;
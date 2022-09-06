const router = require('express').Router();
const profileApiRoutes = require('./profile');
const apiRoutes = require('./api');

router.use('/profile', profileApiRoutes)
router.use('/api', apiRoutes);

module.exports = router;
const router = require('express').Router();
const profileRoutes = require('./profile-routes');


router.use('/api', profileRoutes);


module.exports = router;
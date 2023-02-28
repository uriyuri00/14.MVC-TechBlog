const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const dashboardRoute = require('./dashboardRoute');
const apiRoutes = require('./api');


router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoute);



module.exports = router;

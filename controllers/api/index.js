const router = require('express').Router();
const userRoute = require('./userRoute');
const postRoute = require('./postRoute');


router.use('/users', userRoute);
router.use('/dashboard', postRoute);


module.exports = router;

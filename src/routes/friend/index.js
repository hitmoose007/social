const router = require('express').Router({mergeParams: true});
//mess with this file. idk why i made it, but im thinking about the routes and i dont think this should exist
router.use('/',require('./users'));


module.exports = router;